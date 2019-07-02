import { HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { EscuelaCurso } from '@negocio/cursos';
import { EstadoDisponibilidad } from '@negocio/profesor/disponibilidad-semanal/estado-disponibilidad.enum';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';
import { NotificationService } from '@shared/services/notification.service';

import { CursoProfesor, Profesor } from '../profesor';

export interface Semestre {
  semestre: number;
  anio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  @Output() readonly exitoEnProceso = new EventEmitter<EstadoDisponibilidad>();
  constructor(
    private readonly api: ApiService,
    private readonly notificacionService: NotificationService
  ) {}

  async obtenerDetalle(usuario: Profesor): Promise<Profesor> {
    const semestres = await this.obtenerSemestres();
    console.log(semestres);
    const ultimoSemestre = semestres.pop();
    const profesor = usuario;
    profesor.cursos = [];
    profesor.disponibilidad = [];

    return this.api
      .operacion<Array<CursoProfesor>>(
        'cursos_dictados',
        Consulta.GET,
        {},
        this.api.webAddress.getHeaders(),
        new HttpParams()
          .append('semestre', ultimoSemestre.id.semestre.toString())
          .append('anio', ultimoSemestre.id.anio.toString())
      )
      .then(res => {
        profesor.cursos = res;

        return profesor;
      })
      .catch(() => profesor);
  }

  async obtenerSemestres(): Promise<Array<{id: Semestre}>> {
    return this.api.operacion('semestres');
  }

  async registrarCursos(idUsuario: number, cursosEscuela: Array<EscuelaCurso>): Promise<any> {
    if (cursosEscuela.length === 4) {
      cursosEscuela.forEach(cursoEscuela => {
        this.api.operacion('cursos_dictados', Consulta.POST, {
          idUsuario,
          idEscuela: cursoEscuela.escuela.idEscuela,
          idCurso: cursoEscuela.curso.idCurso
        });
      });
    }

    return Promise.reject(new Error('Deben ser 4 cursos'));
  }

  // async editarCursos(idProfesor: number, cursos: Array<Curso>): Promise<any> {
  //   return this.api.operacion(`profesores/${idProfesor}/cursos`, Consulta.PUT, {
  //     cursos: cursos.map(curso => curso.IDCURSO)
  //   });
  // }

  async registrarDisponibilidad(
    idProfesor: number,
    dias: Array<number>,
    horas: Array<Array<number>>
  ): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/disponibilidad`, Consulta.POST, {
      dia: dias,
      horas
    });
  }

  async editarDisponibilidad(
    idProfesor: number,
    dias: Array<number>,
    horas: Array<Array<number>>
  ): Promise<any> {
    return this.api.operacion(`profesores/${idProfesor}/disponibilidad`, Consulta.PUT, {
      dia: dias,
      horas
    });
  }

  descargarReporte(idProfesor: number): void {
    this.api.agregarRutasDominio(`profesores/${idProfesor}/reporte`);
    window.open(this.api.webAddress.getUrl());
  }

  // registrarDisponibilidadCursos(
  //   idProfesor: number,
  //   cursos: Array<Curso>,
  //   dias: Array<number>,
  //   horas: Array<Array<number>>
  // ): void {
  //   this.registrarCursos(idProfesor, cursos)
  //     .then(cursosRes => {
  //       this.registrarDisponibilidad(idProfesor, dias, horas)
  //         .then(res => {
  //           this.notificacionService.mostrarMensajeSuccess(
  //             'Disponibilidad Registrada Exitosamente'
  //           );
  //           this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
  //         })
  //         .catch(error => {
  //           this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
  //         });
  //     })
  //     .catch(error => {
  //       this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
  //     });
  // }

  // editarDisponibilidadCursos(
  //   idProfesor: number,
  //   cursos: Array<Curso>,
  //   dias: Array<number>,
  //   horas: Array<Array<number>>
  // ): void {
  //   this.editarCursos(idProfesor, cursos)
  //     .then(cursosRes => {
  //       this.editarDisponibilidad(idProfesor, dias, horas)
  //         .then(res => {
  //           this.notificacionService.mostrarMensajeSuccess(
  //             'Disponibilidad Actualizada Exitosamente'
  //           );
  //           this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
  //         })
  //         .catch(error => {
  //           this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
  //         });
  //     })
  //     .catch(error => {
  //       this.exitoEnProceso.emit(EstadoDisponibilidad.SOLICITAR);
  //     });
  // }

  // solicitarEdicion(idProfesor: number, solicitud: string): void {
  //   this.api
  //     .operacion(`profesores/${idProfesor}/permiso`, Consulta.POST, {solicitud})
  //     .then(res => {
  //       this.notificacionService.mostrarMensajeSuccess('Solicitud Enviada Exitosamente');
  //       this.exitoEnProceso.emit(EstadoDisponibilidad.PROCESANDO_SOLICITUD);
  //     })
  //     .catch(error => {
  //       this.exitoEnProceso.emit(EstadoDisponibilidad.PROCESANDO_SOLICITUD);
  //     });
  // }
}
