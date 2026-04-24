<?php

namespace App\Http\Controllers;

use App\Models\Categoriadoc;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategoriadocController extends Controller
{
    /**
     * Listado ligero de categorías.
     * Solo traemos lo que el frontend realmente muestra: id y nombre.
     */
    public function index()
    {
        // Selección mínima de columnas: reduce ancho de banda y evita exponer campos internos
        $categorias = Categoriadoc::select('id', 'nombre_categoria')
            ->get();

        return response()->json([
            'categorias' => $categorias,
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Crea una nueva categoría documental.
     * Valida unicidad y deja traza de quién la registró para auditoría.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // El nombre debe ser único: evitamos duplicados que puedan confundir al usuario final
        $validator = Validator::make($request->all(), [
            'nombre_categoria' => 'required|string|max:100|unique:categoriadocs',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $categoria = Categoriadoc::create($request->only(['nombre_categoria']));

        // Auditoría: capturamos quién hizo el cambio y qué valor se guardó, por si hay que revertir o investigar
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de categoria: {$categoria->nombre_categoria}",
            'entidad_afectada' => 'categoriadocs',
            'entidad_id'       => $categoria->id,
        ]);

        return response()->json(['message' => 'Categoria creada exitosamente', 'categoria' => $categoria], 201);
    }

    /**
     * Actualiza una categoría existente.
     * La validación de unicidad excluye el registro actual para no lanzar falso positivo.
     */
    public function edit(Request $request)
    {
        // Validamos que el ID exista y que el nuevo nombre no colisione con otro registro (excepto el propio)
        $validator = Validator::make($request->all(), [
            'id'               => 'required|exists:categoriadocs,id',
            'nombre_categoria' => 'required|string|max:100|unique:categoriadocs,nombre_categoria,' . $request->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $categoriadoc = Categoriadoc::findOrFail($request->id);
        $user = $request->user();

        // Actualización manual: más explícita que un update masivo, facilita leer qué campos cambian
        $categoriadoc->nombre_categoria = $request->input('nombre_categoria');
        $categoriadoc->save();
        
        // Log post-actualización: registramos el valor final para tener historial de cambios
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Edición de categoria: {$categoriadoc->nombre_categoria}",
            'entidad_afectada' => 'categoriadocs',
            'entidad_id'       => $categoriadoc->id,
        ]);

        return response()->json([
            'message' => 'Datos actualizados exitosamente.'
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Elimina una categoría.
     * Registramos la acción antes de borrar para no perder el nombre en el historial de auditoría.
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        // Buscamos el registro para validar existencia y capturar datos antes de la eliminación
        $categoriadoc = Categoriadoc::find($id);

        if (!$categoriadoc) {
            return response()->json(['message' => 'Categoría no encontrada'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Nota: si en el futuro hay una relación con documentos, convendría validar aquí antes de permitir el borrado

        // Log primero: si borramos antes, perdemos el nombre de la categoría para el registro
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Eliminación de categoria: {$categoriadoc->nombre_categoria}",
            'entidad_afectada' => 'categoriadocs',
            'entidad_id'       => $categoriadoc->id,
        ]);

        $categoriadoc->delete();

        return response()->json([
            'status' => true,
            'message' => 'Categoría eliminada correctamente'
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}