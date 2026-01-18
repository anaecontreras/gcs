<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index()
    {
        // Ordenado del más reciente al más viejo
        $blogs = Blog::orderBy('created_at', 'desc')->get();

        return response()->json([
            'blogs' => $blogs,
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'titulo'    => 'required|string|max:200',
            'prioridad' => 'required|in:Alta,Media,Baja',
            'estado'    => 'required|in:En Progreso,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $blog = Blog::create([
            'usuario_reporte_id' => $user->id,
            'titulo'             => $request->titulo,
            'prioridad'          => $request->prioridad,
            'estado'             => $request->estado,
        ]);

        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de Blog: {$blog->titulo}",
            'entidad_afectada' => 'blogs',
            'entidad_id'       => $blog->id,
        ]);

        return response()->json(['message' => 'Evento creado exitosamente', 'blog' => $blog], 201);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'        => 'required|exists:blogs,id',
            'titulo'    => 'sometimes|required|string|max:200',
            'prioridad' => 'sometimes|required|in:Alta,Media,Baja',
            'estado'    => 'sometimes|required|in:En Progreso,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422);
        }

        $blog = Blog::find($request->id);
        $blog->update($request->only(['titulo', 'prioridad', 'estado']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de Blog: ID {$blog->id} - {$blog->titulo}",
            'entidad_afectada' => 'blogs',
            'entidad_id'       => $blog->id,
        ]);

        return response()->json(['message' => 'Evento actualizado exitosamente', 'blog' => $blog], 200);
    }

    public function destroy(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:blogs,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'El evento no existe'], 404);
        }

        $blog = Blog::find($id);

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de Blog: {$blog->titulo}",
            'entidad_afectada' => 'blogs',
            'entidad_id'       => $blog->id,
        ]);

        $blog->delete();

        return response()->json(['message' => 'Evento eliminado correctamente'], 200);
    }
}
