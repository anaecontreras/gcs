<?php

namespace App\Http\Controllers;

use App\Models\Temasforo;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TemasforoController extends Controller
{
    /**
     * Listado de temas del foro con contexto completo.
     * Cargamos autor y comentarios anidados para que el frontend arme la vista sin consultas adicionales.
     */
    public function index()
    {
        // Relaciones anidadas: tema -> comentarios -> autor de cada comentario, todo en una sola query optimizada
        $temas = Temasforo::with([
            'usuario:id,name',
            'comentarios.usuario:id,name'
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['temas' => $temas], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Crea un nuevo tema de discusión.
     * El autor se asigna desde la sesión para evitar suplantación y validar permisos implícitamente.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Validamos que el estado sea uno de los valores permitidos: evita inconsistencias en el flujo del foro
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'estado' => 'required|in:Abierto,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $tema = Temasforo::create([
            'usuario_creador_id' => $user->id,
            'titulo'             => $request->titulo,
            'estado'             => $request->estado,
        ]);

        // Auditoría: quién abrió qué tema, útil para moderación o análisis de actividad en el foro
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de Tema de Foro: {$tema->titulo}",
            'entidad_afectada' => 'temasforos',
            'entidad_id'       => $tema->id,
        ]);

        return response()->json(['message' => 'Tema creado exitosamente', 'tema' => $tema], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Actualiza un tema existente.
     * Permite enviar solo los campos que cambian, sin obligar a reenviar el payload completo.
     */
    public function edit(Request $request)
    {
        // Validación flexible: el ID es obligatorio, pero titulo/estado solo se validan si vienen en la petición
        $validator = Validator::make($request->all(), [
            'id'     => 'required|exists:temasforos,id',
            'titulo' => 'sometimes|required|string|max:255',
            'estado' => 'sometimes|required|in:Abierto,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $tema = Temasforo::find($request->id);
        
        // Actualización selectiva: solo los campos autorizados pasan del request al modelo, nada más
        $tema->update($request->only(['titulo', 'estado']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de Tema de Foro: ID {$tema->id}",
            'entidad_afectada' => 'temasforos',
            'entidad_id'       => $tema->id,
        ]);

        return response()->json(['message' => 'Tema actualizado exitosamente', 'tema' => $tema], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Elimina un tema y sus comentarios asociados.
     * Hacemos la cascada manual porque no todos los entornos tienen foreign keys con ON DELETE CASCADE activado.
     */
    public function destroy(Request $request, $id)
    {
        // Validamos que el ID corresponda a un tema real antes de intentar cualquier operación
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:temasforos,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'El tema no existe'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $tema = Temasforo::find($id);

        // Limpieza manual de comentarios: si la BD no tiene cascada configurada, esto evita huérfanos en la tabla de comentarios
        $tema->comentarios()->delete();

        // Log antes del borrado final: capturamos el título mientras aún existe en BD para el historial de auditoría
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de Tema de Foro y sus comentarios: {$tema->titulo}",
            'entidad_afectada' => 'temasforos',
            'entidad_id'       => $tema->id,
        ]);

        $tema->delete();

        return response()->json(['message' => 'Tema y sus comentarios eliminados correctamente'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}