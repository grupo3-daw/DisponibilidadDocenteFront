import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from '@shared/services/notification.service';

import { efecto } from './shared/triggers/efecto_lateral';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [efecto]
})
export class AppComponent implements OnInit {
  loading = true;
  title = 'DisponibilidadDocente';
  maxHeight;

  constructor(private readonly notificationService: NotificationService, private readonly snackBar: MatSnackBar) {
    this.notificationService.mostrandoSnackbar.subscribe(
      res => {
        this.snackBar.open(res.titulo, ' ', {
          panelClass: [`${res.color}-snackbar` ],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 1000
        });
      }
    );
  }
  ngOnInit(): void {
    this.loading = false;
    this.maxHeight = `${window.outerHeight}px`;
  }

  // prepRouteState(outlet) {
  //   return outlet.activatedRouteData['page'];
  // }
}
