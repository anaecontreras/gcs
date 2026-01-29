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
        Schema::create('logs_activity', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id')->nullable();
            $table->string('tipo_operacion', 50);           // CREATE, READ, UPDATE, DELETE
            $table->string('modulo', 100);                   // usuarios, documentos, etc
            $table->unsignedBigInteger('id_registro_afectado')->nullable();
            $table->timestampTz('timestamp')->useCurrent();
            $table->timestamps();

            // Relación con tabla users
            $table->foreign('usuario_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs_activity');
    }
};