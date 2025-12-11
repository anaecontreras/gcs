<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// use App\Http\Controllers\studentController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\AuthController;

Route::post('auth/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('auth/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/logs/intento-login', [LogController::class, 'intentoLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('auth/change-password', [AuthController::class, 'changePasswordCurrent']);
    Route::post('auth/change-data-basic', [AuthController::class, 'changeDataBasic']);
    Route::post('auth/disable-user', [AuthController::class, 'disableUser']);
    Route::get('auth/showUsers', [AuthController::class, 'showUsers']);
});
