<?php

namespace App\Http\Controllers;

use App\Models\Temasforo;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TemasforoController extends Controller
{
    public function index()
    {
        // Cargamos la relación 'usuario' para saber quién creó el tema
        $temas = Temasforo::with('usuario:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['temas' => $temas], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'estado' => 'required|in:Abierto,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422);
        }

        $tema = Temasforo::create([
            'usuario_creador_id' => $user->id,
            'titulo'             => $request->titulo,
            'estado'             => $request->estado,
        ]);

        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de Tema de Foro: {$tema->titulo}",
            'entidad_afectada' => 'temasforos',
            'entidad_id'       => $tema->id,
        ]);

        return response()->json(['message' => 'Tema creado exitosamente', 'tema' => $tema], 201);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'     => 'required|exists:temasforos,id',
            'titulo' => 'sometimes|required|string|max:255',
            'estado' => 'sometimes|required|in:Abierto,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422);
        }

        $tema = Temasforo::find($request->id);
        $tema->update($request->only(['titulo', 'estado']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de Tema de Foro: ID {$tema->id}",
            'entidad_afectada' => 'temasforos',
            'entidad_id'       => $tema->id,
        ]);

        return response()->json(['message' => 'Tema actualizado exitosamente', 'tema' => $tema], 200);
    }

    public function destroy(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:temasforos,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'El tema no existe'], 404);
        }

        $tema = Temasforo::find($id);

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de Tema de Foro: {$tema->titulo}",
            'entidad_afectada' => 'temasforos',
            'entidad_id'       => $tema->id,
        ]);

        $tema->delete();

        return response()->json(['message' => 'Tema eliminado correctamente'], 200);
    }
}
