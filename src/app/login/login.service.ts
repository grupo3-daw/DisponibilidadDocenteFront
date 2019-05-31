import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';

/**
 * @export
 * @var EMAIL: string
 * @var CONTRASENA: string
 */
export interface Usuario {
  EMAIL: string;
  CONTRASENA: string;
}

export interface Administrador extends Usuario{
  IDADMINISTRADOR: number;
  facultad_IDFACULTAD: number;
}

/**
 * @export
 * @extends {Usuario}
 * @var IDPROFESOR: number
 * @var  IDCATEGORIA: number
 * @var   NOMBRE: string
 * @var   APPATERNO: string
 * @var   APMATERNO: string
 * @var   PERMISO: number
 */
export interface Profesor extends Usuario{
  IDPROFESOR: number;
  IDCATEGORIA: number;
  NOMBRE: string;
  APPATERNO: string;
  APMATERNO: string;
  PERMISO: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.api
        .operacion('login', Consulta.POST, form.value)
        .then(res   => {
          let ruta = 'administrador';
          if (res.user.IDPROFESOR) {
            ruta = 'profesor';
          }
          localStorage.setItem('user', JSON.stringify(res.user));
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
}
