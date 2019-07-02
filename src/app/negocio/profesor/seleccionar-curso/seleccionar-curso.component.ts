import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CursoService, EscuelaCurso } from '@negocio/cursos';
import { Formulario } from '@shared/formulario/formulario';

import { EstadoDisponibilidad } from '../disponibilidad-semanal/estado-disponibilidad.enum';
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
  @Input() cursosEscogidos: Array<EscuelaCurso>;
  @Input() permiso: number;
  estado = EstadoDisponibilidad;
  estadoDisponibilidad: EstadoDisponibilidad;
  cursosSeleccionados: Array<CursoSeleccionados> = [];
  cursosEscuelas: Array<EscuelaCurso>;
  escuelasCursos: Array<RowSelect> = [];
  searchValue = '';
  valido = true;
  temp = [];
  constructor(
    private readonly cursoService: CursoService,
    private readonly seleccionarCurso: SeleccionarCursoService
  ) {
    super([{name: 'cursos', validators: [Validators.required]}]);
    this.formGroup.valueChanges.subscribe(result => {
      this.actualizarCursosSeleccionados(result.cursos);
    });
  }

  async ngOnInit(): Promise<any> {
    this.estadoDisponibilidad =
      this.cursosEscogidos.length > 0
        ? this.permiso === 0
          ? EstadoDisponibilidad.SOLICITAR
          : EstadoDisponibilidad.EDITAR
        : EstadoDisponibilidad.REGISTRAR;
    this.cursosEscuelas = await this.cursoService.listarCursos();
    this.cursosEscuelas.forEach(cursoEscuela => {
      const escuela = cursoEscuela.escuela.nombre;
      const temp = this.cursosEscogidos.find(
        cursoEscogido => cursoEscogido.curso.idCurso === cursoEscuela.curso.idCurso
      );
      if (temp) {
        this.cursosSeleccionados.push({
          id: cursoEscuela.curso.idCurso,
          escuela,
          curso: cursoEscuela.curso.nombre
        });
      }
      this.escuelasCursos.push({
        value: `${cursoEscuela.curso.idCurso}-${cursoEscuela.escuela.idEscuela}`,
        viewValue: `${escuela} |  ${cursoEscuela.curso.nombre}`
      });
    });
    this.formGroup.setValue({cursos: this.cursosSeleccionados.map(curso => curso.id)});
    this.temp = this.escuelasCursos;
  }

  buscar(value: string): void {
    this.escuelasCursos = this.temp.filter(item =>
      item.viewValue.toUpperCase().includes(value.toUpperCase())
    );
  }

  selectChange(event): void {
    event.length > 3 ? (this.valido = false) : (this.valido = true);
  }

  private actualizarCursosSeleccionados(identificadores: Array<string>): void {
    const filtrado = this.escuelasCursos.filter(
      escuelaCurso =>
        identificadores.findIndex(identificador => escuelaCurso.value === identificador) !== -1
    );
    this.cursosSeleccionados = [];
    filtrado.forEach(row => {
      const separado = row.viewValue.split('|');
      this.cursosSeleccionados.push({id: row.value, escuela: separado[0], curso: separado[1]});
    });
    this.seleccionarCurso.cursosSeleccionadosEvento.emit(this.cursosSeleccionados);
  }
}
