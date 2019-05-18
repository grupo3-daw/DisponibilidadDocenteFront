import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  get email() {
    return this.login.get("email");
  }

  get password() {
    return this.login.get("password");
  }

  getErrorMessage(control: AbstractControl): string {
    const errors = control.errors;

    switch (Object.keys(errors)[0]) {
      case "email":
        return "Correo invalido";
      case "required":
        return "Este campo es requerido";
    }

    return ""; // TODO: no hay mensaje de error para tal tipo
  }

  onSubmit() {
    if (this.login.valid) {
      console.log("Ingreso");

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
