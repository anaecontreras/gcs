<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use DateTimeInterface;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    // Aqui agregue HasApiTokens para manejo de tokens con Laravel Sanctum
    use HasFactory, Notifiable, HasApiTokens;

    // Agregado para manejo de horas
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'rol_id',
        'email',
        'password',
        'name',
        'unidad_operativa',
        'activo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function rol()
    {
        // Relación donde 'rol_id' en la tabla users apunta al 'id' de la tabla rol
        return $this->belongsTo(Roles::class, 'rol_id');
    }

    // app/Models/User.php

    public function documentos()
    {
        return $this->hasMany(Documento::class, 'usuario_creador_id');
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'usuario_reporte_id');
    }

    public function eventosCalendario()
    {
        return $this->hasMany(Calendario::class, 'usuario_creador_id');
    }

    public function temasForo()
    {
        return $this->hasMany(TemasForo::class, 'usuario_creador_id');
    }
}
