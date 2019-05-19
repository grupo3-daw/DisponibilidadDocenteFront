import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { LayoutAdministradorComponent } from './layout/layout.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { CursosComponent } from './cursos/cursos.component';
import { MaterialFormsModule } from '@material';

@NgModule({
  declarations: [LayoutAdministradorComponent, ProfesoresComponent, EscuelasComponent, CursosComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MaterialFormsModule
  ]
})
export class AdministradorModule { }
