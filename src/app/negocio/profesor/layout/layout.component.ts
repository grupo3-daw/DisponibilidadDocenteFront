import { Component, OnInit } from '@angular/core';
import { Profesor } from 'app/login/login.service';

import { ProfesorDetalle, ProfesorService } from '../profesor.service';

@Component({
  selector: 'app-layout-profesor',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutProfesorComponent implements OnInit {
  cursosSeleccionados: any;
  user: Profesor;
  profesorDetalle: ProfesorDetalle;
  constructor(
    private readonly profesorService: ProfesorService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() : void {
    this.profesorService.obtenerDetalle(this.user.IDPROFESOR)
    .then(
      profesor => this.profesorDetalle = profesor
    )
    .catch();
  }
}
