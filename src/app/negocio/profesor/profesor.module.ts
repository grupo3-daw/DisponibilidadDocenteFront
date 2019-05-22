import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFormsModule } from '@material';

import { LayoutProfesorComponent } from './layout/layout.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { DisponibilidadSemanalComponent } from './disponibilidad-semanal/disponibilidad-semanal.component';

@NgModule({
  declarations: [LayoutProfesorComponent, DisponibilidadSemanalComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProfesorRoutingModule,
    MaterialFormsModule
  ],
  exports: [DisponibilidadSemanalComponent]
})
export class ProfesorModule {}
