'use client';

import { useState, useEffect } from 'react';
import documentoService from '../services/documento-service';

interface FilterDocumentosParams {
  busqueda?: string;
  categoria_id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  usuario_id?: number;
  page?: number;
}

interface Categoria {
  id: number;
  nombre_categoria: string;
}

interface Props {
  onFilter: (params: FilterDocumentosParams) => void;
  onReset: () => void;
}

export default function DocumentoFilters({ onFilter, onReset }: Props) {
  const [filters, setFilters] = useState<FilterDocumentosParams>({
    busqueda: '',
    categoria_id: undefined,
    fecha_inicio: '',
    fecha_fin: ''
  });
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await documentoService.getCategorias();
      setCategorias(data.categorias || []);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      busqueda: '',
      categoria_id: undefined,
      fecha_inicio: '',
      fecha_fin: ''
    });
    onReset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filtros de Búsqueda</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Búsqueda por palabras clave */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar por título o versión
          </label>
          <input
            type="text"
            name="busqueda"
            value={filters.busqueda || ''}
            onChange={handleChange}
            placeholder="Ej: Manual, v1.0..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro por categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            name="categoria_id"
            value={filters.categoria_id || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha inicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha publicación desde
          </label>
          <input
            type="date"
            name="fecha_inicio"
            value={filters.fecha_inicio || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Fecha fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha publicación hasta
          </label>
          <input
            type="date"
            name="fecha_fin"
            value={filters.fecha_fin || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones */}
        <div className="md:col-span-2 lg:col-span-4 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Aplicar Filtros
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </form>
    </div>
  );
}