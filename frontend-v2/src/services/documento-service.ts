import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Documento {
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

export interface FilterDocumentosParams {
  busqueda?: string;
  categoria_id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  usuario_id?: number;
  page?: number;
}

class DocumentoService {
  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  // HU-16: Obtener documentos con filtros
  async filtrar(params: FilterDocumentosParams) {
    const queryParams = new URLSearchParams();
    
    if (params.busqueda) queryParams.append('busqueda', params.busqueda);
    if (params.categoria_id) queryParams.append('categoria_id', params.categoria_id.toString());
    if (params.fecha_inicio) queryParams.append('fecha_inicio', params.fecha_inicio);
    if (params.fecha_fin) queryParams.append('fecha_fin', params.fecha_fin);
    if (params.usuario_id) queryParams.append('usuario_id', params.usuario_id.toString());
    if (params.page) queryParams.append('page', params.page.toString());

    // ✅ CORRECCIÓN: Usar API_URL completo
    const response = await axios.get(`${API_URL}/documentos/filtrar?${queryParams.toString()}`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  // ✅ CORRECCIÓN: Endpoint de categorías
  async getCategorias() {
    const response = await axios.get(`${API_URL}/categoriasdocs`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  // Descargar documento
  async descargar(id: number) {
    const response = await axios.get(`${API_URL}/documentos/${id}/descargar`, {
      headers: this.getAuthHeader(),
      responseType: 'blob'
    });
    return response.data;
  }
}

export default new DocumentoService();
export { DocumentoService }; // Opcional pero útil