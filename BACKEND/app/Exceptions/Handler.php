<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        $this->renderable(function (RouteNotFoundException $e, $request) {
            // Si el error es "Route [login] not defined" y es una ruta de API
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
}
