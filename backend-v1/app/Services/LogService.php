<?php

namespace App\Services;

use App\Models\Log;

class LogService
{
    public static function registrar($usuario_id, $accion, $modulo)
    {
        Log::create([
            'usuario_id' => $usuario_id,
            'accion'     => $accion,
            'modulo'     => $modulo,
            'fecha_hora' => now()
        ]);
    }
}