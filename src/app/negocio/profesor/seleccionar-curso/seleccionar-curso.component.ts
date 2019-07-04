import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Escuela } from '@negocio/administrador/profesores/profesores.component';
import { Curso, CursoService } from '@negocio/cursos';
import { Formulario } from '@shared/formulario/formulario';

import { EstadoDisponibilidad } from '../disponibilidad-semanal/estado-disponibilidad.enum';
import { CursoSeleccionado } from './cursos-escogidos/cursos-escogidos.component';
import { SeleccionarCursoService } from './seleccionar-curso.service';

export interface RowSelect {
  value: any;
  viewValue: string;
}

export interface EscuelaCurso extends Curso {
  nombreEscuelaCurso: string;
}

function nombreEscuela(row: Curso): string {
  let escuela = Escuela.Sistemas;
  if (row.escuela_id === 1) {
    escuela = Escuela.Software;
  }

  return escuela;
}

@Component({
  selector: 'app-seleccionar-curso',
  templateUrl: './seleccionar-curso.component.html',
  styleUrls: ['./seleccionar-curso.component.scss']
})
export class SeleccionarCursoComponent extends Formulario implements OnInit {
  @Input() cursosEscogidos: Array<Curso>;
  @Input() permiso: number;
  estado = EstadoDisponibilidad;
  cursosSeleccionados: Array<CursoSeleccionado>;
  escuelasCursos: Array<EscuelaCurso> = [];
  searchValue = '';
  valido = true;
  temp = [];
  constructor(
    private readonly cursoService: CursoService,
    private readonly seleccionarCurso: SeleccionarCursoService
  ) {
    super([{ name: 'cursos', validators: [Validators.required] }]);
    this.formGroup.valueChanges.subscribe(result => {
      console.log(result);
      this.actualizarCursosSeleccionados(result.cursos);
    });
  }

  async ngOnInit(): Promise<any> {


    if (
      this.permiso === EstadoDisponibilidad.SOLICITAR ||
      this.permiso === EstadoDisponibilidad.EDITAR ||
      this.permiso === EstadoDisponibilidad.RECHAZADO
    ) {
      this.cursosSeleccionados = this.cursosEscogidos.map(row => {
        const escuela = nombreEscuela(row);

        return { ...row, escuela, curso: row.nombrecurso };
      });
      if (this.permiso === EstadoDisponibilidad.EDITAR) {
        await this.llenarSelectEscuelasCursos();
      }
    } else {
      await this.llenarSelectEscuelasCursos();
    }

    this.formGroup.setValue({ cursos: this.cursosSeleccionados.map(curso => curso.id) });
  }

  buscar(value: string): void {
    this.escuelasCursos = this.temp.filter(item =>
      item.viewValue.toUpperCase().includes(value.toUpperCase())
    );
  }

  selectChange(event): void {
    event.length > 3 ? (this.valido = false) : (this.valido = true);
  }

  private actualizarCursosSeleccionados(identificadores: Array<number>): void {
    if (this.permiso === EstadoDisponibilidad.EDITAR || this.permiso === EstadoDisponibilidad.REGISTRAR) {
      const filtrado = this.escuelasCursos.filter(
        escuelaCurso =>
          identificadores.findIndex(identificador => escuelaCurso.id === identificador) !== -1
      );
      this.cursosSeleccionados = filtrado.map(row => {
        const separado = row.nombreEscuelaCurso.split('|');

        return { ...row, escuela: separado[0], curso: separado[1] };
      });
      this.seleccionarCurso.cursosSeleccionadosEvento.emit(this.cursosSeleccionados);
    }

  }

  private async llenarSelectEscuelasCursos(): Promise<void> {
    const cursos = await this.cursoService.listarCursos();
    this.escuelasCursos = cursos.map(curso => {
      const escuela = nombreEscuela(curso);

      return { ...curso, nombreEscuelaCurso: `${escuela} |  ${curso.nombrecurso}` }
    });
    this.temp = this.escuelasCursos;
  }
}
