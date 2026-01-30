<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comentarios_foros', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tema_id')->constrained('forum_posts')->onDelete('cascade');
            $table->foreignId('usuario_creador_id')->constrained('users')->onDelete('cascade');
            $table->text('cuerpo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comentarios_foros');
    }
};