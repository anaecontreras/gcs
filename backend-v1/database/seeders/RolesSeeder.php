<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run()
    {
        DB::table('roles')->insert([
            [
                'id'          => 1,
                'nombre'      => 'Administrador',
                'descripcion' => 'Acceso total al sistema',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id'          => 2,
                'nombre'      => 'Supervisor',
                'descripcion' => 'Gestión parcial de módulos',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id'          => 3,
                'nombre'      => 'Operador',
                'descripcion' => 'Acceso limitado para tareas específicas',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}