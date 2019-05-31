export interface Curso {
  IDCURSO: number;
  NOMBRECURSO: string;
}

export interface CursoDetalle extends Curso {
  IDESCUELA: number;
  NHORAS: number;
}
