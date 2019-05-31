import { Component, EventEmitter, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Escuela } from '@negocio/administrador/profesores/profesores.component';
import { Formulario } from '@shared/formulario/formulario';
import { CursoDetalle, CursoService } from '@shared/services/curso.service';

import { CursoSeleccionados } from './cursos-escogidos/cursos-escogidos.component';

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
  cursosSeleccionadosEvento = new EventEmitter<any>();
  cursosSeleccionados: Array<CursoSeleccionados> = []
  cursos: Array<CursoDetalle>;
  escuelas: Array<RowSelect>;
  escuelasCursos: Array<RowSelect> = [];
  searchValue = '';
  valido = true;
  temp = [];
  constructor(private readonly cursoService: CursoService) {
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
    this.formGroup.statusChanges.subscribe(
      result => {
        console.log(result);
        if (result === 'VALID') {
          this.cursosSeleccionadosEvento.emit(this.formGroup.value);
        }
      }
    );
  }

  async ngOnInit(): Promise<any> {
    this.cursos = await this.cursoService.listarCursos();

    this.cursos.forEach(
      curso => {
        let escuela = Escuela.Sistemas;
        if (curso.IDESCUELA === 3) {
          escuela = Escuela.Software;
        }
        this.escuelasCursos.push(
          {
            value: `${curso.IDESCUELA} - ${curso.IDCURSO}`,
            viewValue: `${escuela} |  ${curso.NOMBRECURSO}`
          }
        );
      }
    );
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
      this.cursosSeleccionados.push({ escuela: separado[0], curso: separado[1] });
    });

  }

}
