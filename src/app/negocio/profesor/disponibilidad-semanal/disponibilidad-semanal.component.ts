import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Disponibilidad, ProfesorDetalle } from '../profesor';
import { SeleccionarCursoService } from '../seleccionar-curso/seleccionar-curso.service';
import { ProfesorService } from '../services/profesor.service';
import { DiaLaborable } from './dia-laborable.type';
import { EstadoDisponibilidad } from './estado-disponibilidad.enum';
import { EstadoHoras } from './estado-horas.enum';
import { SemanaLaborable, toStringDia } from './semana-laborable';

@Component({
  selector: 'app-disponibilidad-semanal',
  templateUrl: './disponibilidad-semanal.component.html',
  styleUrls: ['./disponibilidad-semanal.component.scss']
})
export class DisponibilidadSemanalComponent implements OnInit {
  @Input() profesor: ProfesorDetalle;
  estado = EstadoDisponibilidad;
  abriendoPopUp = false;
  horas = 0;
  estadoDisponibilidad: EstadoDisponibilidad;
  diasNoSeleccionados = true;
  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<SemanaLaborable>;

  constructor(
    private readonly seleccionarCursoService: SeleccionarCursoService,
    private readonly profesorService: ProfesorService
  ) {
    this.displayedColumns = [
      'horaRango',
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado'
    ];
    this.dataSource = new MatTableDataSource<SemanaLaborable>([
      new SemanaLaborable(8),
      new SemanaLaborable(9),
      new SemanaLaborable(10),
      new SemanaLaborable(11),
      new SemanaLaborable(12),
      new SemanaLaborable(13),
      new SemanaLaborable(14),
      new SemanaLaborable(15),
      new SemanaLaborable(16),
      new SemanaLaborable(17),
      new SemanaLaborable(18),
      new SemanaLaborable(19),
      new SemanaLaborable(20),
      new SemanaLaborable(21)
    ]);
    this.seleccionarCursoService.cursosSeleccionadosEvento.subscribe(
      res => {
        this.profesor.cursos = res.map(
          curso => {
            return { IDCURSO: curso.id, NOMBRECURSO: curso.curso }
          });
      }
    );
    this.profesorService.exitoEnProceso.subscribe(
      (estado: EstadoDisponibilidad) => { this.abriendoPopUp = false; this.estadoDisponibilidad = estado; }
    );
  }

  ngOnInit(): void {
    this.inicializarDisponibilidad(this.profesor.disponibilidad, 0);
  }

  inicializarDisponibilidad(disponibilidad: Array<Disponibilidad>, permiso: number): void {
    disponibilidad.forEach(element => {
      const horas = element.HORAS.split(',');
      horas.forEach(hora => {
        const indice = this.dataSource.data.findIndex(semanaLaborable => semanaLaborable.hora === parseInt(hora, 10));
        const dia = toStringDia(element.DIA);
        this.horas++;
        this.dataSource.data[indice][dia] = true;
      });
      if (this.horas === 0) {
        this.estadoDisponibilidad = EstadoDisponibilidad.REGISTRAR;
      } else {
        this.diasNoSeleccionados = false;
        this.estadoDisponibilidad = permiso === 0 ?
          (
            this.profesor.solicitud === null ?
              EstadoDisponibilidad.SOLICITAR : EstadoDisponibilidad.PROCESANDO_SOLICITUD
          ) : EstadoDisponibilidad.EDITAR;
      }
    });
  }

  masterToggle(dia: DiaLaborable): void {
    let anterior: EstadoHoras = 0;
    for (let index = 0; index < this.dataSource.data.length; index++) {
      const resultado = this.actualizarDisponibilidad(dia, index);
      if (
        resultado === EstadoHoras.Fin ||
        (anterior !== EstadoHoras.Fin && resultado !== anterior)
      ) {
        switch (resultado) {
          case EstadoHoras.Agregando:
            this.horas++;
            this.dataSource.data[index][dia] = true;
            break;
          case EstadoHoras.Disminuyendo:
            this.horas--;
            this.dataSource.data[index][dia] = false;
            break;
          default:
            break;
        }
        index = this.dataSource.data.length;
      } else {
        anterior = resultado;
      }
    }
  }

  desactivarHeader(dia: DiaLaborable): boolean {
    return (
      !this.tieneElementosSeleccionados(dia) && this.horas >= this.profesor.horas_maximas
    )
      || this.estadoDisponibilidad === EstadoDisponibilidad.SOLICITAR
      || this.estadoDisponibilidad === EstadoDisponibilidad.PROCESANDO_SOLICITUD;
  }

  desactivarCelda(element, dia: DiaLaborable): boolean {
    return (!element[dia] && this.horas >= this.profesor.horas_maximas)
      || this.estadoDisponibilidad === EstadoDisponibilidad.SOLICITAR
      || this.estadoDisponibilidad === EstadoDisponibilidad.PROCESANDO_SOLICITUD;
  }

  isAllSelected(dia: DiaLaborable): boolean {
    let seleccionados = 0;
    this.dataSource.data.map(row => {
      if (row[dia]) {
        seleccionados++;
      }
    });

    return seleccionados === this.dataSource.data.length;
  }

  tieneElementosSeleccionados(dia: DiaLaborable): boolean {
    return this.dataSource.data.findIndex(row => row[dia]) > -1;
  }

  actualizarDisponibilidad(dia: DiaLaborable, numeroFila: number): EstadoHoras {
    if (this.dataSource.data[numeroFila][dia]) {
      this.horas--;
      if (this.horas < this.profesor.horas_minimas) {
        this.diasNoSeleccionados = true;
      }
      this.dataSource.data[numeroFila][dia] = false;

      return EstadoHoras.Disminuyendo;
    }
    if (this.horas < this.profesor.horas_maximas) {
      this.horas++;
      this.dataSource.data[numeroFila][dia] = true;
      if (this.horas >= this.profesor.horas_minimas) {
        this.diasNoSeleccionados = false;
      }

      return EstadoHoras.Agregando;
    }

    return EstadoHoras.Fin;
  }

  openDialog(): void {
    this.abriendoPopUp = true;
  }

}
