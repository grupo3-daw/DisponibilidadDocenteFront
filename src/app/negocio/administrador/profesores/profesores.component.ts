import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TypeButton } from '@shared/buttons/type-button.enum';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';
import { ProfesorDetalle, ProfesorService } from '@shared/services/profesor.service';
import { MatTablePadre } from '@shared/tables';


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

export interface ProfesorVista extends ProfesorDetalle{
  nombre: string;
  cursosEscogidos: string;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent extends MatTablePadre<ProfesorVista> implements OnInit {
  escuela = Escuela;
  @Input() user;
  @ViewChild('cursosVista') cursosVista;
  @ViewChild('tiposVista') tiposVista;
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
  profesores: Array<ProfesorVista> = [];
  constructor(public dialog: MatDialog, private readonly profesorService: ProfesorService) {
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
    this.buttonsExt = [
      {
        id: 'filtrar_cursos',
        class: '',
        titulo: '',
        tooltipTitulo: 'Filtrar por Cursos',
        imagen: 'bookmarks',
        toolTipPosition: 'above',
        type: TypeButton.Fab,
        disabled: false,
        mostrar: () => true
      },
      {
        id: 'filtrar_tipos',
        class: '',
        titulo: '',
        tooltipTitulo: 'Filtrar por Tipo de Profesor',
        imagen: 'school',
        toolTipPosition: 'above',
        type: TypeButton.Fab,
        disabled: false,
        mostrar: () => true
      }
    ];
    this.buttons = [
      {
        id: 'disponibilidad',
        class: '',
        titulo: 'Ver Disponibilidad',
        tooltipTitulo: 'Ver Disponibilidad',
        imagen: 'assignment',
        toolTipPosition: 'above',
        type: TypeButton.Icon,
        disabled: false,
        mostrar: data => data.cursosEscogidos !== ''
      },
      {
        id: 'permisos',
        class: '',
        titulo: 'Otorgar permisos',
        tooltipTitulo: 'Otorgar permisos de edición',
        imagen: 'https',
        toolTipPosition: 'above',
        type: TypeButton.Icon,
        disabled: false,
        mostrar: data => data.solicitud !== null
      }
    ];
  }

  async ngOnInit(): Promise<any> {
    const res = await this.profesorService.listarAdmin();
    this.profesores = res.profesores;
    this.data = res.profesores;
    this.cursos = res.cursos;
    setTimeout(() => {
      this.loading = false;
    }, 100);

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
        // this.buscarPorTipoProfesor(
        //   data
        //     .filter(row => row.seleccionado)
        //     .map(row => row.nombre));
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
    // dialogRef.afterClosed()
    //   .subscribe(result => {
    //     console.log(`The dialog was closed  ${result}`);
    //     this.buscarPorTipoProfesor(
    //       tipos
    //         .filter(curso => curso.seleccionado)
    //         .map(curso => curso.nombre))
    //   });
  }

  // private buscarPorTipoProfesor(seleccionados: Array<string>): void {
  //   const data = this.profesores;
  //   let filtrado;
  //   if (seleccionados.length > 0) {
  //     filtrado = data.filter(profesor => {
  //       const seleccionado = seleccionados.find(sel => profesor.NOMBRECATEGORIA === sel
  //       )

  //       if (seleccionado) {
  //         return true;
  //       }

  //       return false;

  //     })
  //   } else {
  //     filtrado = data;
  //   }
  //   console.log(filtrado);
  //   this.data = filtrado;
  // }

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
        console.log('The dialog was closed' + result);
        this.buscarPorCursos(
          cursos
            .filter(curso => curso.seleccionado)
            .map(curso => curso.nombre))
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
