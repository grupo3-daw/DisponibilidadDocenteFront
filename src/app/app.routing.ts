import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent },
  {
    path: 'administrador',
    loadChildren:
      './negocio/administrador/administrador.module#AdministradorModule'
  },
  {
    path: 'profesor',
    loadChildren: './negocio/profesor/profesor.module#ProfesorModule'
  },
  { path: '**', redirectTo: 'auth' }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
