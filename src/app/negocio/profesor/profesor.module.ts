import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFormsModule } from '@material';

import { LayoutProfesorComponent } from './layout/layout.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { DisponibilidadSemanalComponent } from './disponibilidad-semanal/disponibilidad-semanal.component';
import { ToolbarSharedModule } from '@shared/toolbar/toolbar.module';

@NgModule({
  declarations: [LayoutProfesorComponent, DisponibilidadSemanalComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProfesorRoutingModule,
    MaterialFormsModule,
    ToolbarSharedModule
  ],
  exports: [DisponibilidadSemanalComponent]
})
export class ProfesorModule {}
