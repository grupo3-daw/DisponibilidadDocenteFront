import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';

import { EscuelaCurso } from './curso';

@Injectable({
    providedIn: 'root'
  })
export class CursoService {
  constructor(private readonly api: ApiService) {
  }

  async listarCursos(): Promise<Array<EscuelaCurso>> {
    return this.api.operacion('escuelas_cursos');
  }

}
