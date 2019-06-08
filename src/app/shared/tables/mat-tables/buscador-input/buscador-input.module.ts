import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialFormsModule } from '@shared/material';

import { BuscadorInputComponent } from './buscador-input.component';

@NgModule({
  imports: [CommonModule, MaterialFormsModule],
  declarations: [BuscadorInputComponent],
  exports: [BuscadorInputComponent]
})
export class BuscadorInputModule {}
