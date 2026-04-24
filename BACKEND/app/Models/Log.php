<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    // Tabla definida explícitamente: así nos aseguramos de que el modelo apunte al lugar correcto aunque cambien las convenciones de Laravel
    protected $table = 'logs';

    // Estos son los únicos campos que pueden llenarse masivamente: protegemos la integridad del log para que nadie pueda inyectar datos arbitrarios
    protected $fillable = [
        'usuario_correo',
        'accion',
        'entidad_afectada',
        'entidad_id',
    ];
}