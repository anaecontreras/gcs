<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// use App\Http\Controllers\studentController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriadocController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\TemasforoController;
use App\Http\Controllers\ComentariosforoController;
use App\Http\Controllers\SummaryController;

// ─────────────────────────────────────────────────────────────
// RUTAS PÚBLICAS
// No requieren autenticación: login, registro inicial y recuperación de cuenta
// ─────────────────────────────────────────────────────────────

// Autenticación base: login y registro (este último restringido a admins por lógica interna)
Route::post('auth/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/auth/init-admin', [AuthController::class, 'createFirstAdmin']);
Route::post('auth/register', [App\Http\Controllers\AuthController::class, 'register']);

// Endpoint para logs externos: permite registrar intentos de login sin token (útil para auditoría temprana)
Route::post('/logs/intento-login', [LogController::class, 'intentoLogin']);

// Flujo de recuperación de contraseña: solicitar código y restablecer credenciales
Route::post('auth/send-recovery-code', [AuthController::class, 'sendRecoveryCode']);
Route::post('auth/reset-password', [AuthController::class, 'resetPassword']);

// ─────────────────────────────────────────────────────────────
// RUTAS PROTEGIDAS
// Todas requieren token válido vía Sanctum. Aquí va todo lo que hace el usuario autenticado.
// ─────────────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    
    // Gestión de sesión y perfil: logout, cambio de contraseña, actualización de datos y administración de usuarios
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('auth/change-password', [AuthController::class, 'changePasswordCurrent']);
    Route::post('auth/change-data-basic', [AuthController::class, 'changeDataBasic']);
    Route::post('auth/disable-user', [AuthController::class, 'disableUser']);
    Route::get('auth/showUsers', [AuthController::class, 'showUsers']);

    // CRUD de categorías documentales: solo admins pueden crear/editar, pero el listado es abierto para autenticados
    Route::get('categoriadoc/index', [CategoriadocController::class, 'index']);
    Route::post('categoriadoc/store', [CategoriadocController::class, 'store']);
    Route::post('categoriadoc/edit', [CategoriadocController::class, 'edit']);
    Route::delete('categoriadoc/delete/{id}', [CategoriadocController::class, 'destroy']);

    // Consulta de logs de auditoría: útil para monitoreo y trazabilidad de acciones críticas
    Route::get('logs/index', [LogController::class, 'index']);

    // Gestión de roles: crear, editar o eliminar tipos de usuario (solo admins)
    Route::get('roles/index', [RolController::class, 'index']);
    Route::post('roles/store', [RolController::class, 'store']);
    Route::post('roles/edit', [RolController::class, 'edit']);
    Route::delete('roles/delete/{id}', [RolController::class, 'destroy']);

    // Administración de documentos: listado, subida, edición, descarga y eliminación con manejo de archivos físicos
    Route::get('documentos', [DocumentoController::class, 'index']);
    Route::post('documentos/store', [DocumentoController::class, 'store']);
    Route::post('documentos/edit', [DocumentoController::class, 'edit']);
    Route::delete('documentos/{id}', [DocumentoController::class, 'destroy']);
    Route::get('documentos/download/{id}', [DocumentoController::class, 'download']);

    // Módulo de alertas/reportes (Blog): crear, editar o eliminar entradas con estado y prioridad
    Route::get('blog/index', [BlogController::class, 'index']);
    Route::post('blog/store', [BlogController::class, 'store']);
    Route::post('blog/edit', [BlogController::class, 'edit']);
    Route::delete('blog/delete/{id}', [BlogController::class, 'destroy']);

    // Calendario de eventos: agendar, modificar o cancelar fechas con validación de rangos temporales
    Route::get('calendario/index', [CalendarioController::class, 'index']);
    Route::post('calendario/store', [CalendarioController::class, 'store']);
    Route::post('calendario/edit', [CalendarioController::class, 'edit']);
    Route::delete('calendario/delete/{id}', [CalendarioController::class, 'destroy']);

    // Foro de discusión: temas principales con cascada manual de comentarios al eliminar
    Route::get('temas-foro', [TemasforoController::class, 'index']);
    Route::post('temas-foro/store', [TemasforoController::class, 'store']);
    Route::post('temas-foro/edit', [TemasforoController::class, 'edit']);
    Route::delete('temas-foro/delete/{id}', [TemasforoController::class, 'destroy']);

    // Comentarios del foro: respuestas anidadas a temas, con autoría y trazabilidad
    Route::get('/comentarios', [ComentariosforoController::class, 'index']);
    Route::post('/comentarios', [ComentariosforoController::class, 'store']);
    Route::put('/comentarios', [ComentariosforoController::class, 'edit']);
    Route::delete('/comentarios/{id}', [ComentariosforoController::class, 'destroy']);

    // Métricas consolidadas para el dashboard: conteos directos en BD para rendimiento
    Route::get('/dashboard/stats', [SummaryController::class, 'getDashboardStats']);
});