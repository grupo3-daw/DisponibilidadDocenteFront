import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Formulario } from '@shared/formulario/formulario';
import {Router} from '@angular/router'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Formulario {
  hide = true;

  constructor(private _loginService: LoginService,private router:Router) {
    super([
      { name: 'id', validators: [Validators.required] },
      { name: 'password', validators: [Validators.required] }
    ]);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.router.navigate(['profesor']);
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
