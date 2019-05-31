export enum DiaLaborableEnum {
  LUNES = 1,
  MARTES = 1,
  MIERCOLES = 1,
  JUEVES = 1,
  VIERNES = 1,
  SABADO = 1,
}

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
