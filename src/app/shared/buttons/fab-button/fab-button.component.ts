import { Component, OnInit } from '@angular/core';
import { MyButton } from '../button/button.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent extends MyButton implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    
    if (this.data.toolTipPosition != undefined) {
      this.position = new FormControl(this.data.toolTipPosition);
    } else {
      this.position = null;
    }

  }

}
