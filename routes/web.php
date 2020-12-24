<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');

Route::middleware(['auth'])->group(function () {
		Route::view('/usuario','usuario')->name('usuario');
		Route::get('/usuario/list','UserController@list');
		Route::get('/usuario/list-producto','UserController@listProducto');
		Route::post('/usuario/create','UserController@store');
		Route::post('/usuario/update','UserController@update');
		Route::post('/usuario/delete','UserController@destroy');

		Route::view('/producto','producto')->name('producto');
		Route::get('/producto/list','ProductController@list');
		Route::post('/producto/create','ProductController@store');
		Route::post('/producto/update','ProductController@update');
		Route::post('/producto/delete','ProductController@destroy');
});