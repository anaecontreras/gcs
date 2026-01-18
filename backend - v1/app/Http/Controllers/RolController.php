<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class RolController extends Controller
{
    public function index()
    {
        // Obtener todos los roles
        $roles = Roles::select('id', 'rol')
            ->get();

        return response()->json([
            'roles' => $roles,
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'rol' => 'required|string|max:50|unique:rol',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $rol = Roles::create($request->only(['rol']));

        // 👇 Registrar el log de la acción
        Log::create([
            'usuario_correo'   => $user->email, // Quién hizo el registro
            'accion'           => "Registro de rol: {$rol->rol}",
            'entidad_afectada' => 'roles',
            'entidad_id'       => $rol->id,
        ]);

        return response()->json(['message' => 'Rol creado exitosamente', 'rol' => $rol], 201);
    }

    public function edit(Request $request)
    {
        // 1. Validar la entrada
        $validator = Validator::make($request->all(), [
            'id'  => 'required|exists:rol,id',
            'rol' => 'required|string|max:50|unique:rol,rol,' . $request->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors'  => $validator->errors()
            ], 422);
        }

        // 2. Buscar y actualizar
        $rol = Roles::find($request->id);
        $rol->update([
            'rol' => $request->rol
        ]);

        // 3. Registrar Log
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de rol: ID {$rol->id} a nombre {$rol->rol}",
            'entidad_afectada' => 'roles',
            'entidad_id'       => $rol->id,
        ]);

        return response()->json(['message' => 'Rol actualizado exitosamente', 'rol' => $rol], 200);
    }

    public function destroy(Request $request, $id)
    {
        // 1. Validar que el ID sea numérico y exista en la tabla 'rol'
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:rol,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'El ID del rol no es válido o no existe',
                'errors' => $validator->errors()
            ], 404);
        }

        // 2. Buscar el objeto
        $rol = Roles::find($id);

        // 3. Registrar el log ANTES de eliminar (para tener los datos del rol)
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de rol: {$rol->rol}",
            'entidad_afectada' => 'rol',
            'entidad_id'       => $rol->id,
        ]);

        // 4. Eliminar definitivamente
        $rol->delete();

        return response()->json([
            'message' => "El rol '{$rol->rol}' ha sido eliminado correctamente"
        ], 200);
    }
}
