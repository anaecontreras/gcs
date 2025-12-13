<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Obtener mis logs (del usuario autenticado)
     */
    public function misLogs(Request $request)
    {
        $logs = Log::where('usuario_id', $request->user()->id)
            ->orderBy('fecha_hora', 'desc')
            ->paginate(50);

        return response()->json($logs);
    }

    /**
     * Obtener todos los logs (solo para admin)
     */
    public function todos(Request $request)
    {
        // Aquí puedes agregar lógica de permisos si lo deseas
        $logs = Log::orderBy('fecha_hora', 'desc')->paginate(100);
        return response()->json($logs);
    }

    /**
     * Filtrar logs por rango de fechas
     */
    public function filtrar(Request $request)
    {
        $validated = $request->validate([
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'usuario_id' => 'nullable|integer',
            'accion' => 'nullable|string',
        ]);

        $query = Log::whereBetween('fecha_hora', [
            $validated['fecha_inicio'],
            $validated['fecha_fin']
        ]);

        if ($request->filled('usuario_id')) {
            $query->where('usuario_id', $validated['usuario_id']);
        }

        if ($request->filled('accion')) {
            $query->where('accion', $validated['accion']);
        }

        $logs = $query->orderBy('fecha_hora', 'desc')->paginate(50);
        return response()->json($logs);
    }
}