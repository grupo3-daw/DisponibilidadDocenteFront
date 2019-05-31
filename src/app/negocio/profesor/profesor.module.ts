import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFormsModule } from '@material';
import { ModalsModule } from '@shared/modals/modals.module';
import { MaterialTablesModule } from '@shared/tables/mat-tables/material-tables.module';
import { ToolbarSharedModule } from '@shared/toolbar/toolbar.module';

import { DisponibilidadSemanalComponent } from './disponibilidad-semanal/disponibilidad-semanal.component';
import { InformacionPerfilComponent } from './informacion-perfil/informacion-perfil.component';
import { LayoutProfesorComponent } from './layout/layout.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { CursosEscogidosComponent } from './seleccionar-curso/cursos-escogidos/cursos-escogidos.component';
import { SeleccionarCursoComponent } from './seleccionar-curso/seleccionar-curso.component';

@NgModule( {
  declarations: [
    LayoutProfesorComponent,
    DisponibilidadSemanalComponent,
    InformacionPerfilComponent,
    SeleccionarCursoComponent,
    CursosEscogidosComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProfesorRoutingModule,
    MaterialFormsModule,
    ToolbarSharedModule,
    MaterialTablesModule,
    ModalsModule
  ],
  exports: [ DisponibilidadSemanalComponent ]
} )
export class ProfesorModule { }
