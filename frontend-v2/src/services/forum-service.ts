import api from './api';

export interface ForumPost {
  id: number;
  titulo: string;
  contenido: string;
  categoria: string;
  vistas: number;
  fijado?: boolean;
  cerrado?: boolean;
  created_at: string;
  updated_at: string;
  usuario: {
    nombre_completo: string;
    email?: string;
  };
  comentarios?: {
    id: number;
    cuerpo: string;
    created_at: string;
    usuario: {
      nombre_completo: string;
      email?: string;
    };
  }[];
}

export async function getPosts() {
  const response = await api.get('/forum/posts');
  return response.data;
}

export async function getPost(id: number) {
  const res = await api.get(`/forum/posts/${id}`);
  return res.data;
}

export async function getCategorias() {
  const res = await api.get('/forum/categorias');
  return res.data;
}

export async function comentar(postId: number, cuerpo: string) {
  const res = await api.post(`/forum/posts/${postId}/comentarios`, { cuerpo });
  return res.data;
}