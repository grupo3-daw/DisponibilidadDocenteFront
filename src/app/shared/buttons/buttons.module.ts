import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { FormsModule } from '@angular/forms';
import { GroupButtonsComponent } from './group-buttons/group-buttons.component';
import { CheckboxButtonComponent } from './checkbox-button/checkbox-button.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { MaterialModule } from '@material';
import { ComprimedButtonsComponent } from './comprimed-buttons/comprimed-buttons.component';
import { ButtonRippleComponent } from './button-ripple/button-ripple.component';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    FabButtonComponent,
    ButtonComponent, IconButtonComponent, GroupButtonsComponent, CheckboxButtonComponent, ComprimedButtonsComponent, ButtonRippleComponent ],
  exports: [
    FabButtonComponent,
    ButtonComponent, IconButtonComponent, GroupButtonsComponent, CheckboxButtonComponent, ComprimedButtonsComponent, ButtonRippleComponent
  ]
} )
export class ButtonsModule { }
