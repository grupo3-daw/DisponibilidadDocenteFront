import { Profesor } from '@negocio/profesor/profesor';
import { Usuario } from '@negocio/usuario';

/**
 * @export
 * @extends {Usuario}
 * @var IDADMINISTRADOR: number
 * @var facultad_IDFACULTAD: number
 */
export interface Administrador extends Usuario {
  idFacultad: number;
}

 export function isAdministrador(usuario: Administrador | Profesor): usuario is Administrador {
  return (usuario as Administrador).idFacultad !== undefined;
}
