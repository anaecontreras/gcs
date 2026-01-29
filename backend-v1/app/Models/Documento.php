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

    public function categoria()
    {
        return $this->belongsTo(Categoriadoc::class, 'categoria_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}
