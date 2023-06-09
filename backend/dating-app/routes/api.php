<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersActionsController;
use App\Http\Controllers\MessagesController;


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
    Route::get('/filter_age/{year}', [UsersActionsController::class, "filterByAge"]);
    Route::get('/get_name/{id}', [UsersActionsController::class, "getName"]);
    Route::get('/search_name/{name}', [UsersActionsController::class, "searchByName"]);
    Route::get('/upload_picture/{id}', [UsersActionsController::class, "uploadPicture"]);
    Route::get('/block_user/{id}', [UsersActionsController::class, "blockUser"]);
    Route::get('/favorite_user/{id}', [UsersActionsController::class, "favoriteUser"]);
    Route::get('/who_blocked/{id}', [UsersActionsController::class, "getWhoBlocked"]);
    Route::get('/who_favorite/{id}', [UsersActionsController::class, "getWhoFavorite"]);
    Route::get('/my_blocked/{id}', [UsersActionsController::class, "myBlocked"]);
    Route::get('/my_favorites/{id}', [UsersActionsController::class, "myFavorites"]);
    
});
Route::group(["prefix" => "messages"],function () {
    Route::get('/send_message/{id}', [MessagesController::class, "sendMessage"]);
    Route::get('/show_messages/{id}', [MessagesController::class, "showMessages"]);
    

});


});