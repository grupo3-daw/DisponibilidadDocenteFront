import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatTablePadre } from './mat-table-padre';

export const tableAnimations = [
  trigger('agregar_eliminar', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
      query(
        ':enter',
        [
          style({opacity: 0, width: '0px'}),
          stagger(50, [animate('500ms ease-out', style({opacity: 1, width: '*'}))])
        ],
        {optional: true}
      )
    ]),
    transition(':decrement', [
      query(':leave', [
        stagger(50, [animate('300ms ease-out', style({opacity: 0, width: '0px'}))])
      ])
    ])
  ])
];

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
  animations: [tableAnimations]
})
export class MatTableComponent extends MatTablePadre {
  @Input() placeholder = 'Buscar';
  @Input() clase = '';
  @Input() icono: string;
  @Input() buscador = true;
  @Input() comprimedButtons = false;
  @Output() readonly otroEvento = new EventEmitter<any>();
  indiceMostrado: number;
  constructor() {
    super();
  }

  onAnimationEvent(event): void {
    console.log(event);
  }

}
