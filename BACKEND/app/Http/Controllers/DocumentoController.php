<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DocumentoController extends Controller
{
    // app/Http/Controllers/DocumentoController.php

    public function index()
    {
        // Cargamos las relaciones 'categoria' y 'usuario' (solo campos necesarios)
        $documentos = Documento::with([
            'categoria:id,nombre_categoria',
            'usuario:id,name,email'
        ])
            ->orderBy('fecha_publicacion', 'desc')
            ->get()
            ->map(function ($doc) {
                // Agregamos la URL completa para el frontend
                $doc->url_archivo = asset('storage/' . $doc->ruta_archivo);
                return $doc;
            });

        return response()->json($documentos, 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoria_id'       => 'required|exists:categoriadocs,id',
            'titulo'             => 'required|string|max:255',
            'archivo'       => 'required|file|mimes:pdf|max:3072', // Máx 3MB
            'version'            => 'required|string|max:10',
            'fecha_publicacion'  => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $rutaCarga = $request->file('archivo')->store('documentos', 'public');

        $documento = DB::transaction(function () use ($request, $rutaCarga) {
            $doc = Documento::create([
                'categoria_id'       => $request->categoria_id,
                'usuario_creador_id' => $request->user()->id,
                'titulo'             => $request->titulo,
                'ruta_archivo'       => $rutaCarga,
                'version'            => $request->version,
                'fecha_publicacion'  => $request->fecha_publicacion,
            ]);

            Log::create([
                'usuario_correo'   => $request->user()->email,
                'accion'           => "Creado documento: {$doc->titulo}",
                'entidad_afectada' => 'documento',
                'entidad_id'       => $doc->id,
            ]);

            return $doc;
        });

        return response()->json($documento, 201);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'                => 'required|exists:documentos,id', // Verifica si tu tabla es 'documentos'
            'categoria_id'      => 'required|exists:categoriadocs,id',
            'titulo'            => 'required|string|max:255',
            'version'           => 'required|string|max:10',
            'fecha_publicacion' => 'sometimes|required|date',
            'archivo'           => 'nullable|file|mimes:pdf|max:3072', // nullable: opcional
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $doc = Documento::find($request->id);

        // Datos básicos a actualizar
        $data = $request->only(['categoria_id', 'titulo', 'version']);

        // Si viene la fecha, la formateamos antes de guardar
        if ($request->has('fecha_publicacion')) {
            $data['fecha_publicacion'] = Carbon::parse($request->fecha_publicacion)->format('Y-m-d');
        }

        // Lógica de archivo nuevo
        if ($request->hasFile('archivo')) {
            // 1. Borrar el archivo físico anterior del disco
            if ($doc->ruta_archivo) {
                // Construye la ruta física absoluta: D:\...\storage\app\public\documentos\archivo.pdf
                $file_path = storage_path('app/public/' . $doc->ruta_archivo);

                if (file_exists($file_path)) {
                    unlink($file_path); // Fuerza el borrado físico en el sistema de archivos
                }
            }

            // 2. Subir el nuevo archivo
            $data['ruta_archivo'] = $request->file('archivo')->store('documentos', 'public');
        }

        $doc->update($data);

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Editado documento ID: {$doc->id}. Se cambió archivo: " . ($request->hasFile('archivo') ? 'SI' : 'NO'),
            'entidad_afectada' => 'documento',
            'entidad_id'       => $doc->id,
        ]);

        return response()->json(['message' => 'Documento actualizado con éxito', 'documento' => $doc], 200);
    }

    public function destroy(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], ['id' => 'required|integer|exists:documentos,id']);
        if ($validator->fails()) {
            return response()->json(['message' => 'No encontrado'], 404);
        }

        $doc = Documento::findOrFail($id);

        // 1. Borrar el archivo físico del disco antes de eliminar el registro
        if ($doc->ruta_archivo) {
            // Construye la ruta física absoluta: D:\...\storage\app\public\documentos\archivo.pdf
            $file_path = storage_path('app/public/' . $doc->ruta_archivo);

            if (file_exists($file_path)) {
                unlink($file_path); // Fuerza el borrado físico en el sistema de archivos
            }
        }

        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminado documento y archivo físico: {$doc->titulo}",
            'entidad_afectada' => 'documento',
            'entidad_id'       => $doc->id,
        ]);

        // 2. Eliminar de la base de datos
        $doc->delete();

        return response()->json(['message' => 'Documento y archivo eliminados correctamente'], 200);
    }

    public function download($id)
    {
        $validator = Validator::make(['id' => $id], ['id' => 'required|integer|exists:documentos,id']);
        if ($validator->fails()) {
            return response()->json(['message' => 'Documento no encontrado en BD'], 404);
        }

        $doc = Documento::findOrFail($id);

        // Construimos la ruta absoluta al archivo
        // Esto genera algo como: D:\proyectos\storage\app\public\documentos\archivo.pdf
        $fullPath = storage_path('app/public/' . $doc->ruta_archivo);

        if (!file_exists($fullPath)) {
            return response()->json(['message' => 'Archivo físico no encontrado'], 404);
        }

        // Usamos response()->download() que es más directo para archivos locales
        $nombreDescarga = str_replace(' ', '_', $doc->titulo) . '.pdf';

        return response()->download($fullPath, $nombreDescarga);
    }
}
