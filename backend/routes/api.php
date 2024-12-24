<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('user.register');
    Route::post('/login', [AuthController::class, 'login'])->name('user.login');
});

Route::prefix('auth')->middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me'])->name('user.me');
    Route::put('/user/profile', [UserController::class, 'update'])->name('user.update');
    Route::put('/user/preferences', [UserController::class, 'updatePreferences'])->name('user.preferences.update');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/articles', ArticleController::class)->only(['index', 'show']);
});
