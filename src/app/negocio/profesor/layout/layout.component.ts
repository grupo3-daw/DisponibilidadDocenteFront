import { Component, OnInit } from '@angular/core';

import { Profesor, ProfesorDetalle } from '../profesor';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-layout-profesor',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutProfesorComponent implements OnInit {
  user: Profesor;
  profesorDetalle: ProfesorDetalle;
  constructor(
    private readonly profesorService: ProfesorService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  async ngOnInit(): Promise<any> {
    this.profesorDetalle = await this.profesorService.obtenerDetalle(this.user.id);
    console.log(this.profesorDetalle);
  }
}
