export interface EscuelaCurso {
  horas: number;
  escuela: Escuela;
  curso: Curso;
}

export interface Curso {
  idCurso: number;
  nombre: string;
}

export interface Escuela {
  idEscuela: number;
  idFacultad: number;
  nombre: string;
}
