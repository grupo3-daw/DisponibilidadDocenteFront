import { Curso } from '@negocio/cursos';
import { Usuario } from '@negocio/usuario';

/**
 * @export
 * @var id:number
 * @var name: string
 * @var hours: number
 */
export interface Categoria {
  id: number;
  name: string;
  hours: number;
}

/**
 * @export
 * @var id: number
 * @var category_id: number
 * @var category_name: string
 * @var user: Usuario
 */
export interface Profesor {
  id: number;
  category: Categoria;
  user: Usuario;
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
  horas_minimas: number;
  horas_maximas: number;
  cursos?: Array<Curso>;
  disponibilidad?: Array<Disponibilidad>;
  solicitud?: any;
}
