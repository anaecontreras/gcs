<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoriadoc extends Model
{
    // Tabla definida explícitamente: nos aseguramos de apuntar al lugar correcto aunque cambien las convenciones de Laravel
    protected $table = 'categoriadocs';

    // Solo este campo puede asignarse masivamente: mantenemos el control sobre qué datos pueden venir del request
    protected $fillable = [
        'nombre_categoria'
    ];

    /**
     * Una categoría puede tener muchos documentos asociados.
     * Esta relación nos permite listar documentos por categoría o validar si una categoría está en uso antes de eliminarla.
     */
    public function documentos()
    {
        return $this->hasMany(Documento::class, 'categoria_id');
    }
}