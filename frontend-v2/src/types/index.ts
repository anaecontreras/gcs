export interface Usuario {
  id: number;
  email: string;
  nombre_completo: string;
  rol_id: number;
  unidad_operativa: string;
  activo: boolean;
}

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

export interface ForumPost {
  id: number;
  usuario_id: number;
  titulo: string;
  contenido: string;
  categoria: string;
  vistas: number;
  created_at: string;
  updated_at: string;
  fijado?: boolean;
  cerrado?: boolean;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  usuario?: {
    id: number;
    nombre_completo: string;
    email: string;
  };
}