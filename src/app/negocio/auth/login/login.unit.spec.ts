import { Validators } from '@angular/forms';
import { Formulario } from '@shared/formulario/formulario';

// tslint:disable
describe('Login Formulario', () => {
  let component: Formulario;

  beforeEach(() => {
    component = new Formulario([
      { name: 'id', validators: [Validators.required] },
      { name: 'password', validators: [Validators.required] }
    ]);
  });

  it('Debe crear un login con dos campos ', () => {
    expect(component.formGroup.contains('id')).toBeTruthy();
    expect(component.formGroup.contains('password')).toBeTruthy();
  });

  it('El id debe ser obligatorio', () => {
    const control = component.formGroup.get('id');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('El password debe ser obligatorio', () => {
    const control = component.formGroup.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
});
