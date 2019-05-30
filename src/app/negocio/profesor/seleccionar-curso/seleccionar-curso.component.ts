import { Component, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Formulario } from '@shared/formulario/formulario';

import { Escuela } from '../../administrador/profesores/profesores.component';

@Component({
  selector: 'app-seleccionar-curso',
  templateUrl: './seleccionar-curso.component.html',
  styleUrls: ['./seleccionar-curso.component.scss']
})
export class SeleccionarCursoComponent extends Formulario {
  cursosSeleccionados = new EventEmitter<any>();
  cursos = [
    { value: 0, viewValue: 'Arquitectura de Software' },
    { value: 1, viewValue: 'Diseño de Software' },
    { value: 2, viewValue: 'Calidad de Software' },
    { value: 3, viewValue: 'Base de Datos 1' },
    { value: 4, viewValue: 'Base de Datos 2' },
    { value: 5, viewValue: 'Teoria General de Sistemas' },
    { value: 6, viewValue: 'Programación 1' },
    { value: 7, viewValue: 'Programación 2' },
    { value: 8, viewValue: 'Redes Neuronales' },
    { value: 9, viewValue: 'Planeamiento de Recursos Empresariales' },
    { value: 10, viewValue: 'Estructura de Datos 1' },
    { value: 11, viewValue: 'Estructura de Datos 2' },
    { value: 12, viewValue: 'Sistemas Inteligentes' },
    { value: 13, viewValue: 'Inteligencia Artificial' }
  ];
  escuelas = [
    { value: 0, viewValue: Escuela.Sistemas },
    { value: 1, viewValue: Escuela.Software }
  ];
  constructor() {
    super([
      { name: 'curso1', validators: [Validators.required] },
      { name: 'curso2', validators: [Validators.required] },
      { name: 'curso3', validators: [Validators.required] },
      { name: 'curso4', validators: [Validators.required] },
      { name: 'escuela1', validators: [Validators.required] },
      { name: 'escuela2', validators: [Validators.required] },
      { name: 'escuela3', validators: [Validators.required] },
      { name: 'escuela4', validators: [Validators.required] }
    ]);

    this.formGroup.valueChanges.subscribe(
      result => {
        console.log(result);
      }
    );
    this.formGroup.statusChanges.subscribe(
      result => {
        console.log(result);
        if (result === 'VALID') {
          this.cursosSeleccionados.emit(this.formGroup.value);
        }
      }
    );
  }
}
