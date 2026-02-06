<?php

namespace App\Http\Controllers;

use App\Models\Categoriadoc;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategoriadocController extends Controller
{
    public function index()
    {
        // Obtener todos las categorias
        $categorias = Categoriadoc::select('id', 'nombre_categoria')
            ->get();

        return response()->json([
            'categorias' => $categorias,
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'nombre_categoria' => 'required|string|max:100|unique:categoriadocs',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $categoria = Categoriadoc::create($request->only(['nombre_categoria']));

        // 👇 Registrar el log de la acción
        Log::create([
            'usuario_correo'   => $user->email, // Quién hizo el registro
            'accion'           => "Registro de categoria: {$categoria->nombre_categoria}",
            'entidad_afectada' => 'categoriadocs',
            'entidad_id'       => $categoria->id,
        ]);

        return response()->json(['message' => 'Categoria creada exitosamente', 'categoria' => $categoria], 201);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'               => 'required|exists:categoriadocs,id',
            'nombre_categoria' => 'required|string|max:100|unique:categoriadocs,nombre_categoria,' . $request->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $categoriadoc = Categoriadoc::findOrFail($request->id);
        $user = $request->user();

        $categoriadoc->nombre_categoria = $request->input('nombre_categoria');
        $categoriadoc->save();
        // 👇 Registrar el log de la acción
        Log::create([
            'usuario_correo'   => $user->email, // Quién hizo el registro
            'accion'           => "Edición de categoria: {$categoriadoc->nombre_categoria}",
            'entidad_afectada' => 'categoriadocs',
            'entidad_id'       => $categoriadoc->id,
        ]);

        return response()->json([
            'message' => 'Datos actualizados exitosamente.'
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        // 1. Buscar la categoría
        $categoriadoc = Categoriadoc::find($id);

        if (!$categoriadoc) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // 2. Opcional: Verificar si tiene documentos asociados antes de borrar
        // Si la categoría tiene documentos, quizás no quieras borrarla.

        // 3. Registrar el log ANTES de eliminar
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Eliminación de categoria: {$categoriadoc->nombre_categoria}",
            'entidad_afectada' => 'categoriadocs',
            'entidad_id'       => $categoriadoc->id,
        ]);

        // 4. Eliminar el registro
        $categoriadoc->delete();

        return response()->json([
            'status' => true,
            'message' => 'Categoría eliminada correctamente'
        ], 200);
    }
}
