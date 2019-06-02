import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';
import { ProfesorService } from '@shared/services/profesor.service';

@Component({
  selector: 'app-solicitar-permisos-edicion',
  templateUrl: './solicitar-permisos-edicion.component.html',
  styleUrls: ['./solicitar-permisos-edicion.component.css']
})
export class SolicitarPermisosEdicionComponent implements AfterViewInit {
  @Input() id: number;
  @ViewChild('modelo') modelo;
  solicitud: string;
  constructor(
    private readonly dialog: MatDialog,
    private readonly profesorService: ProfesorService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
        width: '450px',
        data: {
          titulo: 'Solicitud de Edición de Disponibilidad',
          mensaje: '',
          template: { element: this.modelo, data: this.solicitud }
        }
      });
      dialogRef.afterClosed()
        .subscribe(
          result => {
            if (result === true && this.solicitud.trim().length > 0) {
              this.profesorService.solicitarEdicion(this.id, this.solicitud)
            } else {
              this.profesorService.envioSolicitud.emit(false);
            }
          }
        );
    }, 10);

  }




}
