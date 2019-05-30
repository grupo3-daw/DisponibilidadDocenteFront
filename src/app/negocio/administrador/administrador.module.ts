import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialFormsModule } from '@material';
import { ModalsModule } from '@shared/modals/modals.module';
import { MaterialTablesModule } from '@shared/tables/mat-tables/material-tables.module';
import { ToolbarSharedModule } from '@shared/toolbar/toolbar.module';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { LayoutAdministradorComponent } from './layout/layout.component';
import { ProfesoresComponent } from './profesores/profesores.component';

@NgModule( {
  declarations: [
    LayoutAdministradorComponent,
    ProfesoresComponent,
    EscuelasComponent,
    CursosComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MaterialFormsModule,
    MaterialTablesModule,
    ModalsModule,
    ToolbarSharedModule
  ]
} )
export class AdministradorModule { }
