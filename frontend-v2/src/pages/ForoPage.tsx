'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPosts, getCategorias, getPost } from '../services/forum-service';
import ForumPostsList from '../components/ForumPostsList';
import ForumPostDetail from '../components/ForumPostDetail';
import ForumFilters from '../components/ForumFilters';

export default function ForoPage() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cargarPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
      setAllPosts(data);
    } catch (error) {
      console.error('Error al cargar posts:', error);
      setError('No se pudieron cargar los posts. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setError('No se pudieron cargar las categorías.');
    }
  };

  const seleccionarPost = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPost(id);
      setSelectedPost(data);
    } catch (error) {
      console.error('Error al cargar detalle del post:', error);
      setError('No se pudo cargar el detalle del post.');
    } finally {
      setLoading(false);
    }
  };

  const refrescarPostActual = async () => {
    if (selectedPost) {
      await seleccionarPost(selectedPost.id);
    }
  };

  const filtrarPorCategoria = (categoria: string) => {
    const categoriaNormalizada = categoria === 'Todas' ? '' : categoria;
    setPosts(
      categoriaNormalizada === ''
        ? allPosts
        : allPosts.filter((p: any) => p.categoria === categoriaNormalizada)
    );
  };

  const resetearFiltros = () => {
    setPosts(allPosts);
  };

  useEffect(() => {
    cargarPosts();
    cargarCategorias();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header idéntico al Dashboard pero adaptado */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Foro GCS</h1>
            <p className="text-sm text-gray-600">
              Gestión de Contingencias Satelitales - {usuario?.nombre_completo}
            </p>
          </div>
          <div className="flex gap-2">
            {/* Botón diferente: Esmeralda/Verde para diferenciar del azul del dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Ir al Dashboard
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ForumFilters
              categorias={categorias}
              onFilterByCategory={filtrarPorCategoria}
              onReset={resetearFiltros}
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <ForumPostsList
              posts={posts}
              loading={loading}
              onSelectPost={seleccionarPost}
            />
          </div>

          <div className="lg:col-span-2">
            <ForumPostDetail
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
              onRefresh={refrescarPostActual}
            />
          </div>
        </div>
      </main>
    </div>
  );
}