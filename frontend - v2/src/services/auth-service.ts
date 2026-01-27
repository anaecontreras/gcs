import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre_completo: string;
  email: string;
  password: string;
  rol_id: number;
  unidad_operativa: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  token_type: string;
  usuario: {
    id: number;
    email: string;
    nombre_completo: string;
    rol_id: number;
    unidad_operativa: string;
    activo: boolean;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  }

  async logout(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    }
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();