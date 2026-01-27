<?php

namespace App\Services;

use App\Models\Log;
use Illuminate\Http\Request;

class LogService
{
    /**
     * Registra una acción en la tabla de logs
     */
    public static function registrar(
        int $usuario_id,
        string $accion,
        string $resultado,
        string $entidad_afectada = null,
        int $entidad_id = null,
        Request $request = null
    ) {
        try {
            $ip = $request ? $request->ip() : '0.0.0.0';
            
            Log::create([
                'usuario_id' => $usuario_id,
                'accion' => $accion,
                'entidad_afectada' => $entidad_afectada,
                'entidad_id' => $entidad_id,
                'ip' => $ip,
                'resultado' => $resultado,
                'fecha_hora' => now(),
            ]);
        } catch (\Exception $e) {
            \Log::error('Error registrando log: ' . $e->getMessage());
        }
    }
}