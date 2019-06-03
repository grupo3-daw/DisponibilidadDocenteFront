import { DiaLaborable } from './dia-laborable.type';

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

export function toStringDia(dia: DiaLaborableEnum): DiaLaborable {
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
