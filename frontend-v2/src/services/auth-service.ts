import api from './api';

const authService = {
  // ============================
  //  LOGIN
  // ============================
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { message, access_token, usuario }
  },

  // ============================
  //  LOGOUT
  // ============================
  logout: async () => {
    await api.post('/auth/logout');
  },

  // ============================
  //  REGISTER
  // ============================
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // ============================
  //  TOKEN MANAGEMENT
  // ============================
  getToken: () => localStorage.getItem('token'),

  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  clearToken: () => {
    localStorage.removeItem('token');
  },

  // ============================
  //  USER MANAGEMENT
  // ============================
  getUsuario: () => {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw) : null;
  },

  setUsuario: (usuario: any) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },

  clearUsuario: () => {
    localStorage.removeItem('usuario');
  },
};

export default authService;