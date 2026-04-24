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
    /**
     * Listado de documentos con datos listos para el frontend.
     * Incluimos categoría y autor con campos mínimos, y generamos la URL pública del archivo.
     */
    public function index()
    {
        // Relaciones ligeras: solo lo que necesita la vista, sin cargar datos sensibles del usuario
        $documentos = Documento::with([
            'categoria:id,nombre_categoria',
            'usuario:id,name,email'
        ])
            ->orderBy('fecha_publicacion', 'desc')
            ->get()
            ->map(function ($doc) {
                // Armamos la URL accesible desde el navegador: el frontend no debe construir rutas manualmente
                $doc->url_archivo = asset('storage/' . $doc->ruta_archivo);
                return $doc;
            });

        return response()->json($documentos, 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Subida y registro de nuevo documento.
     * Todo dentro de una transacción: si falla el log, no se guarda el documento (consistencia ante todo).
     */
    public function store(Request $request)
    {
        // Validación estricta: solo PDFs, tamaño controlado y campos obligatorios para evitar datos incompletos
        $validator = Validator::make($request->all(), [
            'categoria_id'       => 'required|exists:categoriadocs,id',
            'titulo'             => 'required|string|max:255',
            'archivo'       => 'required|file|mimes:pdf|max:10240', // Máx 3MB
            'version'            => 'required|string|max:10',
            'fecha_publicacion'  => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Subida inicial del archivo: si algo falla después, el archivo queda huérfano (se podría mejorar con limpieza en rollback)
        $rutaCarga = $request->file('archivo')->store('documentos', 'public');

        // Transacción: garantizamos que documento y log se guarden juntos o no se guarde ninguno
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

        return response()->json($documento, 201, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Actualización de documento existente.
     * Maneja archivo opcional: si se envía uno nuevo, reemplaza el anterior tanto en BD como en disco.
     */
    public function edit(Request $request)
    {
        // Validación flexible: el archivo es opcional porque a veces solo se corrigen metadatos
        $validator = Validator::make($request->all(), [
            'id'                => 'required|exists:documentos,id',
            'categoria_id'      => 'required|exists:categoriadocs,id',
            'titulo'            => 'required|string|max:255',
            'version'           => 'required|string|max:10',
            'fecha_publicacion' => 'sometimes|required|date',
            'archivo'           => 'nullable|file|mimes:pdf|max:3072',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $doc = Documento::find($request->id);

        // Campos base que siempre pueden actualizarse
        $data = $request->only(['categoria_id', 'titulo', 'version']);

        // Normalizamos la fecha si viene: mejor prevenir formatos inconsistentes desde el cliente
        if ($request->has('fecha_publicacion')) {
            $data['fecha_publicacion'] = Carbon::parse($request->fecha_publicacion)->format('Y-m-d');
        }

        // Si hay nuevo archivo, limpiamos el anterior para no acumular basura en el servidor
        if ($request->hasFile('archivo')) {
            // Borrado físico del archivo anterior: verificamos existencia para evitar warnings innecesarios
            if ($doc->ruta_archivo) {
                $file_path = storage_path('app/public/' . $doc->ruta_archivo);

                if (file_exists($file_path)) {
                    unlink($file_path);
                }
            }

            // Subida del reemplazo y actualización de la ruta en los datos a persistir
            $data['ruta_archivo'] = $request->file('archivo')->store('documentos', 'public');
        }

        $doc->update($data);

        // Log con contexto útil: saber si cambió el archivo ayuda a auditar modificaciones relevantes
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Editado documento ID: {$doc->id}. Se cambió archivo: " . ($request->hasFile('archivo') ? 'SI' : 'NO'),
            'entidad_afectada' => 'documento',
            'entidad_id'       => $doc->id,
        ]);

        return response()->json(['message' => 'Documento actualizado con éxito', 'documento' => $doc], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Eliminación segura de documento y su archivo físico.
     * Primero borramos el archivo del disco, luego el registro: así evitamos referencias rotas en BD.
     */
    public function destroy(Request $request, $id)
    {
        $validator = Validator::make(['id' => $id], ['id' => 'required|integer|exists:documentos,id']);
        if ($validator->fails()) {
            return response()->json(['message' => 'No encontrado'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $doc = Documento::findOrFail($id);

        // Limpieza del archivo físico: si falla el unlink, al menos el log nos avisa para revisión manual
        if ($doc->ruta_archivo) {
            $file_path = storage_path('app/public/' . $doc->ruta_archivo);

            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }

        // Auditoría antes de borrar el registro: capturamos el título mientras aún existe en BD
        Log::create([
            'usuario_correo'   => $request->user()->email,
            'accion'           => "Eliminado documento y archivo físico: {$doc->titulo}",
            'entidad_afectada' => 'documento',
            'entidad_id'       => $doc->id,
        ]);

        $doc->delete();

        return response()->json(['message' => 'Documento y archivo eliminados correctamente'], 200, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Descarga directa de archivo.
     * Validamos doblemente: que el registro exista en BD y que el archivo físico esté en su lugar.
     */
    public function download($id)
    {
        $validator = Validator::make(['id' => $id], ['id' => 'required|integer|exists:documentos,id']);
        if ($validator->fails()) {
            return response()->json(['message' => 'Documento no encontrado en BD'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        $doc = Documento::findOrFail($id);

        // Ruta absoluta para acceso directo al sistema de archivos local
        $fullPath = storage_path('app/public/' . $doc->ruta_archivo);

        // Protección contra enlaces rotos: si el archivo se borró manualmente, devolvemos error claro
        if (!file_exists($fullPath)) {
            return response()->json(['message' => 'Archivo físico no encontrado'], 404, ['Content-Type' => 'application/json; charset=UTF-8'], JSON_UNESCAPED_UNICODE);
        }

        // Nombre amigable para la descarga: reemplazamos espacios para evitar problemas en algunos navegadores
        $nombreDescarga = str_replace(' ', '_', $doc->titulo) . '.pdf';

        return response()->download($fullPath, $nombreDescarga);
    }
}