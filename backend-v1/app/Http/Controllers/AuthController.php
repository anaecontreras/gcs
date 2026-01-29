<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\LogService;
use App\Services\LogActivityService;

class AuthController extends Controller
{
    /**
     * Registrar usuario
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nombre_completo'   => 'required|string|max:255',
            'email'             => 'required|email|unique:users,email',
            'password'          => 'required|min:6',
            'rol_id'            => 'required|integer',
            'unidad_operativa'  => 'required|string|max:255',
        ]);

        $user = User::create([
            'nombre_completo'  => $validated['nombre_completo'],
            'email'            => $validated['email'],
            'password'         => Hash::make($validated['password']),
            'rol_id'           => $validated['rol_id'],
            'unidad_operativa' => $validated['unidad_operativa'],
            'activo'           => true,
        ]);

        // Log general
        LogService::registrar(
            $user->id,
            'REGISTRO',
            'usuarios'
        );

        // Log de actividad
        LogActivityService::registrar(
            usuario_id: $user->id,
            tipo_operacion: 'CREATE',
            modulo: 'usuarios',
            id_registro_afectado: $user->id
        );

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'usuario' => $user
        ], 201);
    }

    /**
     * Login de usuario
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        // Si el usuario no existe o la contraseña es incorrecta
        if (!$user || !Hash::check($validated['password'], $user->password)) {

            // Log de intento fallido SIN usuario
            LogService::registrar(
                null,
                'LOGIN_FALLIDO',
                'usuarios'
            );

            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // Log general
        LogService::registrar(
            $user->id,
            'LOGIN',
            'usuarios'
        );

        // Log de actividad
        LogActivityService::registrar(
            usuario_id: $user->id,
            tipo_operacion: 'READ',
            modulo: 'autenticacion',
            id_registro_afectado: $user->id
        );

        // Crear token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'Login exitoso',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'usuario'      => $user,
        ]);
    }

    /**
     * Logout de usuario
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            // Log general
            LogService::registrar(
                $user->id,
                'LOGOUT',
                'usuarios'
            );

            // Log de actividad
            LogActivityService::registrar(
                usuario_id: $user->id,
                tipo_operacion: 'READ',
                modulo: 'autenticacion',
                id_registro_afectado: $user->id
            );
        }

        // Revocar token actual
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}