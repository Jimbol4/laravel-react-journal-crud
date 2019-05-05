<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// We don't need create or edit forms since the React app will handle this
Route::middleware('auth:api')->group(function() {
    Route::resource('posts', 'PostController')->except([
        'create', 
        'edit',
    ]);
});