<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\ChoiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("auth/register", [ApiController::class, "register"]);
Route::post("auth/login", [ApiController::class, "login"]);

Route::group([
    "middleware" => ["auth:api"]
], function(){

    Route::get("profile", [ApiController::class, "profile"]);
    Route::get("refresh", [ApiController::class, "refreshToken"]);
    Route::get("logout", [ApiController::class, "logout"]);
});


//Polls Table Cihuy

Route::get("/polls", [PollController::class, "index"]);
Route::get("/polls/create", [PollController::class, "create"]);
Route::post("/polls", [PollController::class, "store"]);
Route::get("/polls/{poll}", [PollController::class, "show"]);
Route::get("/polls/{poll}/edit", [PollController::class, "edit"]);
Route::put("/polls/{poll}", [PollController::class, "update"]);
Route::delete("/polls/{poll}", [PollController::class, "destroy"]);

// Division Table Cihuy

Route::get("/divisions", [DivisionController::class, "index"]);
