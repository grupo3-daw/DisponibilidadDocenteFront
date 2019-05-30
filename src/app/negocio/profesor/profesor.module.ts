import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFormsModule } from '@material';
import { ModalsModule } from '@shared/modals/modals.module';
import { ToolbarSharedModule } from '@shared/toolbar/toolbar.module';

import { DisponibilidadSemanalComponent } from './disponibilidad-semanal/disponibilidad-semanal.component';
import { InformacionPerfilComponent } from './informacion-perfil/informacion-perfil.component';
import { LayoutProfesorComponent } from './layout/layout.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { SeleccionarCursoComponent } from './seleccionar-curso/seleccionar-curso.component';

@NgModule( {
  declarations: [
    LayoutProfesorComponent,
    DisponibilidadSemanalComponent,
    InformacionPerfilComponent,
    SeleccionarCursoComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProfesorRoutingModule,
    MaterialFormsModule,
    ToolbarSharedModule,
    ModalsModule
  ],
  exports: [ DisponibilidadSemanalComponent ]
} )
export class ProfesorModule { }
