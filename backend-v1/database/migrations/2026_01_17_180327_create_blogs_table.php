<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_reporte_id'); // FK
            $table->string('titulo', 200);
            $table->string('prioridad', 20); // 'Alta', 'Media', 'Baja'
            $table->string('estado', 20);    // 'En Progreso', 'Cerrado'
            $table->timestamps();

            $table->foreign('usuario_reporte_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
