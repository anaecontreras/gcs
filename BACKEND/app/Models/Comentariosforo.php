<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentariosforo extends Model
{
    // Definimos la tabla a mano: así nos curamos en salud si algún día cambian las convenciones de plural de Laravel
    protected $table = 'comentariosforos';

    // Solo estos campos pueden llenarse masivamente: evitamos que el cliente envíe datos que no debe tocar
    protected $fillable = [
        'tema_id',
        'usuario_creador_id',
        'cuerpo'
    ];

    /**
     * Cada comentario sabe a qué tema pertenece.
     * Esto nos permite navegar del comentario al hilo y armar vistas anidadas sin consultas manuales.
     */
    public function tema() {
        return $this->belongsTo(Temasforo::class, 'tema_id');
    }

    /**
     * Vincula el comentario con su autor.
     * Así podemos mostrar quién escribió qué y aplicar filtros por usuario cuando haga falta.
     */
    public function usuario() {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}