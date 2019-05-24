import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export type DiaLaborable =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado';

export class SemanaLaborable {
  hora: string;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;

  constructor(hora) {
    this.hora = hora;
    this.lunes = false;
    this.martes = false;
    this.miercoles = false;
    this.jueves = false;
    this.viernes = false;
    this.sabado = false;
  }
}

export class SeleccionSemana {
  lunes = new SelectionModel<SemanaLaborable>(true, []);
  martes = new SelectionModel<SemanaLaborable>(true, []);
  miercoles = new SelectionModel<SemanaLaborable>(true, []);
  jueves = new SelectionModel<SemanaLaborable>(true, []);
  viernes = new SelectionModel<SemanaLaborable>(true, []);
  sabado = new SelectionModel<SemanaLaborable>(true, []);
}

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
  selection = new SeleccionSemana();

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(dia: DiaLaborable): void {
    for (let index = 0; index < this.dataSource.data.length; index++) {
      const resultado = this.actualizarDisponibilidad(dia, index);
      console.log(this.horas);
      if (resultado === 0) {
        index = this.dataSource.data.length;
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

  actualizarDisponibilidad(dia: DiaLaborable, numeroFila: number): number {
    if (this.dataSource.data[numeroFila][dia]) {
      this.horas++;
      console.log('Desmarcando Celda');
      this.dataSource.data[numeroFila][dia] = false;
    } else {
      if (this.horas > 0) {
        console.log('Marcando Celda');
        this.horas--;
        this.dataSource.data[numeroFila][dia] = true;
      } else {
        return 0;
      }
    }

    return 1;
  }

  constructor() {}

  ngOnInit() {}
}
