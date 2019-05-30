import { Component, OnInit, Input } from '@angular/core';
import { MyButtonInterface } from '../button/button.interface';
import { MyButton } from '../button/button.class';
import { TypeButton } from '../type-button.enum';

@Component( {
  selector: 'app-group-buttons',
  templateUrl: './group-buttons.component.html',
  styleUrls: [ './group-buttons.component.scss' ]
} )
export class GroupButtonsComponent extends MyButton implements OnInit
{
  @Input() buttons: MyButtonInterface[];
  typeButton = TypeButton;
  constructor ()
  {
    super();
  }

  ngOnInit ()
  {

  }

  click ( data )
  {

    this.clickEvent.emit( data );
  }

}
