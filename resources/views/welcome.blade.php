@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-sm-12 col-md-2 p-3" >
        	<div class="interior" style="background-color:#FFD900;border-radius:20px">
	        	<a href="{{ route('usuario') }}" class="d-block mx-auto w-50 text-center py-3" style="text-decoration: none;" >
							<img src="{{ asset('svg/police-van.svg') }}" class="img-fluid icon-menu" alt="">
	        		<h3 style="color:#080808">Usuarios</h3>
	        	</a>
	        </div>
				</div>
        <div class="col-sm-12 col-md-2 p-3" >
        	<div class="interior" style="background-color:#FFD900;border-radius:20px">
	        	<a href="{{ route('producto') }}" class="d-block mx-auto w-50 text-center py-3" style="text-decoration: none;" >
							<img src="{{ asset('svg/police-van.svg') }}" class="img-fluid icon-menu" alt="">
	        		<h3 style="color:#080808">PRODUCTO</h3>
	        	</a>
	        </div>
				</div>
    </div>
</div>
@endsection
