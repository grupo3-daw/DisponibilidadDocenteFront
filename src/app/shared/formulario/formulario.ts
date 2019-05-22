import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ControlForm } from './control';

export class Formulario {
  formGroup: FormGroup;
  constructor(public controles: Array<ControlForm>) {
    const _formBuilder: FormBuilder = new FormBuilder();
    this.formGroup = _formBuilder.group({});
    controles.forEach(control => {
      this.addControl(control);
    });
  }

  getControl(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(name: string): string {
    return (
      this.controles.find(control => control.name === name).error ||
      'Este campo es requerido'
    );
  }

  addControl(control: ControlForm): void {
    if (this.controles.findIndex(_control => _control === control) === -1) {
      this.controles.push(control);
    }
    switch (control.validators.length) {
      case 0:
        this.formGroup.addControl(control.name, new FormControl(control.value));
        break;
      case 1:
        this.formGroup.addControl(
          control.name,
          new FormControl(control.value, control.validators[0])
        );
        break;
      default:
        this.formGroup.addControl(
          control.name,
          new FormControl(control.value, control.validators)
        );
        break;
    }
  }
}
