<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';
    
    protected $fillable = [
        'usuario_id',
        'accion',
        'entidad_afectada',
        'entidad_id',
        'ip',
        'resultado',
        'fecha_hora',
    ];

    protected $casts = [
        'fecha_hora' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}