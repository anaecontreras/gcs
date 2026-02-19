<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Documento; // Asegúrate de que estos nombres coincidan con tus modelos
use App\Models\TemasForo;
use App\Models\Calendario;
use Illuminate\Http\Request;

class SummaryController extends Controller
{
    public function getDashboardStats()
    {
        try {
            // Realizamos todos los conteos directamente en la DB
            $stats = [
                'alertasActivas'  => Blog::where('estado', 'En Progreso')->count(),
                'totalDocumentos' => Documento::count(),
                'hilosActivos'    => TemasForo::where('estado', 'Abierto')->count(),
                'eventosVigentes' => Calendario::where('fecha_fin', '>=', now())->count(),
            ];

            return response()->json($stats, 200, [
                'Content-Type' => 'application/json; charset=UTF-8'
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al recopilar estadísticas',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
