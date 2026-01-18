<?php

// app/Http/Controllers/LogController.php
namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    // No debe estar protegido por middleware
    public function intentoLogin(Request $request)
    {
        // Espera: usuario_correo, accion, entidad_afectada, entidad_id
        $log = Log::create([
            'usuario_correo'   => $request->input('usuario_correo'),
            'accion'           => $request->input('accion'),
            'entidad_afectada' => $request->input('entidad_afectada', 'users'),
            'entidad_id'       => $request->input('entidad_id'), // puede ser null
        ]);

        return response()->json([
            'message' => 'Log registrado',
            'log'     => $log,
        ], 201);
    }

    public function index()
    {
        // Obtener todos los logs
        $logs = Log::select('id', 'accion', 'usuario_correo', 'entidad_afectada', 'entidad_id', 'created_at')
            ->get();

        return response()->json([
            'logs' => $logs,
        ], 200);
    }
}
