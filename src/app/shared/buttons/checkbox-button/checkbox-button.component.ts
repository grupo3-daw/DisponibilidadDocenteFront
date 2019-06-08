import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { MyButtonComponent } from '../button/button.class';

@Component({
  selector: 'app-checkbox-button',
  templateUrl: './checkbox-button.component.html',
  styleUrls: ['./checkbox-button.component.scss']
})
export class CheckboxButtonComponent extends MyButtonComponent implements OnInit, AfterViewChecked {
  @Input() checked: boolean;
  constructor(private changeDetector: ChangeDetectorRef) {
    super();

    this.checked = false;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  click(data: { id: string, event: MatCheckboxChange }) {

    this.clickEvent.emit(
      {
        id: {
          id: data.id,
          data: data.event.checked
        },
        data: this.row
      }
    );
  }

}
