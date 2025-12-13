<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;  // ← ESTA LÍNEA DEBE ESTAR

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;  // ← Y AQUÍ en use

    protected $fillable = [
        'rol_id',
        'email',
        'password',
        'nombre_completo',
        'unidad_operativa',
        'activo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'activo' => 'boolean',
    ];

    // Relación con Logs
    public function logs()
    {
        return $this->hasMany(Log::class, 'usuario_id');
    }

    // Relación con Rol
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'rol_id');
    }

    
    // Relación: Un usuario tiene muchos logs de actividad
    public function actividades()
    {
        return $this->hasMany(LogActivity::class, 'usuario_id');
    }
}