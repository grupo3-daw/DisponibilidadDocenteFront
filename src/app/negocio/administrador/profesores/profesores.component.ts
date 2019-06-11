import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
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

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent extends MatTableData<ProfesorVistaAdmin> implements OnInit {
  escuela = Escuela;
  @Input() user;
  @ViewChild('cursosVista') cursosVista;
  @ViewChild('tiposVista') tiposVista;
  profesor: ProfesorDetalle;
  abriendoPopUp = false;
  cursos: Array<{ nombre: string, seleccionado: boolean }> = [];
  tipos: Array<{ nombre: string, seleccionado: boolean }> = [
    {
      nombre: 'Completo',
      seleccionado: false
    },
    {
      nombre: 'Parcial',
      seleccionado: false
    }
  ];
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
    const filtrarCursos = new FabButton('filtrar_cursos', 'Filtrar por Cursos', 'bookmarks','primary');
    const filtrarTipos = new FabButton('filtrar_tipos', 'Filtrar por Tipo de Profesor', 'school','primary');
    this.buttonsExt = [
      filtrarCursos,
      filtrarTipos
    ];
    const disponibilidad = new IconButton(
      'disponibilidad',
      'Ver Disponibilidad',
      'assignment',
      data => data.cursosEscogidos !== '',
      'primary'
    );
    disponibilidad.mostrar = data => data.cursosEscogidos !== '';
    const permisos = new IconButton(
      'permisos',
      'Otorgar permisos de edición',
      'https',
      data => data.solicitud !== null,
      'primary');
    this.buttons = [
      disponibilidad,
      permisos
    ];
    this.profesorService.exitoEnProceso.subscribe(
      res => this.abriendoPopUp = false
    );
    this.administradorService.exitoEnProceso.subscribe(
      res => {
        this.dialog.closeAll();
        this.data.forEach(
          (profesor, index) => {
            if (profesor.IDPROFESOR === this.profesor.IDPROFESOR) {
              this.data[index].solicitud = null;
            }
          }
        )
      }
    );
  }

  async ngOnInit(): Promise<any> {
    const res = await this.administradorService.listarAdmin();
    this.profesores = res.profesores;
    this.data = res.profesores;
    this.cursos = res.cursos;
    setTimeout(() => {
      this.loading = false;
    }, 100);

  }

  operaciones(event: { numeroFila: number, data: { id: string, data: ProfesorDetalle } }): void {
    this.profesor = event.data.data;
    if (event.data.id === 'disponibilidad') {
      this.abriendoPopUp = true;
    } else {
      this.dialog.open(AprobarSolicitudComponent, { width: '450px', data: { profesor: this.profesor } });
    }
  }

  actualizar(esCurso: boolean, numeroFila: number): void {
    if (esCurso) {
      this.cursos[numeroFila].seleccionado = !this.cursos[numeroFila].seleccionado;
    } else {
      this.tipos[numeroFila].seleccionado = !this.tipos[numeroFila].seleccionado;
    }
  }

  filtros(event: { id: string, data: any }): void {
    if (event.id === 'filtrar_cursos') {
      this.mostrarCursos();
    } else {
      this.mostrarTipos();
    }
  }

  remove(esCursos: boolean, chip: any): void {
    if (esCursos) {
      const data = this.cursos;
      const index = data.indexOf(chip);
      if (index >= 0) {
        data.splice(index, 1);
        this.buscarPorCursos(
          data
            .filter(row => row.seleccionado)
            .map(row => row.nombre));
      }
    } else {
      const data = this.tipos;
      const index = data.indexOf(chip);
      if (index >= 0) {
        data.splice(index, 1);
        this.buscarPorTipoProfesor(
          data
            .filter(row => row.seleccionado)
            .map(row => row.nombre));
      }
    }

  }

  private mostrarTipos(): void {
    const tipos = this.tipos;
    const vista = this.tiposVista;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Filtrar por Tipos de Profesor', mensaje: '', template: {
          element: vista, data: tipos
        }
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`The dialog was closed  ${result}`);
        this.buscarPorTipoProfesor(
          tipos
            .filter(curso => curso.seleccionado)
            .map(curso => curso.nombre));
      });
  }

  private buscarPorTipoProfesor(seleccionados: Array<string>): void {
    const data = this.profesores;
    let filtrado;
    if (seleccionados.length > 0) {
      filtrado = data.filter(profesor => {
        const seleccionado = seleccionados.find(sel => profesor.NOMBRECATEGORIA === sel
        );
        if (seleccionado) {
          return true;
        }

        return false;
      });
    } else {
      filtrado = data;
    }
    console.log(filtrado);
    this.data = filtrado;
  }

  private mostrarCursos(): void {
    const cursos = this.cursos;
    const vista = this.cursosVista;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Filtrar por Cursos', mensaje: '', template: {
          element: vista, data: cursos
        }
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.buscarPorCursos(
          cursos
            .filter(curso => curso.seleccionado)
            .map(curso => curso.nombre));
      });
  }

  private buscarPorCursos(seleccionados: Array<string>): void {
    const data = this.profesores;
    let filtrado;
    if (seleccionados.length > 0) {
      filtrado = data.filter(profesor => {
        const seleccionado = seleccionados.find(sel => profesor.cursosEscogidos.includes(sel)
        );
        if (seleccionado) {
          return true;
        }

        return false;
      });
    } else {
      filtrado = data;
    }
    console.log(filtrado);
    this.data = filtrado;
  }
}
