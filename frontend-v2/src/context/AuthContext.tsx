'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/auth-service';

interface Usuario {
  id: number;
  email: string;
  nombre_completo: string;
  rol_id: number;
  unidad_operativa: string;
  activo: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Recuperar sesión al recargar
  useEffect(() => {
    const token = authService.getToken();
    const savedUsuario = authService.getUsuario();

    if (token && savedUsuario) {
      setIsAuthenticated(true);
      setUsuario(savedUsuario);
    }
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });

    // Guardar token y usuario
    authService.setToken(response.access_token);
    authService.setUsuario(response.usuario);

    setIsAuthenticated(true);
    setUsuario(response.usuario);
  };

  // LOGOUT
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn("Logout falló en backend, pero igual limpiamos sesión");
    }

    // Limpiar localStorage
    authService.clearToken();
    authService.clearUsuario();

    setIsAuthenticated(false);
    setUsuario(null);

    // Redirigir al login
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}