import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Formulario } from '@shared/formulario/formulario';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Formulario {
  hide = true;

  constructor(private readonly loginService: LoginService) {
    super([
      { name: 'email', validators: [Validators.required, Validators.email] },
      { name: 'password', validators: [Validators.required] }
    ]);
    localStorage.clear()
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value);
    }
  }
}
