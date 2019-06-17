import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

import { MyButton } from './button.interface';

export class MyButtonComponent implements OnInit {
  @Input() data: MyButton = new MyButton('');
  @Input() row: any = undefined;
  @Output() readonly clickEvent: EventEmitter<any>;
  positionOptions: Array<TooltipPosition> = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right'
  ];
  position = new FormControl(this.positionOptions[0]);
  constructor() {
    this.clickEvent = new EventEmitter<any>();
  }

  ngOnInit(): void {
    if (this.data.toolTipPosition !== undefined) {
      this.position = new FormControl(this.data.toolTipPosition);
    }
  }

  click(data): void {
    this.clickEvent.emit({
      id: data,
      data: this.row
    });
  }
}
