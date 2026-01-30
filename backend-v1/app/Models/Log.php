<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'usuario_id',
        'accion',
        'modulo',
        'fecha_hora'
    ];

    public $timestamps = true;

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}