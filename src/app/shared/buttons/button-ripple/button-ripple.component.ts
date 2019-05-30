import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-button-ripple',
  templateUrl: './button-ripple.component.html',
  styleUrls: ['./button-ripple.component.scss']
})
export class ButtonRippleComponent implements OnInit {
  @Input() disabled = false
  @Input() icono: string
  @Input() color = '#0099db'
  @Input() descripcion = ''
  @Input()
  get tamanio(): number {
    return this._tamanio
  }
  set tamanio($tamanio: number) {
    this._tamanio = $tamanio
    this.tamanio_icon = $tamanio - 5
  }
  @Input() tipo = 'px'
  @Output() click_event = new EventEmitter<any>()
  private _tamanio = 25
  tamanio_icon = 20
  constructor() {}

  ngOnInit() {}
}
