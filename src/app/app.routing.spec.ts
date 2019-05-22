import { routes } from './app.routing';
import { LoginComponent } from './login/login.component';

// tslint:disable
describe('Rutas principales', () => {
  it('Debe de existir la ruta por defecto apuntando a login', () => {
    expect(routes).toContain({
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full'
    });
  });
  it('Debe de existir la ruta auth', () => {
    expect(routes).toContain({
      path: 'auth',
      component: LoginComponent
    });
  });
  it('Debe de existir la ruta administrador', () => {
    expect(routes).toContain({
      path: 'administrador',
      loadChildren:
        './negocio/administrador/administrador.module#AdministradorModule'
    });
  });
  it('Debe de existir la ruta profesor', () => {
    expect(routes).toContain({
      path: 'profesor',
      loadChildren: './negocio/profesor/profesor.module#ProfesorModule'
    });
  });
  it('Debe de existir la ruta no valida apuntando a login', () => {
    expect(routes).toContain({
      path: '**',
      redirectTo: 'auth'
    });
  });
});
