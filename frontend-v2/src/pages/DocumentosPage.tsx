'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DocumentoFilters from '../components/DocumentoFilters';
import DocumentosList from '../components/DocumentosList';
import documentoService from '../services/documento-service';

// Definir interfaces localmente
interface Documento {
  id: number;
  categoria_id: number;
  usuario_creador_id: number;
  titulo: string;
  ruta_archivo: string;
  url_archivo: string;
  version: string;
  fecha_publicacion: string;
  created_at: string;
  updated_at: string;
  categoria: {
    id: number;
    nombre_categoria: string;
  };
  usuario: {
    id: number;
    nombre_completo: string;
    email: string;
  };
}

interface FilterDocumentosParams {
  busqueda?: string;
  categoria_id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  usuario_id?: number;
  page?: number;
}

export default function DocumentosPage() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastFilters, setLastFilters] = useState<FilterDocumentosParams>({});

  const cargarDocumentos = async (params: FilterDocumentosParams = {}, page: number = 1) => {
    setLoading(true);
    try {
      const response = await documentoService.filtrar({ ...params, page });
      setDocumentos(response.data.data || []);
      setTotalPages(response.data.last_page || 1);
      setCurrentPage(response.data.current_page || 1);
    } catch (error) {
      console.error('Error al cargar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    cargarDocumentos();
  }, []);

  const handleFilter = (params: FilterDocumentosParams) => {
    setLastFilters(params);
    cargarDocumentos(params, 1);
  };

  const handleReset = () => {
    setLastFilters({});
    cargarDocumentos({}, 1);
  };

  const handleDescargar = async (id: number, titulo: string) => {
    try {
      const blob = await documentoService.descargar(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${titulo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Error al descargar el documento');
    }
  };

  const handlePageChange = (page: number) => {
    cargarDocumentos(lastFilters, page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header idéntico al Dashboard */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Repositorio Documental</h1>
            <p className="text-sm text-gray-600">
              Gestión de Contingencias Satelitales - {usuario?.nombre_completo}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ir al Dashboard
            </button>
            <button
              onClick={() => navigate("/forum")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Ir al Foro
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

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HU-16: Filtros de búsqueda */}
        <DocumentoFilters onFilter={handleFilter} onReset={handleReset} />
        
        {/* Lista de documentos */}
        <DocumentosList 
          documentos={documentos} 
          loading={loading}
          onDescargar={handleDescargar}
        />

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}