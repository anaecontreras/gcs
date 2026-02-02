<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemasForo extends Model
{
    use HasFactory;

    protected $table = 'temasforos';

    protected $fillable = [
        'usuario_creador_id',
        'titulo',
        'estado'
    ];

    /**
     * Boot del modelo para manejar eventos.
     */
    protected static function boot()
    {
        parent::boot();

        // Al dispararse el evento de eliminación del tema
        static::deleting(function ($tema) {
            // Eliminamos todos sus comentarios asociados automáticamente
            $tema->comentarios()->delete();
        });
    }

    public function usuario()
    {
        // Relación donde 'usuario_creador_id' apunta al 'id' de la tabla users
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }

    public function comentarios()
    {
        // Relación de uno a muchos
        return $this->hasMany(Comentariosforo::class, 'tema_id');
    }
}
