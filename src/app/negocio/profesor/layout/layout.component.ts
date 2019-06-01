import { Component, OnInit } from '@angular/core';
import { ProfesorDetalle, ProfesorService } from '@shared/services/profesor.service';
import { Profesor } from 'app/login/login.service';

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
    this.profesorDetalle = await this.profesorService.obtenerDetalle(this.user.IDPROFESOR);
  }
}
