<?php

namespace App\Http\Middleware;
use Auth;

use Closure;

class role1
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        
        if (Auth::user()){
            $roles = explode(',',Auth::user()->role);
            if (in_array(1, $roles)) {
                return $next($request);
            }
        }
        return redirect('home');
    }
}
