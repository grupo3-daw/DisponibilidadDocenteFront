import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';

import { Curso } from './curso';

@Injectable({
    providedIn: 'root'
  })
export class CursoService {
  constructor(private readonly api: ApiService) {
  }

  async listarCursos(): Promise<Array<Curso>> {
    return this.api.operacion('cursos');
  }

}
