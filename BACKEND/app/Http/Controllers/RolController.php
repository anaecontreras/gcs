<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class RolController extends Controller
{
    /**
     * Listado ligero de roles.
     * Solo traemos lo que realmente se muestra en los selectores del frontend.
     */
    public function index()
    {
        // Campos mínimos: evitamos cargar información que no se va a usar en la vista
        $roles = Roles::select('id', 'rol')
            ->get();

        return response()->json([
            'roles' => $roles,
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Crea un nuevo rol en el sistema.
     * Validamos unicidad para evitar duplicados que puedan confundir al asignar permisos.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // El nombre del rol debe ser único: así prevenimos conflictos al momento de asignar roles a usuarios
        $validator = Validator::make($request->all(), [
            'rol' => 'required|string|max:50|unique:rol',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $rol = Roles::create($request->only(['rol']));

        // Auditoría: registramos quién creó el rol y con qué nombre, por si hay que rastrear cambios de permisos después
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de rol: {$rol->rol}",
            'entidad_afectada' => 'roles',
            'entidad_id'       => $rol->id,
        ]);

        return response()->json(['message' => 'Rol creado exitosamente', 'rol' => $rol], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Actualiza un rol existente.
     * La validación de unicidad excluye el propio registro para no lanzar falso positivo al editar.
     */
    public function edit(Request $request)
    {
        // Validamos que el ID exista y que el nuevo nombre no colisione con otro rol (excepto el que estamos editando)
        $validator = Validator::make($request->all(), [
            'id'  => 'required|exists:rol,id',
            'rol' => 'required|string|max:50|unique:rol,rol,' . $request->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors'  => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $rol = Roles::find($request->id);
        
        // Actualización directa: solo el campo 'rol' cambia, mantenemos el resto intacto por seguridad
        $rol->update([
            'rol' => $request->rol
        ]);

        // Log post-cambio: capturamos el valor final para tener historial de modificaciones en permisos críticos
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de rol: ID {$rol->id} a nombre {$rol->rol}",
            'entidad_afectada' => 'roles',
            'entidad_id'       => $rol->id,
        ]);

        return response()->json(['message' => 'Rol actualizado exitosamente', 'rol' => $rol], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Elimina un rol del sistema.
     * Registramos la acción antes de borrar para no perder el nombre en el historial de auditoría.
     */
    public function destroy(Request $request, $id)
    {
        // Validamos que el ID corresponda a un rol real antes de intentar cualquier operación
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:rol,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'El ID del rol no es válido o no existe',
                'errors' => $validator->errors()
            ], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $rol = Roles::find($id);

        // Log primero: si borramos el registro antes, perdemos el nombre del rol para el registro de auditoría
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de rol: {$rol->rol}",
            'entidad_afectada' => 'rol',
            'entidad_id'       => $rol->id,
        ]);

        $rol->delete();

        return response()->json([
            'message' => "El rol '{$rol->rol}' ha sido eliminado correctamente"
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}