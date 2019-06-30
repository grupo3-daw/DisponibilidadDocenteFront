import { Curso } from '@negocio/cursos';
import { Usuario } from '@negocio/usuario';

export interface Profesor extends Usuario {
  idCategoria: number;
  cursos?: Array<Curso>;
  disponibilidad?: Array<Disponibilidad>;
}

export interface Solicitud {
  idpermiso: number;
  IDPROFESOR: number;
  estado: string;
  solicitud: string;
  motivo?: any;
}

export interface Disponibilidad {
  idDisponibilidad:number;
  dia: number;
  horas: string;
}

