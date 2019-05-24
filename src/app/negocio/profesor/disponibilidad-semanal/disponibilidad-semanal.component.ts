import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DiaLaborable } from './dia-laborable.type';
import { EstadoHoras } from './estado-horas.enum';
import { SemanaLaborable } from './semana-laborable';

@Component({
  selector: 'app-disponibilidad-semanal',
  templateUrl: './disponibilidad-semanal.component.html',
  styleUrls: ['./disponibilidad-semanal.component.scss']
})
export class DisponibilidadSemanalComponent implements OnInit {
  horas = 20;
  displayedColumns = [
    'hora',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado'
  ];
  dataSource = new MatTableDataSource<SemanaLaborable>([
    new SemanaLaborable('8:00-9:00'),
    new SemanaLaborable('9:00-10:00'),
    new SemanaLaborable('10:00-11:00'),
    new SemanaLaborable('11:00-12:00'),
    new SemanaLaborable('12:00-13:00'),
    new SemanaLaborable('13:00-14:00'),
    new SemanaLaborable('14:00-15:00'),
    new SemanaLaborable('15:00-16:00'),
    new SemanaLaborable('16:00-17:00'),
    new SemanaLaborable('17:00-18:00'),
    new SemanaLaborable('18:00-19:00'),
    new SemanaLaborable('19:00-20:00'),
    new SemanaLaborable('20:00-21:00'),
    new SemanaLaborable('21:00-22:00')
  ]);

  masterToggle(dia: DiaLaborable): void {
    let anterior: EstadoHoras = 0;
    for (let index = 0; index < this.dataSource.data.length; index++) {
      const resultado = this.actualizarDisponibilidad(dia, index);
      console.log(this.horas);
      console.log(resultado);
      console.log(anterior);
      if (
        resultado === EstadoHoras.Fin ||
        (anterior !== EstadoHoras.Fin && resultado !== anterior)
      ) {
        switch (resultado) {
          case EstadoHoras.Agregando:
            this.horas++;
            this.dataSource.data[index][dia] = false;
            break;
          case EstadoHoras.Disminuyendo:
            this.horas--;
            this.dataSource.data[index][dia] = true;
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
      this.horas++;
      console.log('Desmarcando Celda');
      this.dataSource.data[numeroFila][dia] = false;

      return EstadoHoras.Disminuyendo;
    }
    if (this.horas > 0) {
      console.log('Marcando Celda');
      this.horas--;
      this.dataSource.data[numeroFila][dia] = true;

      return EstadoHoras.Agregando;
    }

    return EstadoHoras.Fin;
  }

  constructor() {}

  ngOnInit() {}
}
