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

  constructor(private _loginService: LoginService) {
    super([
      { name: 'id', validators: [Validators.required] },
      { name: 'password', validators: [Validators.required] }
    ]);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      // console.log("Ingreso");
      // this.loading = true
      // this.payLoad = JSON.stringify( this.login.value )
      // this.login_srv
      //   .login( this.login.value )
      //   .then( resultado =>
      //   {
      //     if ( resultado === null )
      //     {
      //       this.loading = false
      //     }
      //   } )
      //   .catch( () =>
      //   {
      //     this.loading = false
      //   } )
    }
  }
}
