<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table = 'documentos';

    protected $fillable = [
        'categoria_id',
        'usuario_creador_id',
        'titulo',
        'ruta_archivo',
        'version',
        'fecha_publicacion'
    ];
}
