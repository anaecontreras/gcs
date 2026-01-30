<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForumPost extends Model
{
    protected $table = 'forum_posts';

    protected $fillable = [
        'usuario_id',
        'titulo',
        'contenido',
        'categoria',
        'fijado',
        'cerrado',
        'vistas'
    ];

    public $timestamps = true;

    // Accesores personalizados
    public function getFechaCreacionAttribute()
    {
        return $this->created_at;
    }

    public function getFechaActualizacionAttribute()
    {
        return $this->updated_at;
    }

    // Relaciones
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    /**
    * Relación con comentarios del post
    */
    public function comentarios()
    {
        return $this->hasMany(ComentarioForo::class, 'tema_id');
    }
}