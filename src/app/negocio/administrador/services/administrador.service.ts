import { EventEmitter, Injectable, Output } from '@angular/core';
import { ProfesorVistaAdmin, SeleccionEscuela } from '@negocio/administrador/profesores/profesores.component';
import { Profesor, ProfesorDetalle } from '@negocio/profesor/profesor';
import { ProfesorService } from '@negocio/profesor/services/profesor.service';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';
import { NotificationService } from '@shared/services/notification.service';

export interface ProfesoresCursosVistaAdmin {
  profesores: Array<ProfesorVistaAdmin>;
  cursos: Array<SeleccionEscuela>;
}

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  @Output() readonly exitoEnProceso = new EventEmitter<boolean>();
  constructor(
    private readonly api: ApiService,
    private readonly profesorService: ProfesorService,
    private readonly notificacionService: NotificationService
  ) { }

  evaluarSolicitud(profesor: ProfesorDetalle, estado: 'APROBADO' | 'RECHAZADO', motivo = ''): void {
    this.api
      .operacion(
        `profesores/${profesor.id}/permiso/${profesor.permiso}`,
        Consulta.PATCH,
        { estado, motivo }
      )
      .then(res => {
        let mensaje = `Solicitud de ${profesor.appaterno}${profesor.apmaterno},  ${
          profesor.nombre
          } `;
        if (estado === 'APROBADO') {
          mensaje += 'aprobada';
        } else {
          mensaje += 'rechazada';
        }
        this.notificacionService.mostrarMensajeSuccess(mensaje);
        this.exitoEnProceso.emit(true);
      })
      .catch(error => {
        this.exitoEnProceso.emit(false);
      });
  }

  async listarAdmin(): Promise<ProfesoresCursosVistaAdmin> {
    return this.listar()
      .then(async lista => {
        console.log(lista);
        const profesores: Array<ProfesorVistaAdmin> = [];
        const cursos: Array<SeleccionEscuela> = [];
        const ids: Array<number> = [];
        lista.forEach(async profesor => {
          const detalle = await this.profesorService.obtenerDetalle(profesor.id);
          console.log(detalle);
          let cursosDetalle = '';
          detalle.cursos.forEach((curso, index) => {
            let signo = ', ';
            if (index === detalle.cursos.length - 1) {
              signo = '';
            }
            if (!ids.includes(curso.id)) {
              ids.push(curso.id);
              cursos.push({
                nombre: curso.nombrecurso,
                escuela: curso.escuela_id,
                seleccionado: false
              });
            }
            cursosDetalle += `${curso.nombrecurso}${signo}`;
          });
          if (detalle.disponibilidades.length > 0) {
            profesores.push({
              ...detalle,
              tipo: detalle.categoria.nombrecategoria,
              nombre: `${detalle.appaterno} ${detalle.apmaterno},
                ${detalle.nombre}`,
              cursosEscogidos: cursosDetalle
            });
          }
        });

        return {
          profesores,
          cursos
        };
      })
      .catch();
  }

  async listar(): Promise<Array<Profesor>> {
    return this.api.operacion<{ profesores: Array<Profesor> }>('profesores')
      .then(
        lista => lista.profesores
      );
  }
}
