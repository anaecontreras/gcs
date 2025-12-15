<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\LogActivityController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/logs/mis-logs', [LogController::class, 'misLogs']);
    Route::get('/logs/todos', [LogController::class, 'todos']);
    Route::post('/logs/filtrar', [LogController::class, 'filtrar']);
    
    // Logs de Actividad (HU-04)
    Route::get('/logs-activity/mis-actividades', [LogActivityController::class, 'misActividades']);
    Route::get('/logs-activity/todas', [LogActivityController::class, 'todas']);
    Route::post('/logs-activity/filtrar', [LogActivityController::class, 'filtrar']);
});