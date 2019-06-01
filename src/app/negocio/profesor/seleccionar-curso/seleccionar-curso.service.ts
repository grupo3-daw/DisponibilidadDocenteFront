import { EventEmitter, Injectable, Output } from '@angular/core';

import { CursoSeleccionados } from './cursos-escogidos/cursos-escogidos.component';

@Injectable({
    providedIn: 'root'
  })
export class SeleccionarCursoService {
  @Output() readonly cursosSeleccionadosEvento = new EventEmitter<Array<CursoSeleccionados>>();
}
