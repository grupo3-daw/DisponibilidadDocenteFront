import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MyButton, MyButtonComponent } from '../button';
import { TypeButton } from '../type-button.enum';

export const speedDialFabAnimations = [
  trigger('fabToggler', [
    state('inactive', style({
      transform: 'rotate(0deg)'
    })),
    state('active', style({
      transform: 'rotate(225deg)'
    })),
    transition('* <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
  trigger('speedDialStagger', [
    transition('* => *', [

      query(':enter', style({ opacity: 0 }), { optional: true }),

      query(':enter', stagger('70ms',
        [
          animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            keyframes(
              [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                style({ opacity: 1, transform: 'translateY(0)' }),
              ]
            )
          )
        ]
      ), { optional: true }),

      query(':leave',
        animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0 }),
          ])
        ), { optional: true }
      )

    ])
  ])
];

@Component({
  selector: "app-comprimed-buttons",
  templateUrl: "./comprimed-buttons.component.html",
  styleUrls: ["./comprimed-buttons.component.scss"],
  animations: [
    speedDialFabAnimations
  ]
})
export class ComprimedButtonsComponent extends MyButtonComponent implements OnInit, OnChanges {
  @Input() buttons: MyButton[];
  @Input() hide_buttons = false
  @Output() hide_other_buttons = new EventEmitter<any>()
  buttons_temp = [];
  typeButton = TypeButton;
  fabTogglerState = 'inactive';

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {


    if (changes.hide_buttons && !changes.hide_buttons.isFirstChange()) {


      if (this.hide_buttons) {
        setTimeout(async () => {
          this.hideItems()
        }, 0)
      }
    }
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons_temp = this.buttons
    this.hide_other_buttons.emit()
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons_temp = []
  }

  onToggleFab() {
    this.buttons_temp.length ? this.hideItems() : this.showItems();
  }

  ngOnInit() { }

  click(data) {

    this.clickEvent.emit(data);
  }
}
