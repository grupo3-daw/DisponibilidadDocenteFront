import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from '@negocio/administrador/administrador';
import { Profesor } from '@negocio/profesor/profesor';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';

export interface AdminstradorLogin {
  administrador: Administrador;
}

export interface ProfesorLogin {
  profesor: Profesor;
}

export function isProfesorLogin(usuario: ProfesorLogin | AdminstradorLogin): usuario is ProfesorLogin {
  return (usuario as ProfesorLogin).profesor !== undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  async onSubmit(form: { email: string, contrasena: string }): Promise<boolean> {
    const res = await this.api.operacion<ProfesorLogin | AdminstradorLogin>('login', Consulta.POST, form);
    let ruta = 'administrador';
    if (isProfesorLogin(res)) {
      ruta = 'profesor';
      localStorage.setItem('user', JSON.stringify(res.profesor));
    } else {
      localStorage.setItem('user', JSON.stringify(res.administrador));
    }

    return this.router.navigate([ruta]);
  }

}
