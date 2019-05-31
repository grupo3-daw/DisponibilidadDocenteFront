import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private readonly dialog: MatDialog, private readonly router: Router) { }

  ngOnInit(): void { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Salir',
        mensaje: '¿Desea Salir del Sistema?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.router
            .navigate(['auth'])
            .then()
            .catch();
        }
      });
  }
}
