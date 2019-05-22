import { Component, OnInit } from '@angular/core';
import { MatTablePadre } from '@shared/tables';

export interface Profesor {
  nombre: string;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent extends MatTablePadre<Profesor>
  implements OnInit {
  displayedColumns = [
    {
      header: 'Activar/Desactivar',
      columna: 'acciones'
    },
    {
      header: 'Nombre',
      columna: 'nombre'
    }
  ];
  profesores = [
    {
      nombre: 'Alarcon'
    },
    {
      nombre: 'Machado'
    },
    {
      nombre: 'Bartra'
    }
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
