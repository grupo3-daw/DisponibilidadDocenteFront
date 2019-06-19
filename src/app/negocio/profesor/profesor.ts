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
  IDPROFESOR: number;
  IDCATEGORIA: number;
  NOMBRE: string;
  APPATERNO: string;
  APMATERNO: string;
  PERMISO: number;
}

export interface Solicitud {
  idpermiso: number;
  IDPROFESOR: number;
  estado: string;
  solicitud: string;
  motivo?: any;
}

export interface Disponibilidad {
  DIA: number;
  HORAS: string;
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
  NOMBRECATEGORIA: string;
  horas_minimas: number;
  horas_maximas: number;
  cursos?: Array<Curso>;
  disponibilidad?: Array<Disponibilidad>;
  solicitud?: any;
}
