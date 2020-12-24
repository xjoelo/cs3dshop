<?php

namespace App\Http\Controllers;

use App\Product;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function list()
    {
        $user = User::orderBy('id','desc')->where('id','>',1)->paginate(15);
        return $user;
    }

    public function listProducto()
    {
        $product = Product::orderBy('id','desc')->get();
        return $product;
    }

    public function store(Request $request)
    {
        if(!$request->ajax()) {return view('home');}

        $user = new User;
        $user->nroDocumento = $request->nroDocumento ? $request->nroDocumento : null;
        $user->fullName = $request->fullName;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->idRol = $request->idRol;
        $user->save();

        return $user;
    }
    
    public function update(Request $request)
    {
        if(!$request->ajax()) {return view('home');}

        $user = User::findOrFail($request->id);
        $user->nroDocumento = $request->nroDocumento ? $request->nroDocumento : null;
        $user->fullName = $request->fullName;
        $user->email = $request->email;
        if($request->password){
            $user->password = Hash::make($request->password);
        }
        $user->idRol = $request->idRol;
        $user->save();
        return $user;
    }

    public function destroy(Request $request)
    {
        User::whereId($request->id)->delete();
    }
}
