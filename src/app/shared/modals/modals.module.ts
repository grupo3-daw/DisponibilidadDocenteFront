import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material';

import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';

@NgModule({
  declarations: [ModalConfirmacionComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ModalConfirmacionComponent],
  entryComponents: [ModalConfirmacionComponent]
})
export class ModalsModule {}
