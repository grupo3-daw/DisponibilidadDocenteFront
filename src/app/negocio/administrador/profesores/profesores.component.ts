import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TypeButton } from '@shared/buttons/type-button.enum';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';
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

export interface Profesor {
  nombre: string;
  tipo: Tiempo;
  dictado: Array<Dictado>;
}

export interface ProfesorVista {
  nombre: string;
  tipo: Tiempo;
  cursos: string;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent extends MatTablePadre<ProfesorVista> {
  escuela = Escuela;
  @Input() user;
  @ViewChild('cursosSistemasVista') cursosSistemasVista;
  @ViewChild('cursosSoftwareVista') cursosSoftwareVista;
  @ViewChild('tiposSoftwareVista') tiposSoftwareVista;
  @ViewChild('tiposSistemasVista') tiposSistemasVista;
  filtradoSistemas: Array<ProfesorVista> = [];
  filtradoSoftware: Array<ProfesorVista> = [];
  tiposSistemas: Array<{ nombre: string, seleccionado: boolean }> = [];
  tiposSoftware: Array<{ nombre: string, seleccionado: boolean }> = [];
  cursosSistemas: Array<{ nombre: string, seleccionado: boolean }> = [];
  cursosSoftware: Array<{ nombre: string, seleccionado: boolean }> = [];
  profesoresSoftware: Array<ProfesorVista> = [];
  profesoresSistema: Array<ProfesorVista> = [];
  profesores: Array<Profesor> = [
    {
      nombre: 'Alarcon Loayza',
      tipo: Tiempo.parcial,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Calidad de Software, Taller de Software, Diseño de Software'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Calidad de Software, Taller de Software'
        }
      ]
    },
    {
      nombre: 'Alcantara Loayza',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Requerimientos de Software, Diseño de Software'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Requerimientos de Software'
        }
      ]
    },
    {
      nombre: 'Cabrera Diaz',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Base de Datos 1, Arquitectura de Software'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Base de Datos 1, Arquitectura de Software'
        }
      ]
    },
    {
      nombre: 'Chavez Herrera',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos:
            'Sistemas Inteligentes, Inteligencia de Negocios'
        },
        {
          escuela: Escuela.Software,
          cursos:
            'Teoria General de Sistemas, Sistemas Inteligentes, Inteligencia de Negocios'
        }
      ]
    },
    {
      nombre: 'Chavez Soto',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Base de Datos 1'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Base de Datos 1, Base de Datos 2'
        }
      ]
    },
    {
      nombre: 'Contreras Flores',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Sistemas Digitales'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Sistemas Digitales'
        }
      ]
    },
    {
      nombre: 'Cortez Vasquez',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Software,
          cursos: 'Estructura de Datos 1, Estructura de Datos 2'
        }
      ]
    },
    {
      nombre: 'Diaz Muñante, Jorge',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Sistemas Operativos'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Sistemas Operativos'
        }
      ]
    },
    {
      nombre: 'Enriquez Maguiña',
      tipo: Tiempo.completo,
      dictado: [
        {
          escuela: Escuela.Sistemas,
          cursos: 'Planeamiento de Recursos Empresariales'
        },
        {
          escuela: Escuela.Software,
          cursos: 'Planeamiento de Recursos Empresariales'
        }
      ]
    }
  ];

  constructor(public dialog: MatDialog) {
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
        columna: 'tipo'
      },
      {
        header: 'Cursos',
        columna: 'cursos'
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
    ]
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
        mostrar: () => true
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
        mostrar: () => true
      }
    ]
    console.log(this.profesores.length);

    this.profesores.forEach(profesor => {
      profesor.dictado.forEach(dictado => {
        if (dictado.escuela === Escuela.Sistemas) {
          this.profesoresSistema.push({
            nombre: profesor.nombre,
            tipo: profesor.tipo,
            cursos: dictado.cursos
          })
          const cursos = dictado.cursos.split(',')
          cursos.forEach(curso => {
            if (!this.cursosSistemas.includes({ nombre: curso, seleccionado: false })) {
              this.cursosSistemas.push({ nombre: curso, seleccionado: false })
            }
          })
        }
        if (dictado.escuela === Escuela.Software) {
          this.profesoresSoftware.push({
            nombre: profesor.nombre,
            tipo: profesor.tipo,
            cursos: dictado.cursos
          })
          const cursos = dictado.cursos.split(',')
          cursos.forEach(curso => {
            if (!this.cursosSoftware.includes({ nombre: curso, seleccionado: false })) {
              this.cursosSoftware.push({ nombre: curso, seleccionado: false })
            }
          })
        }
      });
    });
    this.tiposSistemas = [
      { nombre: Tiempo.completo, seleccionado: false },
      { nombre: Tiempo.parcial, seleccionado: false }
    ]
    this.tiposSoftware = [
      { nombre: Tiempo.completo, seleccionado: false },
      { nombre: Tiempo.parcial, seleccionado: false }
    ]
    this.filtradoSistemas = [...this.profesoresSistema]
    this.filtradoSoftware = [...this.profesoresSoftware]
  }

  actualizar(esCurso: boolean, numeroFila: number, escuela: Escuela): void {

    if (esCurso) {
      if (escuela === Escuela.Sistemas) {
        this.cursosSistemas[numeroFila].seleccionado = !this.cursosSistemas[numeroFila].seleccionado;
      } else {
        this.cursosSoftware[numeroFila].seleccionado = !this.cursosSoftware[numeroFila].seleccionado;
      }
    } else {
      if (escuela === Escuela.Sistemas) {
        this.tiposSistemas[numeroFila].seleccionado = !this.tiposSistemas[numeroFila].seleccionado;
      } else {
        this.tiposSoftware[numeroFila].seleccionado = !this.tiposSoftware[numeroFila].seleccionado;
      }
    }
  }


  filtros(event: { id: string, data: any }, escuela: Escuela): void {
    console.log(event, escuela);
    if (event.id === 'filtrar_cursos') {
      this.mostrarCursos(escuela)
    } else {
      this.mostrarTipos(escuela)
    }
  }

  remove(esCursos: boolean, chip: any, escuela: Escuela): void {
    if (esCursos) {
      const data = escuela === Escuela.Sistemas ? this.cursosSistemas : this.cursosSoftware;
      const index = data.indexOf(chip)
      if (index >= 0) {
        data.splice(index, 1)
        this.buscarPorCursos(
          escuela,
          data
            .filter(row => row.seleccionado)
            .map(row => row.nombre))
      }
    } else {
      const data = escuela === Escuela.Sistemas ? this.tiposSistemas : this.tiposSoftware;
      const index = data.indexOf(chip)
      if (index >= 0) {
        data.splice(index, 1)
        this.buscarPorTipoProfesor(
          escuela,
          data
            .filter(row => row.seleccionado)
            .map(row => row.nombre))
      }
    }

  }

  private mostrarTipos(escuela: Escuela): void {
    let tipos;
    let vista;
    if (escuela === Escuela.Sistemas) {
      tipos = this.tiposSistemas;
      vista = this.tiposSistemasVista;
    } else {
      tipos = this.tiposSoftware;
      vista = this.tiposSoftwareVista;
    }
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Filtrar por Cursos', mensaje: '', template: {
          element: vista, data: tipos
        }
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed' + result);
        this.buscarPorTipoProfesor(
          escuela,
          tipos
            .filter(curso => curso.seleccionado)
            .map(curso => curso.nombre))
      });
  }

  private buscarPorTipoProfesor(escuela: Escuela, seleccionados: Array<string>): void {
    let data;
    if (escuela === Escuela.Sistemas) {
      data = this.profesoresSistema;
    } else {
      data = this.profesoresSoftware;
    }
    let filtrado;
    if (seleccionados.length > 0) {
      filtrado = data.filter(profesor => {
        const seleccionado = seleccionados.find(sel => profesor.tipo === sel
        )

        if (seleccionado) {
          return true;
        }

        return false;

      })
    } else {
      filtrado = data;
    }
    console.log(filtrado);

    if (escuela === Escuela.Sistemas) {
      this.filtradoSistemas = filtrado;
    } else {
      this.filtradoSoftware = filtrado;
    }
  }

  private mostrarCursos(escuela: Escuela): void {
    let cursos;
    let vista;
    if (escuela === Escuela.Sistemas) {
      cursos = this.cursosSistemas;
      vista = this.cursosSistemasVista;
    } else {
      cursos = this.cursosSoftware;
      vista = this.cursosSoftwareVista;
    }

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
          escuela,
          cursos
            .filter(curso => curso.seleccionado)
            .map(curso => curso.nombre))
      });
  }



  private buscarPorCursos(escuela: Escuela, seleccionados: Array<string>): void {
    let data;
    if (escuela === Escuela.Sistemas) {
      data = this.profesoresSistema;
    } else {
      data = this.profesoresSoftware;
    }
    let filtrado;
    if (seleccionados.length > 0) {
      filtrado = data.filter(profesor => {
        const seleccionado = seleccionados.find(sel => profesor.cursos.includes(sel)
        )

        if (seleccionado) {
          return true;
        }

        return false;

      })
    } else {
      filtrado = data;
    }
    console.log(filtrado);

    if (escuela === Escuela.Sistemas) {
      this.filtradoSistemas = filtrado;
    } else {
      this.filtradoSoftware = filtrado;
    }
  }
}
