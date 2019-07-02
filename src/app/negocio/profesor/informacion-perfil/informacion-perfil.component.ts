import { Component, Input } from '@angular/core';

import { Profesor } from '../profesor';

@Component({
  selector: 'app-informacion-perfil',
  templateUrl: './informacion-perfil.component.html',
  styleUrls: ['./informacion-perfil.component.scss']
})
export class InformacionPerfilComponent {
  horas: number;
  @Input()
  set perfil(profesor: Profesor) {
    let horas = 0;
    if (profesor.disponibilidad) {
      profesor.disponibilidad.forEach(
        disponibilidad => horas += disponibilidad.horas.split(',').length
      );
    }
    this.horas = horas;
    this._perfil = profesor;
  }
  get perfil(): Profesor {
    return this._perfil;
  }
  private _perfil: Profesor;

}
