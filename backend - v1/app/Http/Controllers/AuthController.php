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
        $user = User::where('email', $email)->first();

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
        $user = $request->user(); // ✅ Siempre existe, gracias al middleware

        // Registrar log
        Log::create([
            'usuario_correo' => $user->email,
            'accion' => 'Cerró sesión en sistema',
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        $user->tokens()->delete();
        return response()->json(['message' => 'Logout successful'], 200);
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

        // Solo administradores (rol_id = 1)
        if (!$admin || $admin->rol_id !== 1) {
            return response()->json([
                'message' => 'Acceso denegado. Solo administradores pueden realizar esta acción.',
            ], 403);
        }

        // Validar datos de entrada
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'name' => 'sometimes|string|max:150',
            'rol_id' => 'sometimes|integer|in:1,2,3', // ajusta los roles permitidos
            'unidad_operativa' => 'sometimes|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validacion',
                'errors' => $validator->errors()
            ], 422);
        }

        $userId = $request->input('user_id');
        $userData = $request->only(['name', 'rol_id', 'unidad_operativa']);

        // Evitar que un admin se auto-degrade (opcional)
        if ($userId == $admin->id && isset($userData['rol_id']) && $userData['rol_id'] !== 1) {
            return response()->json([
                'message' => 'No puedes cambiar tu propio rol a uno no administrador.',
            ], 400);
        }

        // Actualizar solo los campos permitidos
        $user = User::findOrFail($userId);
        $oldValues = $user->only(['name', 'rol_id', 'unidad_operativa']);
        $user->update($userData);
        $newValues = $user->only(['name', 'rol_id', 'unidad_operativa']);

        // Registrar en log
        $changes = [];
        foreach ($newValues as $key => $value) {
            if ($oldValues[$key] != $value) {
                $changes[] = "$key: {$oldValues[$key]} → $value";
            }
        }

        Log::create([
            'usuario_correo' => $admin->email,
            'accion' => 'Actualizó datos básicos del usuario ' . $user->email . '. Cambios: ' . implode(', ', $changes),
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Datos actualizados exitosamente.'
        ], 200);
    }

    // DESHABILITAR USUARIO (solo admin)
    public function disableUser(Request $request)
    {
        $admin = $request->user();

        // Validar que sea administrador
        if (!$admin || $admin->rol_id !== 1) {
            return response()->json([
                'message' => 'Acceso denegado. Solo administradores pueden deshabilitar usuarios.',
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
                'message' => 'No puedes deshabilitarte a ti mismo.',
            ], 400);
        }

        // Obtener usuario a deshabilitar
        $user = User::findOrFail($userId);

        // Si ya está deshabilitado, no hacer nada
        if ($user->activo == 0) {
            return response()->json([
                'message' => 'El usuario ya está deshabilitado.',
            ], 400);
        }

        // Deshabilitar
        $user->activo = 0;
        $user->save();

        // Registrar en log
        Log::create([
            'usuario_correo' => $admin->email,
            'accion' => "Deshabilitó al usuario {$user->email}",
            'entidad_afectada' => 'users',
            'entidad_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Usuario deshabilitado exitosamente.',
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

        // Validar que sea administrador
        if (!$user || $user->rol_id !== 1) {
            return response()->json([
                'message' => 'Acceso denegado. Solo administradores pueden ver la lista de usuarios.',
            ], 403);
        }

        // Obtener todos los usuarios, excluyendo el campo 'password'
        $users = User::select('id', 'name', 'email', 'rol_id', 'unidad_operativa', 'activo', 'created_at', 'updated_at')
            ->get();

        return response()->json([
            'users' => $users,
        ], 200);
    }
}
