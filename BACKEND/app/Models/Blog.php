<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    // Tabla explícita: nos asegura que el modelo apunte al lugar correcto incluso si cambian las convenciones de naming
    protected $table = 'blogs';

    // Campos permitidos para asignación masiva: protegemos contra que el cliente envíe datos que no debe tocar
    protected $fillable = [
        'usuario_reporte_id',
        'titulo',
        'prioridad',
        'estado'
    ];

    /**
     * Vincula cada blog con el usuario que lo reportó.
     * Así podemos mostrar autoría en el frontend y aplicar filtros por responsable cuando haga falta.
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_reporte_id');
    }
}