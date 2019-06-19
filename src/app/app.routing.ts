import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

import { AutenticacionGuard } from './guards/autenticacion.guard';

export const routes: Routes = [
         {path: '', redirectTo: 'auth', pathMatch: 'full'},
         {path: 'auth', loadChildren: './negocio/auth/auth.module#AuthModule'},
         {
           path: 'administrador',
           loadChildren: './negocio/administrador/administrador.module#AdministradorModule',
           canActivate: [AutenticacionGuard]
         },
         {
           path: 'profesor',
           loadChildren: './negocio/profesor/profesor.module#ProfesorModule',
           canActivate: [AutenticacionGuard]
         },
         {path: '**', redirectTo: 'auth'}
       ];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
