import { Component, OnInit } from '@angular/core';
import { MyButton } from '../button/button.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends MyButton implements OnInit {

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
