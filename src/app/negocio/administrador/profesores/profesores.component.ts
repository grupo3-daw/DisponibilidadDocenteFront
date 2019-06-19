import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfesorDetalle } from '@negocio/profesor/profesor';
import { ProfesorService } from '@negocio/profesor/services/profesor.service';
import { FabButton, IconButton } from '@shared/buttons';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';
import { MatTableData } from '@shared/tables/mat-tables/mat-table/mat-table-data';

import { AdministradorService } from '../services/administrador.service';
import { AprobarSolicitudComponent } from './aprobar-solicitud/aprobar-solicitud.component';

export enum Escuela {
  Software = 'Ingenieria de Software',
  Sistemas = 'Ingenieria de Sistemas'
}
export enum Tiempo {
  completo = 'Tiempo Completo',
  parcial = 'Tiempo Parcial'
}

export interface Dictado {
  escuela: Escuela;
  cursos: string;
}

export interface ProfesorVistaAdmin extends ProfesorDetalle {
  nombre: string;
  cursosEscogidos: string;
}

export interface Seleccion {
  nombre: string;
  seleccionado: boolean;
}

export interface SeleccionEscuela extends Seleccion {
  escuela: number;
}

export class Selecciones {
  constructor(public data: Array<Seleccion> = []) {}

  eliminar(seleccion: Seleccion): boolean {
    const index = this.data.indexOf(seleccion);
    if (index >= 0) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }

  deseleccionar(seleccion: Seleccion) {
    const index = this.data.indexOf(seleccion);
    this.data[index].seleccionado = false;
  }
  devolverSoloNombre(): Array<string> {
    return this.data.filter(row => row.seleccionado).map(row => row.nombre);
  }
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent extends MatTableData<ProfesorVistaAdmin> implements OnInit {
  escuela = Escuela;
  @Input() user;
  @ViewChild('cursosVista', {static: true}) cursosVista;
  @ViewChild('tiposVista', {static: true}) tiposVista;
  profesor: ProfesorDetalle;
  abriendoPopUp = false;
  cursosEnModal: Selecciones = new Selecciones();
  cursos: Selecciones = new Selecciones();
  tiposEnModal: Selecciones = new Selecciones([
    {
      nombre: 'Completo',
      seleccionado: false
    },
    {
      nombre: 'Parcial',
      seleccionado: false
    }
  ]);
  tipos: Selecciones = new Selecciones();
  loading = true;
  profesores: Array<ProfesorVistaAdmin> = [];
  constructor(
    public dialog: MatDialog,
    private readonly administradorService: AdministradorService,
    private readonly profesorService: ProfesorService
  ) {
    super();
    this.displayedColumns = [
      {
        header: 'Operaciones',
        columna: 'acciones'
      },
      {
        header: 'Nombre',
        columna: 'nombre'
      },
      {
        header: 'Tipo',
        columna: 'NOMBRECATEGORIA'
      },
      {
        header: 'Cursos',
        columna: 'cursosEscogidos'
      }
    ];
    const filtrarCursos = new FabButton(
      'filtrar_cursos',
      'Filtrar por Cursos',
      'bookmarks',
      'primary'
    );
    const filtrarTipos = new FabButton(
      'filtrar_tipos',
      'Filtrar por Tipo de Profesor',
      'school',
      'primary'
    );
    this.buttonsExt = [filtrarCursos, filtrarTipos];
    const disponibilidad = new IconButton(
      'disponibilidad',
      'Ver Disponibilidad',
      'assignment',
      data => data.cursosEscogidos !== '',
      'primary'
    );
    const permisos = new IconButton(
      'permisos',
      'Otorgar permisos de edición',
      'https',
      data => data.solicitud !== null,
      'primary'
    );
    const reporte = new IconButton(
      'reporte',
      'Descargar reporte de disponibilidad',
      'archive',
      data => data.cursosEscogidos !== '',
      'primary'
    );
    this.buttons = [disponibilidad, permisos];
    this.profesorService.exitoEnProceso.subscribe(res => (this.abriendoPopUp = false));
    this.administradorService.exitoEnProceso.subscribe(res => {
      this.dialog.closeAll();
      this.data.forEach((profesor, index) => {
        if (profesor.IDPROFESOR === this.profesor.IDPROFESOR) {
          this.data[index].solicitud = null;
        }
      });
    });
  }

  async ngOnInit(): Promise<any> {
    const res = await this.administradorService.listarAdmin();
    this.profesores = res.profesores;
    this.data = res.profesores;
    this.cursosEnModal = new Selecciones(res.cursos);
    this.loading = false;
  }

  operaciones(event: {numeroFila: number; data: {id: string; data: ProfesorDetalle}}): void {
    this.profesor = event.data.data;
    switch (event.data.id) {
      case 'disponibilidad':
        this.abriendoPopUp = true;
        break;
      case 'permisos':
        this.dialog.open(AprobarSolicitudComponent, {
          width: '450px',
          data: {profesor: this.profesor}
        });
        break;
      default:
        this.profesorService.descargarReporte(event.data.data.IDPROFESOR);
        break;
    }
  }

  actualizar(esCurso: boolean, numeroFila: number): void {
    if (esCurso) {
      this.cursosEnModal.data[numeroFila].seleccionado = !this.cursosEnModal.data[numeroFila]
        .seleccionado;
    } else {
      this.tiposEnModal.data[numeroFila].seleccionado = !this.tiposEnModal.data[numeroFila]
        .seleccionado;
    }
  }

  filtros(event: {id: string; data: any}): void {
    if (event.id === 'filtrar_cursos') {
      this.mostrarCursos();
    } else {
      this.mostrarTipos();
    }
  }

  mostrarCursosSoftware(): Array<Seleccion> {
    return this.cursosEnModal.data.filter((curso: SeleccionEscuela) => curso.escuela === 2);
  }

  mostrarCursosSistema(): Array<Seleccion> {
    return this.cursosEnModal.data.filter((curso: SeleccionEscuela) => curso.escuela === 3);
  }

  remove(esCursos: boolean, chip: Seleccion): void {
    if (esCursos) {
      this.cursosEnModal.deseleccionar(chip);
      if (this.cursos.eliminar(chip)) {
        this.buscarPorCursos(this.cursos.devolverSoloNombre());
      }
    } else {
      this.tiposEnModal.deseleccionar(chip);
      if (this.tipos.eliminar(chip)) {
        this.buscarPorTipoProfesor(this.tipos.devolverSoloNombre());
      }
    }
  }

  private mostrarTipos(): void {
    const vista = this.tiposVista;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Filtrar por Tipos de Profesor',
        mensaje: '',
        template: {
          element: vista,
          data: this.tipos
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.tipos = new Selecciones(this.tiposEnModal.data.filter(row => row.seleccionado));
        this.buscarPorTipoProfesor(this.tipos.devolverSoloNombre());
      }
    });
  }

  private buscarPorTipoProfesor(seleccionados: Array<string>): void {
    const data = this.profesores;
    let filtrado;
    if (seleccionados.length > 0) {
      filtrado = data.filter(profesor => {
        const seleccionado = seleccionados.find(sel => profesor.NOMBRECATEGORIA === sel);
        if (seleccionado) {
          return true;
        }

        return false;
      });
    } else {
      filtrado = data;
    }
    this.data = filtrado;
  }

  private mostrarCursos(): void {
    const vista = this.cursosVista;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Filtrar por Cursos',
        mensaje: '',
        template: {
          element: vista,
          data: this.cursos
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cursos = new Selecciones(this.cursosEnModal.data.filter(row => row.seleccionado));
        this.buscarPorCursos(this.cursos.devolverSoloNombre());
      }
    });
  }

  private buscarPorCursos(seleccionados: Array<string>): void {
    const data = this.profesores;
    let filtrado;
    if (seleccionados.length > 0) {
      filtrado = data.filter(profesor => {
        const seleccionado = seleccionados.find(sel => profesor.cursosEscogidos.includes(sel));
        if (seleccionado) {
          return true;
        }

        return false;
      });
    } else {
      filtrado = data;
    }
    this.data = filtrado;
  }
}
