<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComentarioForo extends Model
{
    protected $table = 'comentarios_foros';

    protected $fillable = [
        'tema_id',
        'usuario_creador_id',
        'cuerpo',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación con el post del foro
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(ForumPost::class, 'tema_id');
    }

    /**
     * Relación con el usuario creador
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}