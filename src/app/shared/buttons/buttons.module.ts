import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialFormsModule } from '@shared/material';

import { ButtonRippleComponent } from './button-ripple/button-ripple.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxButtonComponent } from './checkbox-button/checkbox-button.component';
import { ComprimedButtonsComponent } from './comprimed-buttons/comprimed-buttons.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { GroupButtonsComponent } from './group-buttons/group-buttons.component';
import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialFormsModule
  ],
  declarations: [
    FabButtonComponent,
    ButtonComponent, IconButtonComponent, GroupButtonsComponent, CheckboxButtonComponent, ComprimedButtonsComponent, ButtonRippleComponent],
  exports: [
    FabButtonComponent,
    ButtonComponent, IconButtonComponent, GroupButtonsComponent, CheckboxButtonComponent, ComprimedButtonsComponent, ButtonRippleComponent
  ]
})
export class ButtonsModule { }
