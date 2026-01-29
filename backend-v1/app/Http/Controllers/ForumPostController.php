<?php
namespace App\Http\Controllers;
use App\Models\ForumPost;
use App\Services\LogActivityService;
use Illuminate\Http\Request;

class ForumPostController extends Controller
{
    /**
     * LISTAR POSTS
     */
    public function index(Request $request)
    {
        $query = ForumPost::with('usuario:id,nombre_completo,email'); // Faltaba $query =
        
        if ($request->has('categoria') && $request->categoria !== '') {
            $query->where('categoria', $request->categoria);
        }
        
        if ($request->has('buscar') && $request->buscar !== '') {
            $buscar = strip_tags($request->buscar);
            $query->where('titulo', 'LIKE', '%' . $buscar . '%');
        }
        
        $posts = $query
            ->orderByRaw('fijado DESC')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'titulo' => $post->titulo,
                    'contenido' => $post->contenido,
                    'categoria' => $post->categoria,
                    'vistas' => $post->vistas,
                    'fijado' => $post->fijado,
                    'cerrado' => $post->cerrado,
                    'created_at' => $post->created_at,
                    'usuario' => $post->usuario,
                ];
            });

        if ($request->user()) {
            LogActivityService::registrar(
                usuario_id: $request->user()->id,
                tipo_operacion: 'READ',
                modulo: 'foro',
                id_registro_afectado: null
            );
        }

        return response()->json($posts, 200);
    }

    /**
     * DETALLE DE POST + COMENTARIOS
     */
    public function show($id, Request $request)
    {
        $post = ForumPost::with([
            'usuario:id,nombre_completo,email',
            'comentarios.usuario:id,nombre_completo,email' // Agregar relación anidada
        ])->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        // Incrementar vistas
        $post->increment('vistas');

        // Registrar log solo si hay usuario autenticado
        if ($request->user()) {
            LogActivityService::registrar(
                usuario_id: $request->user()->id,
                tipo_operacion: 'READ',
                modulo: 'foro',
                id_registro_afectado: $id
            );
        }

        return response()->json([
            'id' => $post->id,
            'titulo' => $post->titulo,
            'contenido' => $post->contenido,
            'categoria' => $post->categoria,
            'fijado' => $post->fijado,
            'cerrado' => $post->cerrado,
            'vistas' => $post->vistas,
            'created_at' => $post->created_at,
            'updated_at' => $post->updated_at,
            'usuario' => $post->usuario,
            'comentarios' => $post->comentarios->map(function ($c) {
                return [
                    'id' => $c->id,
                    'cuerpo' => $c->cuerpo,
                    'created_at' => $c->created_at,
                    'usuario' => $c->usuario
                ];
            })
        ], 200);
    }

    /**
     * CATEGORÍAS
     */
    public function categorias()
    {
        $categorias = ForumPost::select('categoria')
            ->distinct()
            ->whereNotNull('categoria')
            ->pluck('categoria');
            
        return response()->json($categorias, 200);
    }
}