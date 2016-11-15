<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['uses' => 'OrderController@create']);

Route::post('/store', ['uses' => 'OrderController@store']);

Route::get('/map', ['uses' => 'MapController@create']);

Route::get('/exercise', function() {
    return view('exercise');
});

Route::get('/directions', function() {
    return view('directions');
});

Route::get('/establishments', function() {
    return view('establishments');
});

Route::get('/tuts-exercise', function() {
	return view ('tuts-exercise');
});

Route::get('/quickstart', function() {
	return ('quickstart');
});