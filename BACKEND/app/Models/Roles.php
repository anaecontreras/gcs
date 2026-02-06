<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $table = 'rol';

    protected $fillable = [
        'rol'
    ];

    public function usuarios()
    {
        return $this->hasMany(User::class, 'rol_id');
    }
}
