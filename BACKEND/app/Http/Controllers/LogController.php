<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Endpoint público para registrar eventos de auditoría.
     * Diseñado para recibir logs desde contextos no autenticados (ej: intentos de login fallidos).
     */
    public function intentoLogin(Request $request)
    {
        // Creamos el registro con los datos que llegan: entidad_afectada tiene 'users' por defecto si no se especifica
        $log = Log::create([
            'usuario_correo'   => $request->input('usuario_correo'),
            'accion'           => $request->input('accion'),
            'entidad_afectada' => $request->input('entidad_afectada', 'users'),
            'entidad_id'       => $request->input('entidad_id'), // puede ser null cuando el usuario aún no existe
        ]);

        return response()->json([
            'message' => 'Log registrado',
            'log'     => $log,
        ], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Listado de logs para revisión administrativa.
     * Traemos solo los campos necesarios para mantener la respuesta ligera y útil.
     */
    public function index()
    {
        // Selección mínima: lo justo para que un admin pueda auditar sin exponer datos innecesarios
        $logs = Log::select('id', 'accion', 'usuario_correo', 'entidad_afectada', 'entidad_id', 'created_at')
            ->get();

        return response()->json([
            'logs' => $logs,
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}