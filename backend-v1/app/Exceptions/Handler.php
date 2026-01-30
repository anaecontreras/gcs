<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        // Captura error de ruta no definida (como login)
        $this->renderable(function (RouteNotFoundException $e, $request) {
            if (
                str_contains($e->getMessage(), 'Route [login] not defined') &&
                $request->is('api/*')
            ) {
                return response()->json([
                    'message' => 'Acceso no autorizado. Token de autenticación requerido.',
                ], 401);
            }
        });
    }

    // Captura error de autenticación general
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        return redirect()->guest(route('login'));
    }
}