<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    /**
     * Listado principal de reportes de contingencia.
     * Optimizado para cargar solo los datos del autor que realmente necesitamos en el frontend.
     */
    public function index()
    {
        // Relación con el usuario: traemos solo campos esenciales para no sobrecargar la respuesta
        $blogs = Blog::with('usuario:id,name,email,unidad_operativa')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'blogs' => $blogs,
        ], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Registro de nuevos reportes de contingencia.
     * Asigna automáticamente el autor desde la sesión y valida contra catálogos cerrados.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Validación estricta: prioridad y estado deben coincidir con los valores permitidos en negocio
        $validator = Validator::make($request->all(), [
            'titulo'    => 'required|string|max:200',
            'prioridad' => 'required|in:Alta,Media,Baja',
            'estado'    => 'required|in:En Progreso,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Creación con autoría implícita: evitamos que el cliente envíe el ID del usuario por seguridad
        $blog = Blog::create([
            'usuario_reporte_id' => $user->id,
            'titulo'             => $request->titulo,
            'prioridad'          => $request->prioridad,
            'estado'             => $request->estado,
        ]);

        // Auditoría: qué se creó, quién lo hizo y bajo qué contexto
        Log::create([
            'usuario_correo'   => $user->email,
            'accion'           => "Registro de Blog: {$blog->titulo}",
            'entidad_afectada' => 'blogs',
            'entidad_id'       => $blog->id,
        ]);

        return response()->json(['message' => 'Evento creado exitosamente', 'blog' => $blog], 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Actualización parcial o total de un reporte de contingencia existente.
     * Usa 'sometimes' para permitir que solo se envíen los campos que realmente cambian.
     */
    public function edit(Request $request)
    {
        // Validación flexible: el ID es obligatorio, pero el resto solo se valida si está presente en la petición
        $validator = Validator::make($request->all(), [
            'id'        => 'required|exists:blogs,id',
            'titulo'    => 'sometimes|required|string|max:200',
            'prioridad' => 'sometimes|required|in:Alta,Media,Baja',
            'estado'    => 'sometimes|required|in:En Progreso,Cerrado',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $blog = Blog::find($request->id);
        
        // Actualización selectiva: solo los campos autorizados pasan del request al modelo
        $blog->update($request->only(['titulo', 'prioridad', 'estado']));

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Edición de Blog: ID {$blog->id} - {$blog->titulo}",
            'entidad_afectada' => 'blogs',
            'entidad_id'       => $blog->id,
        ]);

        return response()->json(['message' => 'Evento actualizado exitosamente', 'blog' => $blog], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Eliminación lógica de un reporte de contingencia.
     * Valida existencia antes de operar y registra la acción para trazabilidad forense.
     */
    public function destroy(Request $request, $id)
    {
        // Validamos que el ID recibido en la URL corresponda a un registro real antes de cualquier operación
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:blogs,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'El evento no existe'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $blog = Blog::find($id);

        // Log de auditoría antes de borrar: necesitamos el título para el registro, así que lo capturamos primero
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminación de Blog: {$blog->titulo}",
            'entidad_afectada' => 'blogs',
            'entidad_id'       => $blog->id,
        ]);

        $blog->delete();

        return response()->json(['message' => 'Evento eliminado correctamente'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }
}