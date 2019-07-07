import { ProfesorDetalle } from '@negocio/profesor/profesor';

export interface ProfesorVistaAdmin extends ProfesorDetalle {
  nombre: string;
  cursosEscogidos: string;
}
