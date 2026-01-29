<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();

            // Usuario que ejecuta la acción (puede ser null en errores como LOGIN_FALLIDO)
            $table->unsignedBigInteger('usuario_id')->nullable();

            // Acción ejecutada (LOGIN, LOGOUT, REGISTRO, etc.)
            $table->string('accion');

            // Módulo afectado (usuarios, foro, reportes, etc.)
            $table->string('modulo');

            // Fecha y hora de la acción
            $table->timestamp('fecha_hora')->useCurrent();

            $table->timestamps();

            // Relación con tabla users
            $table->foreign('usuario_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null'); // Evita errores si el usuario no existe
        });
    }

    public function down()
    {
        Schema::dropIfExists('logs');
    }
}