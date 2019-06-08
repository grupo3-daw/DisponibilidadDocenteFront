import { Component } from '@angular/core';

import { MyButtonComponent } from './button.class';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends MyButtonComponent {

  constructor() {
    super();
  }

}
