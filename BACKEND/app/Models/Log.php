<?php
// app/Models/Log.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'usuario_correo',
        'accion',
        'entidad_afectada',
        'entidad_id',
    ];
}
