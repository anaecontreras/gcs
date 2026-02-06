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

Route::post('auth/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('auth/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/logs/intento-login', [LogController::class, 'intentoLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('auth/change-password', [AuthController::class, 'changePasswordCurrent']);
    Route::post('auth/change-data-basic', [AuthController::class, 'changeDataBasic']);
    Route::post('auth/disable-user', [AuthController::class, 'disableUser']);
    Route::get('auth/showUsers', [AuthController::class, 'showUsers']);

    Route::get('categoriadoc/index', [CategoriadocController::class, 'index']);
    Route::post('categoriadoc/store', [CategoriadocController::class, 'store']);
    Route::post('categoriadoc/edit', [CategoriadocController::class, 'edit']);
    Route::delete('categoriadoc/delete/{id}', [CategoriadocController::class, 'destroy']);

    Route::get('logs/index', [LogController::class, 'index']);

    Route::get('roles/index', [RolController::class, 'index']);
    Route::post('roles/store', [RolController::class, 'store']);
    Route::post('roles/edit', [RolController::class, 'edit']);
    Route::delete('roles/delete/{id}', [RolController::class, 'destroy']);

    Route::get('documentos', [DocumentoController::class, 'index']);
    Route::post('documentos/store', [DocumentoController::class, 'store']);
    Route::post('documentos/edit', [DocumentoController::class, 'edit']);
    Route::delete('documentos/{id}', [DocumentoController::class, 'destroy']);
    Route::get('documentos/download/{id}', [DocumentoController::class, 'download']);

    Route::get('blog/index', [BlogController::class, 'index']);
    Route::post('blog/store', [BlogController::class, 'store']);
    Route::post('blog/edit', [BlogController::class, 'edit']);
    Route::delete('blog/delete/{id}', [BlogController::class, 'destroy']);

    Route::get('calendario/index', [CalendarioController::class, 'index']);
    Route::post('calendario/store', [CalendarioController::class, 'store']);
    Route::post('calendario/edit', [CalendarioController::class, 'edit']);
    Route::delete('calendario/delete/{id}', [CalendarioController::class, 'destroy']);

    Route::get('temas-foro', [TemasforoController::class, 'index']);
    Route::post('temas-foro/store', [TemasforoController::class, 'store']);
    Route::post('temas-foro/edit', [TemasforoController::class, 'edit']);
    Route::delete('temas-foro/delete/{id}', [TemasforoController::class, 'destroy']);

    Route::get('/comentarios', [ComentariosforoController::class, 'index']);
    Route::post('/comentarios', [ComentariosforoController::class, 'store']);
    Route::put('/comentarios', [ComentariosforoController::class, 'edit']);
    Route::delete('/comentarios/{id}', [ComentariosforoController::class, 'destroy']);
});
