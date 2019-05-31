import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';

import { CursoDetalle } from './curso';

@Injectable({
    providedIn: 'root'
  })
export class CursoService {
  constructor(private readonly api: ApiService) {
  }

  async listarCursos(): Promise<Array<CursoDetalle>> {
    return this.api.operacion('cursos');
  }
}
