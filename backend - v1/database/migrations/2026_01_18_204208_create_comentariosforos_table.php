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
        Schema::create('comentariosforos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tema_id')->constrained('temasforos')->onDelete('cascade');
            $table->foreignId('usuario_creador_id')->constrained('users')->onDelete('cascade');
            $table->text('cuerpo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentariosforos');
    }
};
