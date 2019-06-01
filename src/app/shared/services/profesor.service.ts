import { Injectable } from '@angular/core';
import { ProfesorVista } from '@negocio/administrador/profesores/profesores.component';
import { ApiService } from '@shared/services/api.service';

import { Consulta } from './consulta.enum';
import { Curso } from './curso';

export interface Disponibilidad {
  DIA: number;
  HORAS: string;
}

export interface ProfesorDetalle {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  user_role_id: number;
  user_role_name: string;
  category_id: number;
  category_name: string;
  cursos ?: Array<any>;
  disponibilidad ?: Array<any>;
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
    return this.api.operacion('auth/teacher/get/1');
  }

  async registrarCursos(idProfesor: number, cursos: Array<Curso>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/cursos`, Consulta.POST, { cursos: cursos.map(curso => curso.IDCURSO) });
  }

  async registrarDisponibilidad(idProfesor: number, dias: Array<number>, horas: Array<Array<number>>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/disponibilidad`, Consulta.POST, { dia: dias, horas });
  }
  async listarAdmin(): Promise<ProfesoresVistaAdmin> {
    return this.listar()
      .then(
        lista => {
          const profesores: Array<ProfesorVista> = [];
          const cursos: Array<{ nombre: string, seleccionado: boolean }> = []
          lista.teachers.forEach(
            async profesor => {
              const detalle = await this.obtenerDetalle(profesor.id);
              let cursosDetalle = ''
              detalle.cursos.forEach(
                (curso, index) => {
                  let signo = ', ';
                  if (index === detalle.cursos.length - 1) {
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
                  ...detalle,
                  nombre: detalle.user_name,
                  cursosEscogidos: cursosDetalle
                });
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

  private async listar(): Promise<{teachers: Array<ProfesorDetalle>}> {
    return this.api.operacion('auth/teachers');
  }
}
