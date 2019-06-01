import { Injectable } from '@angular/core';
import { ProfesorVista } from '@negocio/administrador/profesores/profesores.component';
import { ApiService } from '@shared/services/api.service';
import { Profesor } from 'app/login/login.service';

import { Curso } from './curso';

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
 * @var   solicitud?: any;
 */
export interface ProfesorDetalle extends Profesor {
  NOMBRECATEGORIA: string;
  horas_minimas: number;
  horas_maximas: number;
  cursos?: Array<Curso>;
  disponibilidad?: Array<Disponibilidad>;
  solicitud?: any;
}

export interface ProfesoresVistaAdmin {
  profesores: Array<ProfesorVista>;
  cursos: Array<{ nombre: string, seleccionado: boolean }>;
}

@Injectable({
    providedIn: 'root'
  })
export class ProfesorService {
  constructor(private readonly api: ApiService) {
  }

  async obtenerDetalle(id: number): Promise<ProfesorDetalle> {
    return this.api.operacion(`profesores/${id}`);
  }



  async listarAdmin(): Promise<ProfesoresVistaAdmin> {
    return this.listar()
    .then(
      lista => {
        const profesores: Array<ProfesorVista> = [];
        const cursos: Array<{ nombre: string, seleccionado: boolean }> = []
        lista.forEach(
          async profesor => {
            const detalle = await this.obtenerDetalle(profesor.IDPROFESOR);
            let cursosDetalle = ''
            detalle.cursos.forEach(
              (curso , index ) => {
                let signo = ', ';
                if(index === detalle.cursos.length - 1) {
                  signo = '';
                }

                if (!cursos.includes({ nombre: curso.NOMBRECURSO, seleccionado: false })) {
                  cursos.push({ nombre: curso.NOMBRECURSO, seleccionado: false })
                }
                cursosDetalle += `${curso.NOMBRECURSO}${signo}`;
              }
            );
            profesores.push(
              {
                nombre: detalle.NOMBRE,
                tipo: detalle.NOMBRECATEGORIA,
                cursos: cursosDetalle,
                solicitud: detalle.solicitud
              }
            );
          }
        );

        return {
          profesores,
          cursos
        };
      }
    )
    .catch();
  }

  private async listar(): Promise<Array<Profesor>> {
    return this.api.operacion('profesores');
  }
}
