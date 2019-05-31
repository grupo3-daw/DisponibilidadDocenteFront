import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@material';
import { ModalsModule } from '@shared/modals/modals.module';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, ModalsModule],
  exports: [ToolbarComponent],
  providers: []
})
export class ToolbarSharedModule { }
