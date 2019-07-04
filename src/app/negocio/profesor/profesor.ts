import { Curso } from '@negocio/cursos';
import { Usuario } from '@negocio/usuario';

/**
 * @export
 * @extends {Usuario}
 * @var IDPROFESOR: number
 * @var IDCATEGORIA: number
 * @var NOMBRE: string
 * @var APPATERNO: string
 * @var APMATERNO: string
 * @var PERMISO: number
 */
export interface Profesor extends Usuario {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  permiso: number;
}

export interface Solicitud {
  idpermiso: number;
  IDPROFESOR: number;
  estado: string;
  solicitud: string;
  motivo?: any;
}

export interface Disponibilidad {
  id: number;
  profesor_id: number;
  dia: number;
  horas: string;
}

/**
 * @export
 * @extends {Profesor}
 * @var   NOMBRECATEGORIA: string;
 * @var   horas_minimas: number;
 * @var   horas_maximas: number;
 * @var   cursos?: Array<Curso>;
 * @var   disponibilidad? : Array<Disponibilidad>;
 * @var   solicitud?: Solicitud;
 */
export interface ProfesorDetalle extends Profesor {
  categoria: Categoria;
  cursos?: Array<Curso>;
  disponibilidades?: Array<Disponibilidad>;
  permiso_object?: Permiso;
}

export interface Permiso {
  id: number;
  profesor_id: number;
  estado: string;
  solicitud: string;
  motivo: string;
  created_at: string;
  updated_at: string;
}

export interface Categoria {
  id: number;
  nombrecategoria: string;
  horas_minimas: number;
  horas_maximas: number;
  created_at: string;
  updated_at: string;
}
