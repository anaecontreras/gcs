<?php

namespace App\Http\Controllers;

use App\Models\Calendario;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalendarioController extends Controller
{
    /**
     * Consulta todos los eventos del calendario.
     * Incluye al creador para que el frontend pueda mostrar autoría sin consultas adicionales.
     */
    public function index()
    {
        // Traemos solo los datos del creador que necesitamos: evita traer información sensible innecesaria
        $eventos = Calendario::with('creador:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'calendario' => $eventos,
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Registra un nuevo evento en el calendario.
     * El usuario que crea el evento se asigna automáticamente desde la sesión autenticada.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Validamos que las fechas tengan coherencia temporal: el fin debe ser posterior al inicio
        $validator = Validator::make($request->all(), [
            'titulo'       => 'required|string|max:200',
            'fecha_inicio' => 'required|date',
            'fecha_fin'    => 'required|date|after:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Creamos el evento vinculándolo al usuario autenticado: el cliente no puede forzar otro creador
        $evento = Calendario::create([
            'usuario_creador_id' => $user->id,
            'titulo'             => $request->titulo,
            'fecha_inicio'       => $request->fecha_inicio,
            'fecha_fin'          => $request->fecha_fin,
        ]);

        // Auditoría: quién agendó qué y cuándo, para poder rastrear cambios si hace falta
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro en calendario: {$evento->titulo}",
            'entidad_afectada' => 'calendarios',
            'entidad_id'       => $evento->id,
        ]);

        return response()->json(['message' => 'Fecha registrada', 'evento' => $evento], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Actualiza un evento existente.
     * Permite enviar solo los campos que cambian, sin obligar a reenviar todo el payload.
     */
    public function edit(Request $request)
    {
        // El ID es obligatorio para saber qué actualizar; el resto se valida solo si viene en la petición
        $validator = Validator::make($request->all(), [
            'id'           => 'required|exists:calendarios,id',
            'titulo'       => 'sometimes|required|string|max:200',
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin'    => 'sometimes|required|date|after:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $evento = Calendario::find($request->id);
        
        // Actualizamos únicamente los campos permitidos: protege contra asignación masiva no deseada
        $evento->update($request->only(['titulo', 'fecha_inicio', 'fecha_fin']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición en calendario: ID {$evento->id}",
            'entidad_afectada' => 'calendarios',
            'entidad_id'       => $evento->id,
        ]);

        return response()->json(['message' => 'Fecha actualizada', 'evento' => $evento], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Elimina un evento del calendario.
     * Verifica que el registro exista antes de operar y deja traza de la acción.
     */
    public function destroy(Request $request, $id)
    {
        // Validamos el ID contra la base de datos para evitar errores al intentar borrar algo inexistente
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:calendarios,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'No existe el registro'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $evento = Calendario::find($id);

        // Registramos la acción antes de eliminar: así conservamos el título para el historial de auditoría
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación en calendario: {$evento->titulo}",
            'entidad_afectada' => 'calendarios',
            'entidad_id'       => $evento->id,
        ]);

        $evento->delete();

        return response()->json(['message' => 'Registro eliminado'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}