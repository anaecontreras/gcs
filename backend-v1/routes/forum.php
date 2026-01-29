<?php

use App\Http\Controllers\ForumPostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Obtener todos los posts del foro
    Route::get('/foro/posts', [ForumPostController::class, 'index']);

    // Obtener un post específico del foro
    Route::get('/foro/posts/{id}', [ForumPostController::class, 'show']);

    // Obtener posts por categoría
    Route::get('/foro/categoria/{categoria}', [ForumPostController::class, 'porCategoria']);

    // Obtener categorías disponibles
    Route::get('/foro/categorias', [ForumPostController::class, 'categorias']);
});