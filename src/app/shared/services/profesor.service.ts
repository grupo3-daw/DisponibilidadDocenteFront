import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Profesor } from 'app/login/login.service';

export interface Disponibilidad {
  DIA: number;
  HORAS: string;
}

export interface Curso {
  IDCURSO: number;
  NOMBRECURSO: string;
}

/**
 * @export
 * @extends {Profesor}
 * @var   NOMBRECATEGORIA: string;
 * @var   horas_minimas: number;
 * @var   horas_maximas: number;
 * @var   cursos?: Array<Curso>;
 * @var   disponibilidad? : Array<Disponibilidad>;
 * @var   solicitud?: any;
 */
export interface ProfesorDetalle extends Profesor {
  NOMBRECATEGORIA: string;
  horas_minimas: number;
  horas_maximas: number;
  cursos?: Array<Curso>;
  disponibilidad? : Array<Disponibilidad>;
  solicitud?: any;
}

@Injectable({
    providedIn: 'root'
  })
export class ProfesorService {
  constructor(private readonly api : ApiService) {
  }

  async obtenerDetalle(id: number): Promise<ProfesorDetalle> {
    return this.api.operacion(`profesores/${id}`);
  }
}
