import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    const res = await this.api.operacion<{ user: any }>('login', Consulta.POST, form);
    let ruta = 'administrador';
    if (res.user.IDPROFESOR) {
      ruta = 'profesor';
    }
    localStorage.setItem('user', JSON.stringify(res.user));

    return this.router.navigate([ruta]);
  }

}
