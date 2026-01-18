<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoriadoc extends Model
{
    protected $table = 'categoriadocs';

    protected $fillable = [
        'nombre_categoria'
    ];
}
