import { Component, Input } from '@angular/core';

import { ProfesorDetalle } from '../profesor';

@Component({
  selector: 'app-informacion-perfil',
  templateUrl: './informacion-perfil.component.html',
  styleUrls: ['./informacion-perfil.component.scss']
})
export class InformacionPerfilComponent {
  horas: number;
  @Input()
  set perfil(profesor: ProfesorDetalle) {
    let horas = 0;
    if (profesor.disponibilidades) {
      profesor.disponibilidades.forEach(
        disponibilidad => horas += disponibilidad.horas.split(',').length
      );
    }
    this.horas = horas;
    this._perfil = profesor;
  }
  get perfil(): ProfesorDetalle {
    return this._perfil;
  }
  private _perfil: ProfesorDetalle;

}
