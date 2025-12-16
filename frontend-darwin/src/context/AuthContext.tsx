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

  useEffect(() => {
    const token = authService.getToken();
    const savedUsuario = authService.getUsuario();
    if (token && savedUsuario) {
      setIsAuthenticated(true);
      setUsuario(savedUsuario);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setIsAuthenticated(true);
    setUsuario(response.usuario);
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUsuario(null);
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