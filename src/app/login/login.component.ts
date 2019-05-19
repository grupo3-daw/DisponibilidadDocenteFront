import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  hide = true;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(): AbstractControl {
    return this.login.get('email');
  }

  get password(): AbstractControl {
    return this.login.get('password');
  }

  getErrorMessage(control: AbstractControl): string {
    const errors = control.errors;

    switch (Object.keys(errors)[0]) {
      case 'email':
        return 'Correo invalido';
      case 'required':
        return 'Este campo es requerido';
      default: return '' ;
    }
  }

  onSubmit(): void {
    if (this.login.valid) {
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
