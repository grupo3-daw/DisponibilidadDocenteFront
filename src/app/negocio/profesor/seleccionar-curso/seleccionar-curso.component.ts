import { Component, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Escuela } from '@negocio/administrador/profesores/profesores.component';
import { Formulario } from '@shared/formulario/formulario';

import { CursoSeleccionados } from './cursos-escogidos/cursos-escogidos.component';

export interface RowSelect {
  value: any,
  viewValue: string
}

@Component({
  selector: 'app-seleccionar-curso',
  templateUrl: './seleccionar-curso.component.html',
  styleUrls: ['./seleccionar-curso.component.scss']
})
export class SeleccionarCursoComponent extends Formulario {
  cursosSeleccionadosEvento = new EventEmitter<any>();
  cursosSeleccionados: Array<CursoSeleccionados>= []
  cursos: Array<RowSelect>;
  escuelas: Array<RowSelect>;
  escuelasCursos: Array<RowSelect> = [];
  searchValue = '';
  valido = true;
  temp = []
  constructor() {
    super([
      { name: 'cursos', validators: [Validators.required] }
    ]);
    this.escuelas = [
      { value: 0, viewValue: Escuela.Sistemas },
      { value: 1, viewValue: Escuela.Software }
    ];
    this.cursos = [
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
    this.escuelas.forEach(
      escuela => {
        this.cursos.forEach(
          curso => {
            this.escuelasCursos.push(
              {
                value: `${escuela.value} - ${curso.value}`,
                viewValue: `${escuela.viewValue} |  ${curso.viewValue}`
              }
            );
          }
        );
      }
    );
    this.temp = this.escuelasCursos;
    this.formGroup.valueChanges.subscribe(
      result => {
        this.actualizarCursosSeleccionados(result.cursos);
      }
    );
    this.formGroup.statusChanges.subscribe(
      result => {
        console.log(result);
        if (result === 'VALID') {
          this.cursosSeleccionadosEvento.emit(this.formGroup.value);
        }
      }
    );
  }

  buscar(value: string): void {
    this.escuelasCursos = this.temp.filter(
      item => item.viewValue.toUpperCase()
        .includes(value.toUpperCase())
    );
  }

  selectChange(event): void {
    event.length > 3 ? this.valido = false : this.valido = true;
  }

  private actualizarCursosSeleccionados(identificadores:Array<string>): void {
    console.log(identificadores);

    const filtrado = this.escuelasCursos.filter(
      escuelaCurso => {
        console.log(escuelaCurso);

        return identificadores.findIndex( identificador => escuelaCurso.value === identificador) !== -1}
    );
    this.cursosSeleccionados = []
    filtrado.forEach( row => {
      const separado = row.viewValue.split('|')
      this.cursosSeleccionados.push({ escuela:separado[0], curso: separado[1]})
    })


  }

}
