export enum DiaLaborableEnum {
  LUNES = 1,
  MARTES = 2,
  MIERCOLES = 3,
  JUEVES = 4,
  VIERNES = 5,
  SABADO = 6
}

export class SemanaLaborable {
  horaRango: string;
  constructor(
    public hora: number,
    public lunes = false,
    public martes = false,
    public miercoles = false,
    public jueves = false,
    public viernes = false,
    public sabado = false) {
    this.horaRango = `${hora}:00 - ${hora + 1}:00 `;
  }
}
