<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\LogService;
use App\Services\LogActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * REGISTRO DE USUARIO
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'rol_id' => 'required|integer',
            'unidad_operativa' => 'required|string',
        ]);

        try {
            $user = User::create([
                'nombre_completo' => $validated['nombre_completo'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'rol_id' => $validated['rol_id'],
                'unidad_operativa' => $validated['unidad_operativa'],
                'activo' => true,
            ]);

            // Registrar en logs (Sprint 1)
            LogService::registrar(
                usuario_id: $user->id,
                accion: 'REGISTRO',
                resultado: 'exitoso',
                entidad_afectada: 'usuarios',
                entidad_id: $user->id,
                request: $request
            );

            // Registrar en logs_activity (HU-04)
            LogActivityService::registrar(
                usuario_id: $user->id,
                tipo_operacion: 'CREATE',
                modulo: 'usuarios',
                id_registro_afectado: $user->id
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Usuario registrado exitosamente',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'usuario' => $user,
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * LOGIN DE USUARIO
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        // Verificar credenciales
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            // Registrar intento fallido (Sprint 1)
            LogService::registrar(
                usuario_id: 0,
                accion: 'LOGIN',
                resultado: 'fallido',
                entidad_afectada: 'usuarios',
                request: $request
            );

            return response()->json(
                ['message' => 'Credenciales inválidas'],
                401
            );
        }

        // Registrar login exitoso (Sprint 1)
        LogService::registrar(
            usuario_id: $user->id,
            accion: 'LOGIN',
            resultado: 'exitoso',
            entidad_afectada: 'usuarios',
            request: $request
        );

        // Registrar en logs_activity (HU-04)
        LogActivityService::registrar(
            usuario_id: $user->id,
            tipo_operacion: 'READ',
            modulo: 'autenticacion',
            id_registro_afectado: $user->id
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $user,
        ]);
    }

    /**
     * LOGOUT DE USUARIO
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        // Registrar logout (Sprint 1)
        LogService::registrar(
            usuario_id: $user->id,
            accion: 'LOGOUT',
            resultado: 'exitoso',
            entidad_afectada: 'usuarios',
            request: $request
        );

        // Registrar en logs_activity (HU-04)
        LogActivityService::registrar(
            usuario_id: $user->id,
            tipo_operacion: 'READ',
            modulo: 'autenticacion',
            id_registro_afectado: $user->id
        );

        // Eliminar token
        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout exitoso']);
    }
}