<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemasForo extends Model
{
    use HasFactory;

    // Tabla definida explícitamente: así nos curamos en salud si algún día cambian las convenciones de plural de Laravel
    protected $table = 'temasforos';

    // Solo estos campos pueden asignarse masivamente: protegemos el modelo contra datos que el cliente no debería poder inyectar
    protected $fillable = [
        'usuario_creador_id',
        'titulo',
        'estado'
    ];

    /**
     * Configuramos el ciclo de vida del modelo.
     * Aquí definimos qué pasa automáticamente cuando un tema se elimina.
     */
    protected static function boot()
    {
        parent::boot();

        // Cascada manual: si borran un tema, sus comentarios se van también para no dejar basura en la BD
        static::deleting(function ($tema) {
            $tema->comentarios()->delete();
        });
    }

    /**
     * Cada tema sabe quién lo creó.
     * Esta relación nos permite mostrar autoría en el foro y filtrar por usuario cuando haga falta.
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }

    /**
     * Un tema puede tener muchos comentarios.
     * Así podemos cargar toda la discusión de un hilo sin tener que hacer consultas manuales después.
     */
    public function comentarios()
    {
        return $this->hasMany(Comentariosforo::class, 'tema_id');
    }
}