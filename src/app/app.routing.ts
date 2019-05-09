import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/compiler/src/core'
import { LoginComponent } from './login/login.component'
export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'auth', component: LoginComponent },
  { path: '**', redirectTo: 'auth' }]
export const routing: ModuleWithProviders = RouterModule.forRoot( routes, {
  useHash: false
} )
