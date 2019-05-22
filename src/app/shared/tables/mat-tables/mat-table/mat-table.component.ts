import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterialTableC } from '../material-table-component';
import { trigger, transition, style, stagger, animate,query } from '@angular/animations';

export const tableAnimations = [
  trigger('agregar_eliminar', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
      query(':enter', [
        style({ opacity: 0, width: '0px' }),
        stagger(50, [
          animate('500ms ease-out', style({ opacity: 1, width: '*' })),
        ]),
      ], { optional: true })
    ]),
    transition(':decrement', [
      query(':leave', [
        stagger(50, [
          animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
        ]),
      ])
    ]),
  ])
]
  
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
  animations: [
    tableAnimations
  ]
})
export class MatTableComponent extends MaterialTableC {
  @Input() placeholder = 'Buscar'
  @Input() clase = ''
  @Input() icono:string
  @Input() comprimed_buttons = false
  @Output() otro_evento = new EventEmitter<any>()
  indice_mostrado
  constructor() {
    super();
  }

  clickEvent(data, numeroFila) {
    if (!data.isTrusted) {
      
      this.click_interno.emit({
        numeroFila: numeroFila,
        data: data
      });
    }
  }

  clickExterno(data) {
    if (!data.isTrusted) {
      
      this.click_externo.emit(data);
    }
  }

  editar(row, column) {
    
    this.edit.emit(
      {
        column: column,
        row: row
      })
  }

  hide_other_buttons(indice:number) {
    this.indice_mostrado = indice
  }

  onAnimationEvent ( event: AnimationEvent ) {
    
    console.warn(`Animation Trigger: ${event.animationName}`);

    
    console.warn(`Phase: ${event.eventPhase}`);

    
    console.warn(`Total time: ${event.timeStamp}`);

    
    console.warn(`From: ${event.currentTarget}`);

    
    console.warn(`To: ${event.target}`);

    
    console.warn(`Element: ${event.srcElement}`);
  }

}
