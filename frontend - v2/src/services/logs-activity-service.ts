import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface LogActivity {
  id: number;
  usuario_id: number;
  tipo_operacion: string;
  modulo: string;
  id_registro_afectado: number | null;
  timestamp: string;
  created_at: string;
  updated_at: string;
  usuario?: {
    id: number;
    nombre_completo: string;
    email: string;
  };
}

export interface LogsResponse {
  message: string;
  data: {
    current_page: number;
    data: LogActivity[];
    total: number;
    per_page: number;
    last_page: number;
  };
}

export interface FilterParams {
  fecha_inicio: string;
  fecha_fin: string;
  modulo?: string;
  tipo_operacion?: string;
  usuario_id?: number;
}

class LogsActivityService {
  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  async getMisActividades(): Promise<LogsResponse> {
    const response = await axios.get(`${API_URL}/logs-activity/mis-actividades`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getTodas(): Promise<LogsResponse> {
    const response = await axios.get(`${API_URL}/logs-activity/todas`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async filtrar(params: FilterParams): Promise<LogsResponse> {
    const response = await axios.post(`${API_URL}/logs-activity/filtrar`, params, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }
}

export default new LogsActivityService();