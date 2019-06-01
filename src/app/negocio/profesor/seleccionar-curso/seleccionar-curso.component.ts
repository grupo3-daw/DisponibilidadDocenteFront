import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Escuela } from '@negocio/administrador/profesores/profesores.component';
import { Formulario } from '@shared/formulario/formulario';
import { Curso, CursoService } from '@shared/services/curso';

import { CursoSeleccionados } from './cursos-escogidos/cursos-escogidos.component';
import { SeleccionarCursoService } from './seleccionar-curso.service';

export interface RowSelect {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-seleccionar-curso',
  templateUrl: './seleccionar-curso.component.html',
  styleUrls: ['./seleccionar-curso.component.scss']
})
export class SeleccionarCursoComponent extends Formulario implements OnInit {
  @Input() cursosEscogidos: Array<Curso>;
  cursosSeleccionados: Array<CursoSeleccionados> = []
  cursos: Array<Curso>;
  escuelas: Array<RowSelect>;
  escuelasCursos: Array<RowSelect> = [];
  searchValue = '';
  valido = true;
  temp = [];
  constructor(private readonly cursoService: CursoService, private readonly seleccionarCurso: SeleccionarCursoService) {
    super([
      { name: 'cursos', validators: [Validators.required] }
    ]);
    this.escuelas = [
      { value: 2, viewValue: Escuela.Sistemas },
      { value: 3, viewValue: Escuela.Software }
    ];

    this.formGroup.valueChanges.subscribe(
      result => {
        this.actualizarCursosSeleccionados(result.cursos);
      }
    );
  }

  async ngOnInit(): Promise<any> {
    this.cursos = [
      { IDCURSO: 0, NOMBRECURSO: 'Arquitectura de Software' },
      { IDCURSO: 1, NOMBRECURSO: 'Diseño de Software' },
      { IDCURSO: 2, NOMBRECURSO: 'Calidad de Software' },
      { IDCURSO: 3, NOMBRECURSO: 'Base de Datos 1' },
      { IDCURSO: 4, NOMBRECURSO: 'Base de Datos 2' },
      { IDCURSO: 5, NOMBRECURSO: 'Teoria General de Sistemas' },
      { IDCURSO: 6, NOMBRECURSO: 'Programación 1' },
      { IDCURSO: 7, NOMBRECURSO: 'Programación 2' },
      { IDCURSO: 8, NOMBRECURSO: 'Redes Neuronales' },
      { IDCURSO: 9, NOMBRECURSO: 'Planeamiento de Recursos Empresariales' },
      { IDCURSO: 10, NOMBRECURSO: 'Estructura de Datos 1' },
      { IDCURSO: 11, NOMBRECURSO: 'Estructura de Datos 2' },
      { IDCURSO: 12, NOMBRECURSO: 'Sistemas Inteligentes' },
      { IDCURSO: 13, NOMBRECURSO: 'Inteligencia Artificial' }
    ];
    this.cursos.forEach(
      curso => {
        let escuela = Escuela.Sistemas;
        // if (curso.IDESCUELA === 3) {
        //   escuela = Escuela.Software;
        // }
        if (this.cursosEscogidos) {
          const temp = this.cursosEscogidos.find(cursoEscogido => cursoEscogido.IDCURSO === curso.IDCURSO);
          if (temp) {
            this.cursosSeleccionados.push({ id: curso.IDCURSO, escuela, curso: curso.NOMBRECURSO })
          }
        }

        this.escuelasCursos.push(
          {
            value: curso.IDCURSO,
            viewValue: `${escuela} |  ${curso.NOMBRECURSO}`
          }
        );
      }
    );
    this.formGroup.setValue({ cursos: this.cursosSeleccionados.map(curso => curso.id) });
    this.temp = this.escuelasCursos;
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

  private actualizarCursosSeleccionados(identificadores: Array<string>): void {
    console.log(identificadores);

    const filtrado = this.escuelasCursos.filter(
      escuelaCurso => {
        console.log(escuelaCurso);

        return identificadores.findIndex(identificador => escuelaCurso.value === identificador) !== -1;
      }
    );
    this.cursosSeleccionados = [];
    filtrado.forEach(row => {
      const separado = row.viewValue.split('|');
      this.cursosSeleccionados.push({ id: row.value, escuela: separado[0], curso: separado[1] });
    });
    this.seleccionarCurso.cursosSeleccionadosEvento.emit(this.cursosSeleccionados)
  }

}
