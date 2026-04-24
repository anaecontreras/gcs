<?php

namespace App\Http\Controllers;

use App\Models\Comentariosforo;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComentariosforoController extends Controller
{
    /**
     * Listado de comentarios del foro.
     * Traemos usuario y tema con campos mínimos para que el frontend arme la vista sin consultas extra.
     */
    public function index()
    {
        // Orden descendente: lo más reciente primero, que es lo que espera el usuario al entrar al foro
        $comentarios = Comentariosforo::with(['usuario:id,name', 'tema:id,titulo'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['comentarios' => $comentarios], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Publica un nuevo comentario en un tema del foro.
     * El autor se toma de la sesión para evitar que se suplante identidad desde el cliente.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Validamos que el tema exista y que el cuerpo no exceda el límite acordado con UX
        $validator = Validator::make($request->all(), [
            'tema_id' => 'required|exists:temasforos,id',
            'cuerpo'  => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Creamos el comentario vinculando autor y tema: el cliente no puede inyectar otros IDs
        $comentario = Comentariosforo::create([
            'tema_id'            => $request->tema_id,
            'usuario_creador_id' => $user->id,
            'cuerpo'             => $request->cuerpo,
        ]);

        // Auditoría: quién comentó en qué tema, útil para moderación o análisis de actividad
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de Comentario en Tema ID: {$request->tema_id}",
            'entidad_afectada' => 'comentariosforos',
            'entidad_id'       => $comentario->id,
        ]);

        return response()->json(['message' => 'Comentario creado', 'comentario' => $comentario], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Edita el contenido de un comentario existente.
     * Solo permite modificar el cuerpo; el tema y autor permanecen inmutables por diseño.
     */
    public function edit(Request $request)
    {
        // Validamos que el comentario exista y que el nuevo cuerpo cumpla las mismas reglas que al crearlo
        $validator = Validator::make($request->all(), [
            'id'     => 'required|exists:comentariosforos,id',
            'cuerpo' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $comentario = Comentariosforo::find($request->id);
        
        // Actualización focalizada: solo el campo 'cuerpo' pasa del request al modelo, nada más
        $comentario->update($request->only(['cuerpo']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de Comentario ID: {$comentario->id}",
            'entidad_afectada' => 'comentariosforos',
            'entidad_id'       => $comentario->id,
        ]);

        return response()->json(['message' => 'Comentario actualizado', 'comentario' => $comentario], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Elimina un comentario del foro.
     * Validamos existencia antes de operar y registramos la acción para trazabilidad.
     */
    public function destroy(Request $request, $id)
    {
        // Verificamos que el ID corresponda a un comentario real antes de intentar cualquier cosa
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:comentariosforos,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Comentario no encontrado'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $comentario = Comentariosforo::findOrFail($id);

        // Log antes del borrado: así conservamos el ID y contexto aunque el registro ya no exista
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de Comentario ID: {$id}",
            'entidad_afectada' => 'comentariosforos',
            'entidad_id'       => $id,
        ]);

        $comentario->delete();

        return response()->json(['message' => 'Comentario eliminado'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}