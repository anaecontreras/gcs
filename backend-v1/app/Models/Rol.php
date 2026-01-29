<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    // Tabla oficial
    protected $table = 'roles';

    // Campos permitidos para asignación masiva
    protected $fillable = [
        'nombre_rol',
    ];

    // Relación: un rol tiene muchos usuarios
    public function usuarios()
    {
        return $this->hasMany(User::class, 'rol_id');
    }
}