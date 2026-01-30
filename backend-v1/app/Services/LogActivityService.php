<?php

namespace App\Services;

use App\Models\LogActivity;

class LogActivityService
{
    /**
     * Registra una actividad en la tabla logs_activity
     * 
     * @param int $usuario_id - ID del usuario que realiza la acción
     * @param string $tipo_operacion - CREATE, READ, UPDATE, DELETE
     * @param string $modulo - Nombre del módulo (usuarios, documentos, etc)
     * @param int|null $id_registro_afectado - ID del registro afectado
     */
    public static function registrar(
        int $usuario_id,
        string $tipo_operacion,
        string $modulo,
        int $id_registro_afectado = null
    ) {
        try {
            LogActivity::create([
                'usuario_id' => $usuario_id,
                'tipo_operacion' => $tipo_operacion,
                'modulo' => $modulo,
                'id_registro_afectado' => $id_registro_afectado,
                'timestamp' => now(),
            ]);
        } catch (\Exception $e) {
            \Log::error('Error registrando log de actividad: ' . $e->getMessage());
        }
    }
}