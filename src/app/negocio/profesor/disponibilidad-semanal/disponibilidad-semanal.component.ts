import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Curso } from '@shared/services/curso';
import { ProfesorService } from '@shared/services/profesor.service';

import { SeleccionarCursoService } from '../seleccionar-curso/seleccionar-curso.service';
import { DiaLaborable } from './dia-laborable.type';
import { EstadoDisponibilidad } from './estado-disponibilidad.enum';
import { EstadoHoras } from './estado-horas.enum';
import { DiaLaborableEnum, SemanaLaborable } from './semana-laborable';

export interface Disponibilidad {
  DIA: number;
  HORAS: string;
}

@Component({
  selector: 'app-disponibilidad-semanal',
  templateUrl: './disponibilidad-semanal.component.html',
  styleUrls: ['./disponibilidad-semanal.component.scss']
})
export class DisponibilidadSemanalComponent implements OnInit {
  @Input() cursosSeleccionados: Array<Curso>;
  @Input() disponibilidadHoraria: Array<Disponibilidad>;
  @Input() minimo: number;
  @Input() maximo: number;
  @Input() id: number;
  @Input() permiso: number;
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
        this.cursosSeleccionados = res.map(
          curso => {
            return { IDCURSO: curso.id, NOMBRECURSO: curso.curso }
          });
      }
    );
    this.profesorService.envioSolicitud.subscribe(
      res => this.abriendoPopUp = res
    );
  }

  ngOnInit(): void {
    this.inicializarDisponibilidad(this.disponibilidadHoraria, this.permiso);
  }

  toStringDia(dia: DiaLaborableEnum): DiaLaborable {
    switch (dia) {
      case DiaLaborableEnum.LUNES: return 'lunes';
      case DiaLaborableEnum.MARTES: return 'martes';
      case DiaLaborableEnum.MIERCOLES: return 'miercoles';
      case DiaLaborableEnum.JUEVES: return 'jueves';
      case DiaLaborableEnum.VIERNES: return 'viernes';
      default:
        return 'sabado';
    }
  }

  inicializarDisponibilidad(disponibilidad: Array<Disponibilidad>, permiso: number): void {
    disponibilidad.forEach(element => {
      const horas = element.HORAS.split(',');
      horas.forEach(hora => {
        const indice = this.dataSource.data.findIndex(semanaLaborable => semanaLaborable.hora === parseInt(hora, 10));
        const dia = this.toStringDia(element.DIA);
        this.horas++;
        this.dataSource.data[indice][dia] = true;
      });
      if (this.horas === 0) {
        this.estadoDisponibilidad = EstadoDisponibilidad.REGISTRAR;
      } else {
        this.diasNoSeleccionados = false;
        this.estadoDisponibilidad = permiso === 0 ? EstadoDisponibilidad.SOLICITAR : EstadoDisponibilidad.EDITAR;
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
      !this.tieneElementosSeleccionados(dia) && this.horas >= this.maximo
    ) || this.estadoDisponibilidad === EstadoDisponibilidad.SOLICITAR;
  }

  desactivarCelda(element, dia: DiaLaborable): boolean {
    return (!element[dia] && this.horas >= this.maximo) || this.estadoDisponibilidad === EstadoDisponibilidad.SOLICITAR;
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
      if (this.horas < this.minimo) {
        this.diasNoSeleccionados = true;
      }

      console.log('Desmarcando Celda');
      this.dataSource.data[numeroFila][dia] = false;

      return EstadoHoras.Disminuyendo;
    }
    if (this.horas < this.maximo) {
      console.log('Marcando Celda');
      this.horas++;
      this.dataSource.data[numeroFila][dia] = true;
      if (this.horas >= this.minimo) {
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
