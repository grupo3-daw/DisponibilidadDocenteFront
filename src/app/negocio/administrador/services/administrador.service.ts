import { EventEmitter, Injectable, Output } from '@angular/core';
import { ProfesorVistaAdmin } from '@negocio/administrador/profesores/profesores.component';
import { Profesor, ProfesorDetalle } from '@negocio/profesor/profesor';
import { ProfesorService } from '@negocio/profesor/services/profesor.service';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';
import { NotificationService } from '@shared/services/notification.service';

export interface ProfesoresCursosVistaAdmin {
  profesores: Array<ProfesorVistaAdmin>;
  cursos: Array<{ nombre: string, seleccionado: boolean }>;
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
  ) {
  }

  evaluarSolicitud(profesor: ProfesorDetalle, estado: 'APROBADO' | 'RECHAZADO', motivo = ''): void {
    this.api.operacion(`profesores/${profesor.IDPROFESOR}/permiso/${profesor.solicitud.idpermiso}`, Consulta.PATCH, { estado, motivo })
      .then(
        res => {
          let mensaje = `Solicitud de ${profesor.APPATERNO}${profesor.APMATERNO},  ${profesor.NOMBRE} `;
          if (estado === 'APROBADO') {
            mensaje += 'aprobada';
          } else {
            mensaje += 'rechazada';
          }
          this.notificacionService.mostrarMensajeSuccess(mensaje)
          this.exitoEnProceso.emit(true);
        }
      )
      .catch(
        error => { this.exitoEnProceso.emit(false); }
      );
  }

  async listarAdmin(): Promise<ProfesoresCursosVistaAdmin> {
    return this.listar()
      .then(
        lista => {
          const profesores: Array<ProfesorVistaAdmin> = [];
          const cursos: Array<{ nombre: string, seleccionado: boolean }> = []
          lista.forEach(
            async profesor => {
              const detalle = await this.profesorService.obtenerDetalle(profesor.IDPROFESOR);
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
