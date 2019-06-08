import { Component } from '@angular/core';

import { MyButtonComponent } from '../button/button.class';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent extends MyButtonComponent {

  constructor() {
    super();
  }

}
