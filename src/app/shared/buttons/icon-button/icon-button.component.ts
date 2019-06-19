import { Component } from '@angular/core';

import { MyButtonComponent } from '../button/button.class';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends MyButtonComponent  {

  constructor() {
    super();
  }

  

}
