import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador, isAdministrador } from '@negocio/administrador/administrador';
import { isProfesor, Profesor } from '@negocio/profesor/profesor';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  async onSubmit(form: { email: string, contrasena: string }): Promise<boolean> {
    const res = await this.api.operacion<Profesor | Administrador>('usuarios/login', Consulta.POST, form);
    let ruta = 'profesor';
    console.log(res);
    console.log(isAdministrador(res));
    console.log(isProfesor(res));
    if (isAdministrador(res)) {
      ruta = 'administrador';
    }
    localStorage.setItem('user', JSON.stringify(res));

    return this.router.navigate([ruta]);
  }

}
