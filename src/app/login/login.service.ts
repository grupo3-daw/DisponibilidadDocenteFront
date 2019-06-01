import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';
import { UsuarioService } from '@shared/services/usuario';

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
  ) { }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.api
        .operacion('auth/login', Consulta.POST, form.value)
        .then((res: LoginOutput) => {
          let ruta = 'administrador';
          localStorage.setItem('token', `${res.token_type} ${res.access_token}`);
          this.userService.obtenerUsuario()
            .then(
              usuario => {
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
              }
            )
            .catch()
        })
        .catch();
    }
  }
}
