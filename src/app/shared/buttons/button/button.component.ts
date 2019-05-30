import { Component, OnInit } from '@angular/core';
import { MyButton } from './button.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends MyButton implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.data.toolTipPosition !== undefined) {
      this.position = new FormControl(this.data.toolTipPosition);
    } else {
      this.position = null;
    }
  }

}
