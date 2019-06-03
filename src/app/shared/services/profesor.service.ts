import { EventEmitter, Injectable, Output } from '@angular/core';
import { EstadoDisponibilidad } from '@negocio/profesor/disponibilidad-semanal/estado-disponibilidad.enum';
import { ApiService } from '@shared/services/api.service';
import { Profesor } from 'app/login/login.service';

import { Consulta } from './consulta.enum';
import { Curso } from './curso';
import { NotificationService } from './notification.service';

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

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  @Output() readonly exitoEnProceso = new EventEmitter<EstadoDisponibilidad>();
  constructor(private readonly api: ApiService, private readonly notificacionService: NotificationService) {
  }

  async obtenerDetalle(id: number): Promise<ProfesorDetalle> {
    return this.api.operacion(`profesores/${id}`);
  }

  async registrarCursos(idProfesor: number, cursos: Array<Curso>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/cursos`, Consulta.POST, { cursos: cursos.map(curso => curso.IDCURSO) });
  }

  async editarCursos(idProfesor: number, cursos: Array<Curso>): Promise<any> {
    console.log(cursos);
    return this.api.operacion(`profesores/${idProfesor}/cursos`, Consulta.PUT, { cursos: cursos.map(curso => curso.IDCURSO) });
  }

  async registrarDisponibilidad(idProfesor: number, dias: Array<number>, horas: Array<Array<number>>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/disponibilidad`, Consulta.POST, { dia: dias, horas });
  }

  async editarDisponibilidad(idProfesor: number, dias: Array<number>, horas: Array<Array<number>>): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/disponibilidad`, Consulta.PUT, { dia: dias, horas });
  }

  registrarDisponibilidadCursos(idProfesor: number, cursos: Array<Curso>, dias: Array<number>, horas: Array<Array<number>>): void {
    this.registrarCursos(idProfesor, cursos)
      .then(
        cursosRes => {
          this.registrarDisponibilidad(idProfesor, dias, horas)
            .then(
              res => {
                this.notificacionService.mostrarMensajeSuccess('Disponibilidad Registrada Exitosamente');
                this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
              }
            )
            .catch(
              error => {
                this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
              }
            );
        }
      )
      .catch(
        error => {
          this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
        }
      );
  }

  editarDisponibilidadCursos(idProfesor: number, cursos: Array<Curso>, dias: Array<number>, horas: Array<Array<number>>): void {
    this.editarCursos(idProfesor, cursos)
      .then(
        cursosRes => {
          this.editarDisponibilidad(idProfesor, dias, horas)
            .then(
              res => {
                this.notificacionService.mostrarMensajeSuccess('Disponibilidad Actualizada Exitosamente');
                this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
              }
            )
            .catch(
              error => {
                this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
              }
            );
        }
      )
      .catch(
        error => {
          this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
        }
      );

  }

  solicitarEdicion(idProfesor: number, solicitud: string): void {
    this.api.operacion(`profesores/${idProfesor}/permiso`, Consulta.POST, { solicitud })
      .then(res => {
        this.notificacionService.mostrarMensajeSuccess('Solicitud Enviada Exitosamente');
        this.exitoEnProceso.emit(EstadoDisponibilidad.PROCESANDO_SOLICITUD);
      })
      .catch(error => { this.exitoEnProceso.emit(EstadoDisponibilidad.PROCESANDO_SOLICITUD); });
  }


}
