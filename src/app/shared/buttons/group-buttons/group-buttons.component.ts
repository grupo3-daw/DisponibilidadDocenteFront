import { Component, Input } from '@angular/core';

import { MyButtonComponent } from '../button/button.class';
import { MyButton } from '../button/button.interface';
import { TypeButton } from '../type-button.enum';

@Component({
  selector: 'app-group-buttons',
  templateUrl: './group-buttons.component.html',
  styleUrls: ['./group-buttons.component.scss']
})
export class GroupButtonsComponent extends MyButtonComponent {
  @Input() buttons: MyButton[];
  typeButton = TypeButton;
  constructor() {
    super();
  }

  click(data) {

    this.clickEvent.emit(data);
  }

}
