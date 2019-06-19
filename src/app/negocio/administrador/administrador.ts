import { Usuario } from '@negocio/usuario';

/**
 * @export
 * @interface Administrador
 * @extends {Usuario}
 * @var IDADMINISTRADOR: number
 * @var facultad_IDFACULTAD: number
 */
export interface Administrador extends Usuario {
  IDADMINISTRADOR: number;
  facultad_IDFACULTAD: number;
}
