<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Documento;
use App\Models\TemasForo;
use App\Models\Calendario;
use Illuminate\Http\Request;

class SummaryController extends Controller
{
    /**
     * Consolida las métricas principales para el dashboard.
     * Consultas directas a BD para evitar sobrecargar el servidor con datos que ya podemos resumir desde el origen.
     */
    public function getDashboardStats()
    {
        try {
            // Conteos en base de datos: más eficiente que traer colecciones y filtrar en PHP
            $stats = [
                // Alertas que aún requieren atención del equipo
                'alertasActivas'  => Blog::where('estado', 'En Progreso')->count(),
                // Volumen total de documentos gestionados en el sistema
                'totalDocumentos' => Documento::count(),
                // Hilos de discusión que siguen abiertos a participación
                'hilosActivos'    => TemasForo::where('estado', 'Abierto')->count(),
                // Eventos cuya fecha de fin no ha pasado: lo que está vigente hoy
                'eventosVigentes' => Calendario::where('fecha_fin', '>=', now())->count(),
            ];

            return response()->json($stats, 200, [
                'Content-Type' => 'application/json; charset=UTF-8'
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            // Si algo falla al consultar las estadísticas, devolvemos el error para que frontend pueda mostrar un mensaje útil
            return response()->json([
                'message' => 'Error al recopilar estadísticas',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}