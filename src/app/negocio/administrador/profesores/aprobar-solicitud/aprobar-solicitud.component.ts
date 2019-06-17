import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdministradorService } from '@negocio/administrador/services/administrador.service';
import { ProfesorDetalle } from '@negocio/profesor/profesor';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-aprobar-solicitud',
  templateUrl: './aprobar-solicitud.component.html',
  styleUrls: ['./aprobar-solicitud.component.scss']
})
export class AprobarSolicitudComponent {
  @ViewChild('rechazarModelo', {static: false}) rechazarModelo;
  motivo = '';
  constructor(
    public dialog: MatDialog,
    public thisDialogRef: MatDialogRef<AprobarSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {profesor: ProfesorDetalle},
    private readonly administradorService: AdministradorService
  ) { }

  aprobar(): void {
    this.administradorService.evaluarSolicitud(this.data.profesor, 'APROBADO');
  }

  rechazar(): void {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Rechazar Solicitud',
        mensaje: '',
        template: { element: this.rechazarModelo, data: this.motivo }
      }
    });
    dialogRef.afterClosed()
      .subscribe(
        result => {
          if (result === true && this.motivo.trim().length > 0) {
            this.administradorService.evaluarSolicitud(this.data.profesor, 'RECHAZADO', this.motivo);
          }
        }
      );
  }

}
