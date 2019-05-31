import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Curso } from '@shared/services/profesor.service';

export interface CursoDetalle extends Curso {
  IDESCUELA:number,
  NHORAS:number
}

@Injectable({
    providedIn: 'root'
  })
export class CursoService {
  constructor(private readonly api : ApiService) {
  }

  async listarCursos(): Promise<Array<CursoDetalle>> {
    return this.api.operacion('cursos');
  }
}
