import { Component } from '@angular/core';
import { IconButton } from '@shared/buttons';
import { MatTablePadre } from '@shared/tables';

export interface CursoSeleccionados {
  id: number;
  escuela: string;
  curso: string;
}

@Component({
  selector: 'app-cursos-escogidos',
  templateUrl: './cursos-escogidos.component.html',
  styleUrls: ['./cursos-escogidos.component.scss']
})
export class CursosEscogidosComponent extends MatTablePadre<CursoSeleccionados>  {
  constructor() {
    super();
    this.displayedColumns = [
      { header: 'Escuela', columna: 'escuela' },
      { header: 'Curso', columna: 'curso' }
    ];
    this.buttons = [
      new IconButton('remove', 'Eliminar', 'remove')
    ];
  }

}
