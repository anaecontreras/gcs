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

class AuthController extends Controller
{
    // FUNCION DE LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        // Buscar al usuario por email
        $user = User::with('rol')->where('email', $email)->first();

        // Si no existe o no está activo
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

        // Verificar la contraseña manualmente
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

        // Autenticar manualmente al usuario (opcional, pero recomendado)
        Auth::login($user);

        // Generar token de Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Log de login exitoso
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
        ], 201);
    }

    // FUNCION DE REGISTRO
    public function register(Request $request)
    {
        $authUser = Auth::guard('sanctum')->user();

        // VALIDAR QUE EL USUARIO AUTENTICADO SEA ADMINISTRADOR (rol_id=1)
        if (!$authUser || $authUser->rol_id !== 1) {
            return response()->json([
                'message' => 'Solo administradores (rol_id=1) pueden registrar usuarios.',
            ], 403);
        }

        if (!Auth::guard('sanctum')->check()) {
            return response()->json([
                'message' => 'Acceso no autorizado. Token de autenticacion valido requerido.',
            ], 401);
        }

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

        // Datos con activo por defecto = 1
        $userData = array_merge($request->only(['name', 'email', 'rol_id', 'unidad_operativa']), [
            'password' => bcrypt($request->password),
            'activo' => $request->boolean('activo', 1) // 1 si no viene o es falso
        ]);

        $user = User::create($userData);

        // 👇 Registrar el log de la acción
        Log::create([
            'usuario_correo'   => $authUser->email, // Quién hizo el registro
            'accion'           => "Registro de usuario: {$user->email}, rol: {$user->rol_id}",
            'entidad_afectada' => 'users',
            'entidad_id'       => $user->id,
        ]);

        return response()->json(['message' => 'Usuario creado exitosamente', 'user' => $user], 201);
    }

    // FUNCION DE LOGOUT
    public function logout(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'No session found'], 401);
        }

        try {
            // Log de la acción
            Log::create([
                'usuario_correo' => $user->email,
                'accion' => 'Logout',
                'entidad_afectada' => 'users',
                'entidad_id' => $user->id,
            ]);

        // Esta forma suele evitar el error de "Undefined method" en los editores
            /** @var \App\Models\User $user **/
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

            return response()->json(['message' => 'Success'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // FUNCION PARA CAMBIAR CONTRASEÑA DEL USUARIO ACTUAL
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
            ], 422);
        }

        // Verificar que la contraseña actual sea correcta
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'La contraseña actual es incorrecta.',
            ], 400);
        }

        // Actualizar la contraseña
        $user->password = bcrypt($request->new_password);
        $user->save();

        // Invalidar todos los tokens anteriores (opcional, pero recomendado por seguridad)
        $user->tokens()->delete();

        // Generar un nuevo token (opcional: si quieres que siga autenticado)
        $newToken = $user->createToken('auth_token')->plainTextToken;

        // Registrar en log
        Log::create([
            'usuario_correo' => $user->email,
            'accion' => 'Cambio su contraseña',
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Contrasena actualizada exitosamente.',
            'access_token' => $newToken, // Opcional: si no lo necesitas, omite esta línea
            'token_type' => 'Bearer',
        ], 200);
    }

    // ACTUALIZAR DATOS BÁSICOS DE UN USUARIO (solo admin)
    public function changeDataBasic(Request $request)
    {
        $admin = $request->user();

        if (!$admin || $admin->rol_id !== 1) {
            return response()->json(['message' => 'Acceso denegado.'], 403);
        }

        // Validamos permitiendo tanto el guion bajo como el medio para no romper nada
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'name' => 'sometimes|string|max:150',
            'rol_id' => 'sometimes|integer|in:1,2,3,4', // Agregamos el 4 que faltaba
            'unidad-operativa' => 'sometimes|string|max:50',
            'unidad_operativa' => 'sometimes|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422);
        }

        $user = User::findOrFail($request->input('user_id'));

        // MAPEO MANUAL: Aquí está la magia.
        // Si viene 'unidad-operativa' (React), lo asignamos a 'unidad_operativa' (DB)
        if ($request->has('name')) $user->name = $request->input('name');
        if ($request->has('rol_id')) $user->rol_id = $request->input('rol_id');

        // Priorizamos el que traiga el guion medio que es el que manda tu modal
        if ($request->has('unidad-operativa')) {
            $user->unidad_operativa = $request->input('unidad-operativa');
        } elseif ($request->has('unidad_operativa')) {
            $user->unidad_operativa = $request->input('unidad_operativa');
        }

        $user->save();

        return response()->json(['message' => 'Datos actualizados exitosamente.'], 200);
    }

    // DESHABILITAR USUARIO (solo admin)
    // TOGGLE ESTADO DE USUARIO (Habilitar/Deshabilitar - solo admin)
    public function disableUser(Request $request)
    {
        $admin = $request->user();

        // Validar que sea administrador
        if (!$admin || $admin->rol_id !== 1) {
            return response()->json([
                'message' => 'Acceso denegado. Solo administradores pueden cambiar el estado de usuarios.',
            ], 403);
        }

        // Validar entrada
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $userId = $request->input('user_id');

        // Evitar que un admin se desactive a sí mismo
        if ($userId == $admin->id) {
            return response()->json([
                'message' => 'No puedes cambiar tu propio estado de actividad.',
            ], 400);
        }

        // Obtener usuario
        $user = User::findOrFail($userId);

        // Lógica Toggle: Si es 1 pasa a 0, si es 0 pasa a 1
        $user->activo = $user->activo ? 0 : 1;
        $user->save();

        // Determinar el texto para el log y la respuesta
        $estadoTexto = $user->activo ? 'Habilitó' : 'Deshabilitó';

        // Registrar en log
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
        ], 200);
    }

    // LISTAR TODOS LOS USUARIOS (solo admin)
    public function showUsers(Request $request)
    {
        $user = $request->user();

        if (!$user || $user->rol_id !== 1) {
            return response()->json(['message' => 'Acceso denegado.'], 403);
        }

        // Cargamos la relación 'rol'
        $users = User::with('rol:id,rol') // Trae solo el ID y el nombre del rol
            ->select('id', 'name', 'email', 'rol_id', 'unidad_operativa', 'activo', 'created_at', 'updated_at')
            ->get();

        return response()->json(['users' => $users], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}
