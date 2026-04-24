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
        Schema::create('temasforos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_creador_id');
            $table->string('titulo', 255);
            $table->string('estado', 10); // 'Abierto', 'Cerrado'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temasforos');
    }
};
