'use client';

import type { ForumPost } from '../services/forum-service';
import ForumCommentForm from './ForumCommentForm';

interface Props {
  post: ForumPost | null;
  onClose: () => void;
  onRefresh?: () => void; // función que refresca el post desde el padre
}

export default function ForumPostDetail({ post, onClose, onRefresh }: Props) {
  if (!post) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">
          Selecciona un post para ver los detalles
        </p>
      </div>
    );
  }

  const handleCommentAdded = async () => {
  try {
    if (onRefresh) {
      await onRefresh();   // fuerza que el padre vuelva a cargar el post seleccionado
    }
  } catch (error) {
    console.error('Error al recargar post:', error);
  }
};

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {post.fijado && (
                <span className="px-3 py-1 bg-red-400 text-white text-sm font-semibold rounded">
                  Fijado
                </span>
              )}
              {post.cerrado && (
                <span className="px-3 py-1 bg-gray-600 text-white text-sm font-semibold rounded">
                  Cerrado
                </span>
              )}
              <span className="px-3 py-1 bg-white bg-opacity-30 text-white text-sm font-semibold rounded">
                {post.categoria}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{post.titulo}</h1>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100 border-t border-white border-opacity-30 pt-4">
          <span className="font-semibold">
            Autor: {post.usuario?.nombre_completo}
          </span>
          <span>{post.usuario?.email}</span>
          <span>
            Creado: {new Date(post.created_at).toLocaleDateString('es-ES')}
          </span>
          <span>👁️ {post.vistas} vistas</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-8">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.contenido}
        </p>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Última actualización:{' '}
            {new Date(post.updated_at).toLocaleDateString('es-ES')}
          </div>
          {post.cerrado && (
            <div className="text-sm text-red-600 font-semibold">
              Este post está cerrado. No se pueden agregar respuestas.
            </div>
          )}
        </div>

        {/* Comentarios */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Comentarios
          </h3>
          {post.comentarios && post.comentarios.length > 0 ? (
            <div className="space-y-4">
              {post.comentarios.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {c.usuario?.nombre_completo ?? 'Usuario'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(c.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{c.cuerpo}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay comentarios aún.</p>
          )}
        </div>

        {/* Formulario para comentar */}
        {!post.cerrado && (
          <ForumCommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
        )}
      </div>
    </div>
  );
}