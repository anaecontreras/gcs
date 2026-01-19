<?php

namespace App\Http\Controllers;

use App\Models\Comentariosforo;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComentariosforoController extends Controller
{
    public function index()
    {
        // Ordenado del más reciente al más viejo
        $comentarios = Comentariosforo::with(['usuario:id,name', 'tema:id,titulo'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['comentarios' => $comentarios], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'tema_id' => 'required|exists:temasforos,id',
            'cuerpo'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comentario = Comentariosforo::create([
            'tema_id'            => $request->tema_id,
            'usuario_creador_id' => $user->id,
            'cuerpo'             => $request->cuerpo,
        ]);

        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de Comentario en Tema ID: {$request->tema_id}",
            'entidad_afectada' => 'comentariosforos',
            'entidad_id'       => $comentario->id,
        ]);

        return response()->json(['message' => 'Comentario creado', 'comentario' => $comentario], 201);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'     => 'required|exists:comentariosforos,id',
            'cuerpo' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comentario = Comentariosforo::find($request->id);
        $comentario->update($request->only(['cuerpo']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de Comentario ID: {$comentario->id}",
            'entidad_afectada' => 'comentariosforos',
            'entidad_id'       => $comentario->id,
        ]);

        return response()->json(['message' => 'Comentario actualizado', 'comentario' => $comentario], 200);
    }

    public function destroy(Request $request, $id)
    {
        $comentario = Comentariosforo::find($id);

        if (!$comentario) {
            return response()->json(['message' => 'Comentario no encontrado'], 404);
        }

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de Comentario ID: {$id}",
            'entidad_afectada' => 'comentariosforos',
            'entidad_id'       => $id,
        ]);

        $comentario->delete();

        return response()->json(['message' => 'Comentario eliminado'], 200);
    }
}
