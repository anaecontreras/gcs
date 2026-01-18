<?php

namespace App\Http\Controllers;

use App\Models\Calendario;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalendarioController extends Controller
{
    public function index()
    {
        // Ordenado del más reciente al más viejo por fecha de creación
        $eventos = Calendario::orderBy('created_at', 'desc')->get();

        return response()->json([
            'calendario' => $eventos,
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'titulo'       => 'required|string|max:200',
            'fecha_inicio' => 'required|date',
            'fecha_fin'    => 'required|date|after:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $evento = Calendario::create([
            'usuario_creador_id' => $user->id,
            'titulo'             => $request->titulo,
            'fecha_inicio'       => $request->fecha_inicio,
            'fecha_fin'          => $request->fecha_fin,
        ]);

        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro en calendario: {$evento->titulo}",
            'entidad_afectada' => 'calendarios',
            'entidad_id'       => $evento->id,
        ]);

        return response()->json(['message' => 'Fecha registrada', 'evento' => $evento], 201);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'           => 'required|exists:calendarios,id',
            'titulo'       => 'sometimes|required|string|max:200',
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin'    => 'sometimes|required|date|after:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $evento = Calendario::find($request->id);
        $evento->update($request->only(['titulo', 'fecha_inicio', 'fecha_fin']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición en calendario: ID {$evento->id}",
            'entidad_afectada' => 'calendarios',
            'entidad_id'       => $evento->id,
        ]);

        return response()->json(['message' => 'Fecha actualizada', 'evento' => $evento], 200);
    }

    public function destroy(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:calendarios,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'No existe el registro'], 404);
        }

        $evento = Calendario::find($id);

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación en calendario: {$evento->titulo}",
            'entidad_afectada' => 'calendarios',
            'entidad_id'       => $evento->id,
        ]);

        $evento->delete();

        return response()->json(['message' => 'Registro eliminado'], 200);
    }
}
