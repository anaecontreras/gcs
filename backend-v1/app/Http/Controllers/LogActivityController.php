<?php

namespace App\Http\Controllers;

use App\Models\LogActivity;
use Illuminate\Http\Request;

class LogActivityController extends Controller
{
    /**
     * GET - Obtener mis logs de actividad (del usuario autenticado)
     * Ruta: GET /api/logs-activity/mis-actividades
     */
    public function misActividades(Request $request)
    {
        try {
            $usuario_id = $request->user()->id;
            
            $actividades = LogActivity::where('usuario_id', $usuario_id)
                ->orderBy('timestamp', 'desc')
                ->paginate(50);

            return response()->json([
                'message' => 'Mis actividades obtenidas correctamente',
                'data' => $actividades
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener actividades',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET - Obtener todas las actividades (requiere autenticación)
     * Ruta: GET /api/logs-activity/todas
     */
    public function todas(Request $request)
    {
        try {
            $actividades = LogActivity::with('usuario')
                ->orderBy('timestamp', 'desc')
                ->paginate(100);

            return response()->json([
                'message' => 'Todas las actividades obtenidas correctamente',
                'data' => $actividades
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener actividades',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST - Filtrar actividades por fecha, módulo, tipo_operacion, usuario
     * Ruta: POST /api/logs-activity/filtrar
     * 
     * Body esperado:
     * {
     *   "fecha_inicio": "2025-01-01",
     *   "fecha_fin": "2025-12-31",
     *   "modulo": "usuarios",           // opcional
     *   "tipo_operacion": "CREATE",     // opcional
     *   "usuario_id": 1                 // opcional
     * }
     */
    public function filtrar(Request $request)
    {
        try {
            $validated = $request->validate([
                'fecha_inicio' => 'required|date',
                'fecha_fin' => 'required|date',
                'modulo' => 'nullable|string',
                'tipo_operacion' => 'nullable|string',
                'usuario_id' => 'nullable|integer',
            ]);

            $query = LogActivity::query();

            // Filtro de fechas (obligatorio)
            $query->whereBetween('timestamp', [
                $validated['fecha_inicio'] . ' 00:00:00',
                $validated['fecha_fin'] . ' 23:59:59'
            ]);

            // Filtros opcionales
            if ($request->filled('modulo')) {
                $query->where('modulo', 'like', '%' . $validated['modulo'] . '%');
            }

            if ($request->filled('tipo_operacion')) {
                $query->where('tipo_operacion', $validated['tipo_operacion']);
            }

            if ($request->filled('usuario_id')) {
                $query->where('usuario_id', $validated['usuario_id']);
            }

            $actividades = $query->with('usuario')
                ->orderBy('timestamp', 'desc')
                ->paginate(50);

            return response()->json([
                'message' => 'Filtro aplicado correctamente',
                'data' => $actividades
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al filtrar actividades',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}