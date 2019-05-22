import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutProfesorComponent } from './layout/layout.component';

const routes: Routes = [{ path: '', component: LayoutProfesorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule {}
