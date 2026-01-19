<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    protected $table = 'calendarios';

    protected $fillable = [
        'usuario_creador_id',
        'titulo',
        'fecha_inicio',
        'fecha_fin'
    ];

    public function creador()
    {
        // Relación donde 'usuario_creador_id' apunta al 'id' de la tabla users
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}
