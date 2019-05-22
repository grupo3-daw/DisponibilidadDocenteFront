import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-buscador-input',
  templateUrl: './buscador-input.component.html',
  styleUrls: ['./buscador-input.component.scss']
})
export class BuscadorInputComponent implements OnInit {
  @Input() placeholder = 'Buscar'
  @Input() filterValue = null
  @Input() clase = ''
  @Input() icono:string
  @Output() buscar: EventEmitter<string> = new EventEmitter<string>();
  @Output() otro_evento = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }

}
