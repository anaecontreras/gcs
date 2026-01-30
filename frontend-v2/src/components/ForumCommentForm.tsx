'use client';

import { useState } from 'react';
import { comentar } from '../services/forum-service';

interface Props {
  postId: number;
  onCommentAdded: () => void; // Para recargar comentarios o refrescar el post
}

export default function ForumCommentForm({ postId, onCommentAdded }: Props) {
  const [cuerpo, setCuerpo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!cuerpo.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }

    try {
      setLoading(true);
      await comentar(postId, cuerpo);
      setSuccess('Comentario publicado');
      setCuerpo('');
      onCommentAdded();
    } catch (err: any) {
      setError('Error al enviar el comentario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Agregar un comentario</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={cuerpo}
          onChange={(e) => setCuerpo(e.target.value)}
          rows={4}
          placeholder="Escribe tu comentario aquí..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                     disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Enviando...' : 'Publicar comentario'}
        </button>
      </form>
    </div>
  );
}