import { EventEmitter, Injectable, Output } from '@angular/core';
import { ProfesorVista } from '@negocio/administrador/profesores/profesores.component';
import { ApiService } from '@shared/services/api.service';
import { Profesor } from 'app/login/login.service';

import { Consulta } from './consulta.enum';
import { Curso } from './curso';
import { NotificationService } from './notification.service';

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
  @Output() readonly envioSolicitud = new EventEmitter<boolean>();
  constructor(private readonly api: ApiService, private readonly notificacionService: NotificationService) {
  }

  async obtenerDetalle(id: number): Promise<ProfesorDetalle> {
    return this.api.operacion(`profesores/${id}`);
  }

  async registrarCursos(idProfesor: number, cursos: Array<Curso>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/cursos`, Consulta.POST, { cursos: cursos.map(curso => curso.IDCURSO) });
  }

  async registrarDisponibilidad(idProfesor: number, dias: Array<number>, horas: Array<Array<number>>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/disponibilidad`, Consulta.POST, { dia: dias, horas });
  }

  registrarDisponibilidadCursos(idProfesor: number, cursos: Array<Curso>, dias: Array<number>, horas: Array<Array<number>>): void {
    const registrarCursos = this.registrarCursos(idProfesor, cursos);
    const registrarDisponibilidad = this.registrarDisponibilidad(idProfesor, dias, horas);
    Promise.all([
      registrarCursos,
      registrarDisponibilidad
    ])
      .then(
        res => {
          this.notificacionService.mostrarMensajeSuccess('Disponibilidad Registrada Exitosamente');
          this.envioSolicitud.emit(true);
        }
      )
      .catch(
        error => {
          this.envioSolicitud.emit(false);
        }
      );

  }

  solicitarEdicion(idProfesor: number, solicitud: string): void {
    this.api.operacion(`profesores/${idProfesor}/permiso`, Consulta.POST, { solicitud })
      .then(res => { this.notificacionService.mostrarMensajeSuccess('Solicitud Enviada Exitosamente'); this.envioSolicitud.emit(true); })
      .catch(error => { this.envioSolicitud.emit(false); });
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
                  nombre: `${detalle.APPATERNO} ${detalle.APMATERNO},
                ${detalle.NOMBRE}`,
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

  private async listar(): Promise<Array<Profesor>> {
    return this.api.operacion('profesores');
  }
}
