import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@negocio/usuario';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';

export interface LoginOutput {
  access_token: string;
  token_type: string;
  expires_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly api: ApiService,
    private readonly userService: UsuarioService,
    private readonly router: Router
  ) {}

  async login(form: {email: string; contrasena: string}): Promise<void> {
    const res = await this.api.operacion<LoginOutput>('auth/login', Consulta.POST, form);
    localStorage.setItem('token', `${res.token_type} ${res.access_token}`);
    let ruta = 'administrador';
    this.userService
      .obtenerUsuario()
      .then(usuario => {
        if (usuario.role_id !== 1) {
          ruta = 'profesor';
        }
        localStorage.setItem('user', JSON.stringify(usuario));
        this.router
          .navigate([ruta])
          .then(route => {
            console.log(route);
          })
          .catch();
      })
      .catch();

  }
}
