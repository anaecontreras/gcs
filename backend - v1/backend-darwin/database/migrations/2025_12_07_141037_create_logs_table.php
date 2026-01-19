<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id')->nullable();
            $table->string('accion', 100);
            $table->string('entidad_afectada', 50);
            $table->unsignedBigInteger('entidad_id')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('resultado', 20);
            $table->timestampTz('fecha_hora')->useCurrent();
            $table->timestamps();

            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::dropIfExists('logs');
    }
};