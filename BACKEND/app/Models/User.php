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
    // Traits base: Notifiable para correos, HasApiTokens para autenticación vía Sanctum
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Formato consistente para fechas en respuestas JSON.
     * Así el frontend recibe siempre el mismo formato sin tener que adaptar cada llamada.
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
    
    // Forzamos el formato de fechas en serialización para que coincida con lo que espera el frontend
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];


    /**
     * Campos que pueden asignarse masivamente.
     * Solo estos pasan del request al modelo: protegemos contra inyección de datos no autorizados.
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
     * Atributos que nunca deben exponerse en respuestas JSON.
     * Password y remember_token se quedan en el servidor, por seguridad.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Configuración adicional de casts: password se hashea automáticamente, email_verified_at se maneja como datetime.
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

    /**
     * Cada usuario tiene un rol asignado.
     * Esta relación nos permite verificar permisos y filtrar listados por tipo de usuario.
     */
    public function rol()
    {
        return $this->belongsTo(Roles::class, 'rol_id');
    }

    /**
     * Documentos creados por este usuario.
     * Así podemos listar sus aportes o validar si tiene archivos antes de permitir ciertas acciones.
     */
    public function documentos()
    {
        return $this->hasMany(Documento::class, 'usuario_creador_id');
    }

    /**
     * Reportes/alertas que este usuario ha generado.
     * Útil para dashboards personales o auditoría de actividad.
     */
    public function blogs()
    {
        return $this->hasMany(Blog::class, 'usuario_reporte_id');
    }

    /**
     * Eventos que este usuario agendó en el calendario.
     * Nos permite mostrar su agenda o filtrar por responsable.
     */
    public function eventosCalendario()
    {
        return $this->hasMany(Calendario::class, 'usuario_creador_id');
    }

    /**
     * Temas de foro iniciados por este usuario.
     * Así podemos rastrear su participación o aplicar moderación específica.
     */
    public function temasForo()
    {
        return $this->hasMany(TemasForo::class, 'usuario_creador_id');
    }
}