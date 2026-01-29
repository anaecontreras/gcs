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
        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categoria_id')->constrained('categoriadocs'); // FK
            $table->foreignId('usuario_creador_id')->constrained('users'); // FK (ajustar si tu tabla es 'users')
            $table->string('titulo', 255);
            $table->string('ruta_archivo', 255);
            $table->string('version', 10);
            $table->date('fecha_publicacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documentos');
    }
};
