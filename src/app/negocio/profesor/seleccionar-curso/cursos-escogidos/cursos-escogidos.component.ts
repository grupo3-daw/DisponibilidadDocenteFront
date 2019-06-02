import { Component, OnInit } from '@angular/core';
import { TypeButton } from '@shared/buttons/type-button.enum';
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
export class CursosEscogidosComponent extends MatTablePadre<CursoSeleccionados> implements OnInit {
  constructor() {
    super()
    this.displayedColumns = [
      { header: 'Escuela', columna: 'escuela' },
      { header: 'Curso', columna: 'curso' }
    ]
    this.buttons = [
      {
        id: 'remove',
        class: '',
        titulo: '',
        tooltipTitulo: 'Eliminar',
        imagen: 'remove',
        toolTipPosition: 'above',
        type: TypeButton.Icon,
        disabled: false,
        mostrar: () => false
      }
    ]
  }

  ngOnInit(): void { }
}

