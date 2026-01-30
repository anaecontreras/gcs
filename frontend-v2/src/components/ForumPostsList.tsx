'use client';

import type { ForumPost } from '../types';

interface Props {
  posts: ForumPost[];
  loading: boolean;
  onSelectPost: (id: number) => void;
}

export default function ForumPostsList({ posts, loading, onSelectPost }: Props) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">Cargando posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">No hay posts en el foro</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <button
          key={post.id}
          onClick={() => onSelectPost(post.id)}
          className="w-full text-left bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.titulo}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-3">{post.contenido}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Por: {post.usuario?.nombre_completo || 'Anónimo'}</span>
                <span>{new Date(post.created_at).toLocaleDateString('es-ES')}</span>
              </div>
            </div>
            <div className="ml-4 text-right">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {post.categoria}
              </span>
              <div className="mt-2 text-sm text-gray-600">{post.vistas} vistas</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}