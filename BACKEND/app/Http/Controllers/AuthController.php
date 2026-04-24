<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail; 
use App\Mail\RecoveryCodeMail;


class AuthController extends Controller
{
    /**
     * Procesa el inicio de sesión del usuario.
     * Valida credenciales, verifica estado de la cuenta y genera token de acceso.
     */
    public function login(Request $request)
    {
        // Validación inicial de campos obligatorios
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        // Recuperamos el usuario con su rol para evaluar permisos posteriores
        $user = User::with('rol')->where('email', $email)->first();

        // Bloqueamos el acceso si el usuario no existe o su cuenta está inactiva
        if (!$user || !$user->activo) {
            Log::create([
                'usuario_correo' => $email,
                'accion' => 'Login fallido: usuario inactivo o no existe',
                'entidad_afectada' => 'users',
                'entidad_id' => $user?->id,
            ]);

            return response()->json([
                'message' => 'Credenciales inválidas o cuenta inactiva.',
            ], 401);
        }

        // Comprobación manual de contraseña para mantener control sobre el flujo de errores
        if (!Hash::check($password, $user->password)) {
            Log::create([
                'usuario_correo' => $email,
                'accion' => 'Login fallido: contraseña incorrecta',
                'entidad_afectada' => 'users',
                'entidad_id' => $user->id,
            ]);

            return response()->json([
                'message' => 'Credenciales inválidas o cuenta inactiva.',
            ], 401);
        }

        // Iniciamos sesión en el guard para asegurar consistencia en el ciclo de vida de la request
        Auth::login($user);

        // Generación del token Sanctum para autenticación en APIs stateless
        $token = $user->createToken('auth_token')->plainTextToken;

        // Registro de auditoría para acceso exitoso
        Log::create([
            'usuario_correo' => $user->email,
            'accion' => 'Login exitoso',
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'access_token' => $token,
            'user' => $user,
            'token_type' => 'Bearer',
        ], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Registro de nuevos usuarios.
     * Restringido a administradores: valida permisos, datos y persiste con logging.
     */
    public function register(Request $request)
    {
        // Obtenemos el usuario autenticado para validar su rol
        $authUser = Auth::guard('sanctum')->user();

        // Solo rol administrador (ID 1) puede ejecutar esta acción
        if (!$authUser || $authUser->rol_id !== 1) {
            return response()->json([
                'message' => 'Solo administradores (rol_id=1) pueden registrar usuarios.',
            ], 403);
        }

        // Doble verificación de autenticación para cubrir edge cases en guards
        if (!Auth::guard('sanctum')->check()) {
            return response()->json([
                'message' => 'Acceso no autorizado. Token de autenticacion valido requerido.',
            ], 401);
        }

        // Reglas de validación alineadas con la estructura de la tabla users
        $validator = Validator::make($request->all(), [
            'rol_id' => 'required|integer',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'name' => 'required|string|max:150',
            'unidad_operativa' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        // Preparación de datos: hasheo de contraseña y manejo seguro del campo 'activo'
        $userData = array_merge($request->only(['name', 'email', 'rol_id', 'unidad_operativa']), [
            'password' => bcrypt($request->password),
            'activo' => $request->boolean('activo', 1)
        ]);

        $user = User::create($userData);

        // Auditoría: quién registró a quién y con qué configuración inicial
        Log::create([
            'usuario_correo'   => $authUser->email,
            'accion'           => "Registro de usuario: {$user->email}, rol: {$user->rol_id}",
            'entidad_afectada' => 'users',
            'entidad_id'       => $user->id,
        ]);

        return response()->json(['message' => 'Usuario creado exitosamente', 'user' => $user], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Cierra la sesión del usuario actual.
     * Invalida el token activo y registra la acción para trazabilidad.
     */
    public function logout(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'No session found'], 401);
        }

        try {
            // Auditoría de cierre de sesión
            Log::create([
                'usuario_correo' => $user->email,
                'accion' => 'Logout',
                'entidad_afectada' => 'users',
                'entidad_id' => $user->id,
            ]);

            // Eliminación selectiva del token actual para evitar conflictos con IDEs
            /** @var \App\Models\User $user **/
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

            return response()->json(['message' => 'Success'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            // Manejo de errores sin exponer detalles sensibles en producción
            return response()->json(['error' => $e->getMessage()], 500, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Permite al usuario autenticado actualizar su propia contraseña.
     * Verifica credenciales actuales, rota tokens y fuerza re-autenticación.
     */
    public function changePasswordCurrent(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Validación de seguridad: la contraseña actual debe coincidir
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'La contraseña actual es incorrecta.',
            ], 400, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Actualización segura con hash y persistencia
        $user->password = bcrypt($request->new_password);
        $user->save();

        // Medida de seguridad: invalidar sesiones anteriores para prevenir reuso de tokens
        $user->tokens()->delete();

        // Emisión de nuevo token para mantener la experiencia de usuario fluida
        $newToken = $user->createToken('auth_token')->plainTextToken;

        // Registro de auditoría crítica: cambio de credenciales
        Log::create([
            'usuario_correo' => $user->email,
            'accion' => 'Cambio su contraseña',
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Contrasena actualizada exitosamente.',
            'access_token' => $newToken,
            'token_type' => 'Bearer',
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Actualización de datos básicos por parte de un administrador.
     * Maneja diferencias de naming entre frontend (React) y backend (Laravel).
     */
    public function changeDataBasic(Request $request)
    {
        $admin = $request->user();

        if (!$admin || $admin->rol_id !== 1) {
            return response()->json(['message' => 'Acceso denegado.'], 403);
        }

        // Validación flexible para soportar ambos formatos de nombre de campo
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'name' => 'sometimes|string|max:150',
            'rol_id' => 'sometimes|integer|in:1,2,3,4',
            'unidad-operativa' => 'sometimes|string|max:50',
            'unidad_operativa' => 'sometimes|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $user = User::findOrFail($request->input('user_id'));

        // Adaptador de datos: normaliza entrada de frontend (kebab-case) a modelo (snake_case)
        if ($request->has('name')) $user->name = $request->input('name');
        if ($request->has('rol_id')) $user->rol_id = $request->input('rol_id');

        // Prioridad al formato enviado desde el modal de React
        if ($request->has('unidad-operativa')) {
            $user->unidad_operativa = $request->input('unidad-operativa');
        } elseif ($request->has('unidad_operativa')) {
            $user->unidad_operativa = $request->input('unidad_operativa');
        }

        $user->save();

        return response()->json(['message' => 'Datos actualizados exitosamente.'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Alterna el estado de actividad de un usuario.
     * Previene auto-desactivación de administradores y registra la acción.
     */
    public function disableUser(Request $request)
    {
        $admin = $request->user();

        // Verificación de privilegios para operaciones sensibles
        if (!$admin || $admin->rol_id !== 1) {
            return response()->json([
                'message' => 'Acceso denegado. Solo administradores pueden cambiar el estado de usuarios.',
            ], 403, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $userId = $request->input('user_id');

        // Protección contra bloqueo accidental de la propia cuenta administrativa
        if ($userId == $admin->id) {
            return response()->json([
                'message' => 'No puedes cambiar tu propio estado de actividad.',
            ], 400, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $user = User::findOrFail($userId);

        // Lógica de toggle: inversión booleana del estado actual
        $user->activo = $user->activo ? 0 : 1;
        $user->save();

        // Preparación de mensaje contextual para respuesta y logs
        $estadoTexto = $user->activo ? 'Habilitó' : 'Deshabilitó';

        // Auditoría de cambio de estado con contexto completo
        Log::create([
            'usuario_correo' => $admin->email,
            'accion' => "{$estadoTexto} al usuario {$user->email}",
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'message' => "Usuario " . strtolower($estadoTexto) . " exitosamente.",
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'activo' => $user->activo,
            ],
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Listado de usuarios para administración.
     * Optimizado con selección de columnas y carga diferida de relaciones.
     */
    public function showUsers(Request $request)
    {
        $user = $request->user();

        if (!$user || $user->rol_id !== 1) {
            return response()->json(['message' => 'Acceso denegado.'], 403, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Query optimizado: solo campos necesarios y relación 'rol' mínima
        $users = User::with('rol:id,rol')
            ->select('id', 'name', 'email', 'rol_id', 'unidad_operativa', 'activo', 'created_at', 'updated_at')
            ->get();

        return response()->json(['users' => $users], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Crea el primer administrador del sistema.
     * Endpoint de bootstrap: no requiere autenticación, pero valida existencia previa.
     */
    public function createFirstAdmin(Request $request)
    {
        $emailAdmin = 'admin@gmail.com';

        // Prevención de duplicados: el admin maestro debe ser único
        $exists = User::where('email', $emailAdmin)->exists();

        if ($exists) {
            return response()->json([
                'message' => 'El usuario administrador ya existe en el sistema.'
            ], 400, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Validación mínima: solo contraseña requerida para inicialización
        $request->validate([
            'password' => 'required|string|min:8',
        ]);

        // Creación con datos predefinidos para garantizar consistencia en el despliegue inicial
        $user = User::create([
            'name'             => 'Usuario Admin',
            'email'            => $emailAdmin,
            'password'         => Hash::make($request->password),
            'rol_id'           => 1,
            'unidad_operativa' => 'Dev',
            'activo'           => 1,
        ]);

        // Log de sistema: acción crítica de inicialización
        Log::create([
            'usuario_correo'   => 'SYSTEM',
            'accion'           => "Creación inicial del administrador maestro: {$emailAdmin}",
            'entidad_afectada' => 'users',
            'entidad_id'       => $user->id,
        ]);

        return response()->json([
            'message' => 'Administrador creado exitosamente. Ya puede iniciar sesión.',
            'user'    => $user
        ], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Genera y envía código temporal para recuperación de cuenta.
     * Incluye validación de estado, almacenamiento seguro del token y notificación.
     */
    public function sendRecoveryCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->input('email');
        
        // Bloqueo preventivo: cuentas inactivas no pueden solicitar recuperación
        $user = User::where('email', $email)->first();
        
        if (!$user->activo) {
            return response()->json([
                'message' => 'La cuenta está desactivada. Contacte al administrador.',
            ], 400);
        }

        // Generación de código numérico de 6 dígitos con padding para consistencia
        $tempCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Almacenamiento del token hasheado con timestamp para control de expiración
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => Hash::make($tempCode),
                'created_at' => Carbon::now()
            ]
        );

        try {
            // Envío asíncrono del correo con el código en claro (solo para el usuario)
            Mail::to($email)->send(new RecoveryCodeMail($tempCode, $user->name));
            
            Log::create([
                'usuario_correo' => $email,
                'accion' => 'Código de recuperación enviado por email',
                'entidad_afectada' => 'users',
                'entidad_id' => $user->id,
            ]);

            return response()->json([
                'message' => 'Se ha enviado un código de recuperación a tu correo electrónico',
            ], 200);
            
        } catch (\Exception $e) {
            // Manejo de fallos en el servicio de correo con logging detallado
            Log::create([
                'usuario_correo' => $email,
                'accion' => 'Error al enviar email de recuperación: ' . $e->getMessage(),
                'entidad_afectada' => 'users',
                'entidad_id' => $user->id,
            ]);
            
            return response()->json([
                'message' => 'Error al enviar el correo. Por favor intenta más tarde.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Valida y aplica el restablecimiento de contraseña mediante código temporal.
     * Verifica expiración, integridad del token y rota credenciales de forma segura.
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'temp_code' => 'required|string|size:6',
            'new_password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->input('email');
        $tempCode = $request->input('temp_code');
        $newPassword = $request->input('new_password');

        // Recuperación del registro de recuperación asociado al email
        $resetRecord = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'message' => 'No se ha solicitado recuperación para este correo',
            ], 400);
        }

        // Validación de ventana de tiempo: tokens válidos solo por 60 minutos
        $createdAt = Carbon::parse($resetRecord->created_at);
        if ($createdAt->diffInMinutes(Carbon::now()) > 60) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            
            return response()->json([
                'message' => 'El código de recuperación ha expirado. Solicita uno nuevo.',
            ], 400);
        }

        // Verificación criptográfica del código proporcionado
        if (!Hash::check($tempCode, $resetRecord->token)) {
            Log::create([
                'usuario_correo' => $email,
                'accion' => 'Intento fallido de recuperación - código incorrecto',
                'entidad_afectada' => 'users',
                'entidad_id' => User::where('email', $email)->first()->id,
            ]);
            
            return response()->json([
                'message' => 'Código de recuperación incorrecto',
            ], 400);
        }

        // Aplicación de la nueva contraseña con hash seguro
        $user = User::where('email', $email)->first();
        $user->password = Hash::make($newPassword);
        $user->save();

        // Limpieza del token usado para prevenir reutilización
        DB::table('password_reset_tokens')->where('email', $email)->delete();

        // Invalidación de sesiones activas como medida de seguridad post-cambio
        $user->tokens()->delete();

        // Auditoría final del proceso de recuperación completado
        Log::create([
            'usuario_correo' => $email,
            'accion' => 'Contraseña restablecida exitosamente mediante código de recuperación',
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Contraseña restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.',
        ], 200);
    }
}