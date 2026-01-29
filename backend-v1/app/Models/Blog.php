<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'usuario_reporte_id',
        'titulo',
        'prioridad',
        'estado'
    ];

    public function usuario()
    {
        // Relación donde 'usuario_reporte_id' apunta al 'id' de la tabla users
        return $this->belongsTo(User::class, 'usuario_reporte_id');
    }
}
