<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\LogActivityController;
use App\Http\Controllers\ForumPostController;
use App\Http\Controllers\ComentariosForoController;
// ✅ AGREGAR ESTAS DOS LÍNEAS:
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\CategoriadocController;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// 🔓 FORO PÚBLICO
Route::get('/forum/posts', [ForumPostController::class, 'index']);
Route::get('/forum/posts/{id}', [ForumPostController::class, 'show']);
Route::get('/forum/categorias', [ForumPostController::class, 'categorias']);

// 🔐 RUTAS PROTEGIDAS (requieren login)
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Logs
    Route::get('/logs/mis-logs', [LogController::class, 'misLogs']);
    Route::get('/logs/todos', [LogController::class, 'todos']);
    Route::post('/logs/filtrar', [LogController::class, 'filtrar']);

    // Logs de actividad
    Route::get('/logs-activity/mis-actividades', [LogActivityController::class, 'misActividades']);
    Route::get('/logs-activity/todas', [LogActivityController::class, 'todas']);
    Route::post('/logs-activity/filtrar', [LogActivityController::class, 'filtrar']);

    // Comentarios (requiere login)
    Route::post('/forum/posts/{id}/comentarios', [ComentariosForoController::class, 'store']);

    // HU-16: Documentos (Repositorio)
    Route::get('/documentos/filtrar', [DocumentoController::class, 'filtrar']);
    Route::get('/documentos', [DocumentoController::class, 'index']);
    Route::post('/documentos', [DocumentoController::class, 'store']);
    Route::put('/documentos/{id}', [DocumentoController::class, 'edit']);
    Route::delete('/documentos/{id}', [DocumentoController::class, 'destroy']);
    Route::get('/documentos/{id}/descargar', [DocumentoController::class, 'download']);

    // Categorías de documentos (para filtros)
    Route::get('/categoriasdocs', [CategoriadocController::class, 'index']);
});