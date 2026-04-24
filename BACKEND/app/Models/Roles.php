<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    // Tabla definida a mano: la convención de Laravel sería 'roles', pero nuestra BD usa 'rol' en singular
    protected $table = 'rol';

    // Solo este campo puede asignarse masivamente: así evitamos que alguien pueda inyectar datos que no debe tocar
    protected $fillable = [
        'rol'
    ];

    /**
     * Un rol puede tener muchos usuarios asignados.
     * Esta relación nos permite consultar qué usuarios tienen un permiso específico o filtrar listados por tipo de rol.
     */
    public function usuarios()
    {
        return $this->hasMany(User::class, 'rol_id');
    }
}