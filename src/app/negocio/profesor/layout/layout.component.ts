import { Component, OnInit } from '@angular/core';
import { ProfesorDetalle, ProfesorService } from '@shared/services/profesor.service';
import { Usuario } from '@shared/services/usuario';

; @Component({
  selector: 'app-layout-profesor',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutProfesorComponent implements OnInit {
  user: Usuario;
  profesorDetalle: ProfesorDetalle;
  constructor(
    private readonly profesorService: ProfesorService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  async ngOnInit(): Promise<any> {
    this.profesorDetalle = await this.profesorService.obtenerDetalle(this.user.id);
  }
}
