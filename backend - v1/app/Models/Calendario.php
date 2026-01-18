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
}
