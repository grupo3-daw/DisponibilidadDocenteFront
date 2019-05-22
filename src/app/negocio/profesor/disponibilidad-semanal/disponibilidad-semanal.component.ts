import { Component, OnInit } from '@angular/core';

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
  dataSource: Array<SemanaLaborable> = [
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
  ];
  constructor() {}

  ngOnInit() {}
}
