<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogActivity extends Model
{
    protected $table = 'logs_activity';
    
    protected $fillable = [
        'usuario_id',
        'tipo_operacion',
        'modulo',
        'id_registro_afectado',
        'timestamp',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación: Un log pertenece a un usuario
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}