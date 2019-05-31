import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formulario } from '@shared/formulario/formulario';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Formulario {
  hide = true;

  constructor(public loginService: LoginService, public router: Router) {
    super([
      { name: 'id', validators: [Validators.required, Validators.email] },
      { name: 'password', validators: [Validators.required] }
    ]);
  }

  onSubmit(): void {
    // this.loginService.onSubmit(this.formGroup);
    if (this.formGroup.valid) {
      this.router
        .navigate(['profesor'])
        .then()
        .catch();
    }
  }
}
