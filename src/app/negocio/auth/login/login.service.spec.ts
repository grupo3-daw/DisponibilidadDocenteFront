import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from '@shared/services/api.service';
import { Dominio } from '@shared/services/url.enum';

import { LoginService } from './login.service';

class FakeRouter {
  navigate(params) { }
}

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let form = {
    email: 'admin@email.com',
    contrasena: 'admin123'
  };
  let service: LoginService;
  let api: ApiService;
  let router;
  let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => key in store ? store[key] : null,
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, ApiService, { provide: Router, useClass: FakeRouter }],
      imports: [HttpClientTestingModule]
    });
    api = TestBed.get(ApiService);
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(api)
      .toBeTruthy();
    expect(service)
      .toBeTruthy();
  });

  it('Deberia loguear al perfil profesor', async(async () => {
    form = {
      email: 'profesorauxiliar@unmsm.edu.pe',
      contrasena: 'profesorauxiliar'
    };
    router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const flag = await service.onSubmit(form);
    expect(flag)
      .toBeTruthy();
    expect(spy)
      .toHaveBeenCalledWith(['profesor']);

  }));

  it('Deberia loguear al perfil administrador', async(async () => {
    form = {
      email: 'admin@email.com',
      contrasena: 'admin123'
    };
    router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const flag = await service.onSubmit(form);
    expect(flag)
      .toBeTruthy();
    expect(spy)
      .toHaveBeenCalledWith(['administrador']);
  }));

  it('Deberia guardar la sesion', async(async () => {
    spyOn(localStorage, 'getItem')
      .and
      .callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and
      .callFake(mockLocalStorage.setItem);
    const flag = await service.onSubmit(form);
    expect(flag)
      .toBeTruthy();
    expect(localStorage.getItem('user'))
      .toContain('EMAIL');
  }));

  it('Deberia de llamar a la funcion correcta', () => {
    httpTestingController = TestBed.get(HttpTestingController);
    service.onSubmit(form);
    const req = httpTestingController.expectOne(`${Dominio.LOCAL}/login`);
    expect(req.request.method)
      .toEqual('POST');
    httpTestingController.verify();
  });

});
