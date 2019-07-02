import { Administrador } from '@negocio/administrador/administrador';
import { EscuelaCurso } from '@negocio/cursos';
import { Usuario } from '@negocio/usuario';

import { EstadoDisponibilidad } from './disponibilidad-semanal/estado-disponibilidad.enum';

export interface Categoria {
  idCategoria: number;
  nombre: string;
  horasMinimas: number;
  horasMaximas: number;
}

export interface Profesor extends Usuario {
  categoria: Categoria;
  cursos?: Array<CursoProfesor>;
  disponibilidad?: Array<Disponibilidad>;
  permiso?: Permiso;
}

export interface CursoProfesor {
  escuelaCurso: EscuelaCurso;
}

export interface Permiso {
  idPermiso: number;
  idUsuario: number;
  estado: EstadoDisponibilidad;
  solicitud: string;
  motivo?: any;
}

export interface Disponibilidad {
  idDisponibilidad: number;
  dia: number;
  horas: string;
}

export function isProfesor(usuario: Administrador | Profesor): usuario is Profesor {
   return (usuario as Profesor).categoria !== undefined;
 }
