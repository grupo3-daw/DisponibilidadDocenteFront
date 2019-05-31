import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@shared/api/api.service';
import { Consulta } from '@shared/api/consulta.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) {}

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.api
        .operacion('auth/login', Consulta.POST, form.value)
        .then(res => {
          console.log(res);
          this.router
            .navigate(['profesor'])
            .then(route => {
              console.log(route);
            })
            .catch();
        })
        .catch();
    }
  }
}
