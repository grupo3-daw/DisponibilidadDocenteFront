import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  dialogRef: MatDialogRef<ModalConfirmacionComponent>;
  constructor(public dialog: MatDialog, private readonly router: Router) {}

  cargarDialog(): void {
    this.dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Salir',
        mensaje: '¿Desea Salir del Sistema?'
      }
    });
  }

  async navegarLogin(resultado: boolean): Promise<boolean> {
    if (resultado) {
      return this.router.navigate(['auth']);
    }

    return new Promise(resolve => {
      resolve(false);
    });
  }

  openDialog(): void {
    this.cargarDialog();
    this.dialogRef.afterClosed()
    .subscribe(result => {
      this.navegarLogin(result);
    });
  }
}
