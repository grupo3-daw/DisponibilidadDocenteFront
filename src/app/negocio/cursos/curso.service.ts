import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Consulta } from '@shared/services/consulta.enum';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(private readonly api: ApiService) {
  }

  async listarCursos(): Promise<Array<Curso>> {
    return this.api.operacion<{ cursos: Array<Curso> }>('cursos', Consulta.POST)
      .then(
        res => res.cursos
      )
      .catch(
        error => []
      );

  }

}
