<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    // Definimos la tabla explícitamente: así evitamos sorpresas si en algún momento cambian las convenciones de plural de Laravel
    protected $table = 'calendarios';

    // Solo estos campos pueden asignarse masivamente: protegemos el modelo contra datos que el cliente no debería poder modificar
    protected $fillable = [
        'usuario_creador_id',
        'titulo',
        'fecha_inicio',
        'fecha_fin'
    ];

    /**
     * Cada evento sabe quién lo creó.
     * Esta relación nos permite mostrar autoría en el calendario y filtrar por responsable cuando haga falta.
     */
    public function creador()
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}