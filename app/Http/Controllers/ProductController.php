<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Product;
class ProductController extends Controller
{
    public function list()
    {
        $product = Product::orderBy('id','desc')->paginate(10);
        return $product;
    }

    public function store(Request $request)
    {
        if(!$request->ajax()) {return view('home');}

        $product = new Product;
        $product->nombre = $request->nombre;
        $product->versionJuego = $request->versionJuego;
        $product->simulador = $request->simulador;
        $product->url = $request->url;
        if($request->hasFile('imagen')) {
            $nameImage = Storage::disk('public')->put('productos',$request->imagen);
            $product->imagen = $nameImage;
        }else{
             $product->imagen = "productos/defaul-1x1.png";
        }
        $product->save();

        return $product;
    }
    
    public function update(Request $request)
    {
        if(!$request->ajax()) {return view('home');}

        $product = Product::findOrFail($request->id);
        $product->nombre = $request->nombre;
        $product->versionJuego = $request->versionJuego;
        $product->simulador = $request->simulador;
        $product->url = $request->url;
        if($request->hasFile('imagen')) {
            $nameImage = Storage::disk('public')->put('productos',$request->imagen);
            $product->imagen = $nameImage;
        }
        $product->save();

        return $product;
    }

    public function destroy(Request $request)
    {
        Product::whereId($request->id)->delete();
    }
}
