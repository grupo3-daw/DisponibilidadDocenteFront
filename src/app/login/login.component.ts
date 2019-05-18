import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  hide = true;
  constructor(private _formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  ngOnInit() {}

  private inicializarFormulario() {
    this.login = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  emailValido(): boolean {
    return this.login.get("email").valid;
  }

  emailDirty(): boolean {
    return this.login.get("email").dirty;
  }

  contrasenaValida(): boolean {
    return this.login.get("password").valid;
  }

  getErrorMessage(): string {
    return "Este campo es requerido";
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
