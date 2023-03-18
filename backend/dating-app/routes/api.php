<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersActionsController;


Route::group(["prefix" => "v0.0.1"], function(){

Route::group(["prefix" => "authentication"],function () {
    Route::post('login', [AuthController::class, "login"]);
    Route::post('register', [AuthController::class, "register"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('refresh', [AuthController::class, "refresh"]);

});
Route::group(["prefix" => "users_actions"],function () {
    Route::get('/users_info/{id}', [UsersActionsController::class, "addOrUpdateUsersInfo"]);
    Route::get('/opposite_gender/{id}', [UsersActionsController::class, "getOppositeGender"]);
    Route::get('/filter_country/{country}', [UsersActionsController::class, "filterByCountry"]);
});
});