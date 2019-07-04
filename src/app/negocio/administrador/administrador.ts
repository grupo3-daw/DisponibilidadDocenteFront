import { Usuario } from '@negocio/usuario';

/**
 * @export
 * @interface Administrador
 * @extends {Usuario}
 * @var facultad_id: number
 */
export interface Administrador extends Usuario {
  facultad_id: number;
}
