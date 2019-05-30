import { MyButtonInterface } from './button.interface'
import { Input, Output, EventEmitter } from '@angular/core'
import { TooltipPosition } from '@angular/material'
import { FormControl } from '@angular/forms'

export class MyButton {
  @Input() data: MyButtonInterface
  @Input() row: any = null
  @Output() clickEvent: EventEmitter<any>
  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right'
  ]
  position = new FormControl(this.positionOptions[0])
  constructor() {
    this.clickEvent = new EventEmitter<any>()
  }

  click(data) {
    this.clickEvent.emit({
      id: data,
      data: this.row
    })
  }
}
