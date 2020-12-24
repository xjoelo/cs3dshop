@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <h1 class="text-white">UD Junin</h1>
            <h4 class="text-white">Bienvenido {{ Auth::user()->Nickname }} </h4>
        </div>
    </div>
</div>
@endsection
