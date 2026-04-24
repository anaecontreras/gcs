<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    // Tabla definida explícitamente: así nos aseguramos de que el modelo apunte al lugar correcto aunque cambien las convenciones de Laravel
    protected $table = 'documentos';

    // Campos permitidos para asignación masiva: protegemos el modelo contra datos que el cliente no debería poder inyectar
    protected $fillable = [
        'categoria_id',
        'usuario_creador_id',
        'titulo',
        'ruta_archivo',
        'version',
        'fecha_publicacion'
    ];

    /**
     * Cada documento sabe a qué categoría pertenece.
     * Esta relación nos permite filtrar documentos por tipo o validar si una categoría está en uso antes de eliminarla.
     */
    public function categoria()
    {
        return $this->belongsTo(Categoriadoc::class, 'categoria_id');
    }

    /**
     * Vincula el documento con el usuario que lo subió.
     * Así podemos mostrar autoría en el frontend y aplicar permisos o filtros por responsable cuando haga falta.
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}