<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentariosforo extends Model
{
    protected $table = 'comentariosforos';

    protected $fillable = [
        'tema_id',
        'usuario_creador_id',
        'cuerpo'
    ];

    // Relación con el Tema
    public function tema() {
        return $this->belongsTo(Temasforo::class, 'tema_id');
    }

    // Relación con el Usuario
    public function usuario() {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
}