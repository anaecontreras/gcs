<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['nombre_rol' => 'Visitante', 'created_at' => now(), 'updated_at' => now()],
            ['nombre_rol' => 'Operador', 'created_at' => now(), 'updated_at' => now()],
            ['nombre_rol' => 'Supervisor', 'created_at' => now(), 'updated_at' => now()],
            ['nombre_rol' => 'Administrador', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}