<?php

namespace App\Http\Controllers;

use App\Models\ComentarioForo;
use App\Services\LogActivityService;
use Illuminate\Http\Request;

class ComentariosForoController extends Controller
{
    /**
     * CREAR COMENTARIO EN UN POST
     */
    public function store(Request $request, $postId)
    {
        $validated = $request->validate([
            'cuerpo' => 'required|string|max:2000',
        ]);

        $comentario = ComentarioForo::create([
            'tema_id' => $postId,
            'usuario_creador_id' => $request->user()->id,
            'cuerpo' => $validated['cuerpo'],
        ]);

        // Cargar la relación del usuario
        $comentario->load('usuario:id,nombre_completo,email');

        LogActivityService::registrar(
            usuario_id: $request->user()->id,
            tipo_operacion: 'CREATE',
            modulo: 'foro',
            id_registro_afectado: $comentario->id
        );

        return response()->json([
            'id' => $comentario->id,
            'cuerpo' => $comentario->cuerpo,
            'created_at' => $comentario->created_at,
            'usuario' => $comentario->usuario
        ], 201);
    }
}