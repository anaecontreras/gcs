<?php
// database/migrations/XXXX_XX_XX_create_logs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id(); // SERIAL / PK
            $table->string('usuario_correo', 100);
            $table->string('accion', 255);
            $table->string('entidad_afectada', 50)->nullable();
            $table->integer('entidad_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
