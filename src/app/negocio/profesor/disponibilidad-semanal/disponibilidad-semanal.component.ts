import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';
import { Curso } from '@shared/services/curso';
import { NotificationService } from '@shared/services/notification.service';
import { ProfesorService } from '@shared/services/profesor.service';

import { SeleccionarCursoService } from '../seleccionar-curso/seleccionar-curso.service';
import { DiaLaborable } from './dia-laborable.type';
import { EstadoHoras } from './estado-horas.enum';
import { SemanaLaborable } from './semana-laborable';

function sumarHora(horaActual: string, horaNueva: string): string {
  const inicioFinNuevo = horaNueva.split('-');
  if (horaActual.includes(inicioFinNuevo[0])) {
    return horaActual.replace(inicioFinNuevo[0], inicioFinNuevo[1]);
  }

  return `${horaActual} - ${horaNueva}`;
}

export interface Disponibilidad {
  DIA: number;
  HORAS: string;
}

@Component({
  selector: 'app-disponibilidad-semanal',
  templateUrl: './disponibilidad-semanal.component.html',
  styleUrls: ['./disponibilidad-semanal.component.scss']
})
export class DisponibilidadSemanalComponent implements OnChanges {
  @Input() cursosSeleccionados: Array<Curso>;
  @Input() disponibilidadHoraria: Array<Disponibilidad>;
  disponibilidad;
  @ViewChild('horarioVista') horarioVista;
  @Input() minimo: number;
  @Input() maximo: number;
  @Input() id: number;
  @Input() horas = 0;
  horarioEnVista: { disponibilidad: any, cursos: Array<Curso> };
  horario: Array<Array<number>>;
  dias: Array<number>

  diasNoSeleccionados = true;
  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<SemanaLaborable>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly seleccionarCursoService: SeleccionarCursoService,
    private readonly profesorService: ProfesorService,
    private readonly notificacionService: NotificationService
  ) {
    this.displayedColumns = [
      'hora',
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado'
    ];
    this.dataSource = new MatTableDataSource<SemanaLaborable>([
      new SemanaLaborable('8:00-9:00'),
      new SemanaLaborable('9:00-10:00'),
      new SemanaLaborable('10:00-11:00'),
      new SemanaLaborable('11:00-12:00'),
      new SemanaLaborable('12:00-13:00'),
      new SemanaLaborable('13:00-14:00'),
      new SemanaLaborable('14:00-15:00'),
      new SemanaLaborable('15:00-16:00'),
      new SemanaLaborable('16:00-17:00'),
      new SemanaLaborable('17:00-18:00'),
      new SemanaLaborable('18:00-19:00'),
      new SemanaLaborable('19:00-20:00'),
      new SemanaLaborable('20:00-21:00'),
      new SemanaLaborable('21:00-22:00')
    ]);
    this.seleccionarCursoService.cursosSeleccionadosEvento.subscribe(
      res => {
        this.cursosSeleccionados = res.map(
          curso => {
            return { IDCURSO: curso.id, NOMBRECURSO: curso.curso }
          });
        console.log(this.cursosSeleccionados);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disponibilidad) {
      this.disponibilidadHoraria.forEach(
        disponibilidad => {

          // switch (disponibilidad.DIA) {
          //   case DiaLaborableEnum.LUNES:
          //     this.dataSource.data[]['lunes'] = true;
          //     break;

          //   default:
          //     this.dataSource.data[]['sabado'] = true;
          //     break;
          // }

        }
      )
    }
  }

  masterToggle(dia: DiaLaborable): void {
    let anterior: EstadoHoras = 0;
    for (let index = 0; index < this.dataSource.data.length; index++) {
      const resultado = this.actualizarDisponibilidad(dia, index);
      if (
        resultado === EstadoHoras.Fin ||
        (anterior !== EstadoHoras.Fin && resultado !== anterior)
      ) {
        switch (resultado) {
          case EstadoHoras.Agregando:
            this.horas++;
            this.dataSource.data[index][dia] = true;
            break;
          case EstadoHoras.Disminuyendo:
            this.horas--;
            this.dataSource.data[index][dia] = false;
            break;
          default:
            break;
        }
        index = this.dataSource.data.length;
      } else {
        anterior = resultado;
      }
    }
  }

  isAllSelected(dia: DiaLaborable): boolean {
    let seleccionados = 0;
    this.dataSource.data.map(row => {
      if (row[dia]) {
        seleccionados++;
      }
    });

    return seleccionados === this.dataSource.data.length;
  }

  tieneElementosSeleccionados(dia: DiaLaborable): boolean {
    return this.dataSource.data.findIndex(row => row[dia]) > -1;
  }

  actualizarDisponibilidad(dia: DiaLaborable, numeroFila: number): EstadoHoras {
    if (this.dataSource.data[numeroFila][dia]) {
      this.horas--;
      if (this.horas < this.minimo) {
        this.diasNoSeleccionados = true;
      }

      console.log('Desmarcando Celda');
      this.dataSource.data[numeroFila][dia] = false;

      return EstadoHoras.Disminuyendo;
    }
    if (this.horas < this.maximo) {
      console.log('Marcando Celda');
      this.horas++;
      this.dataSource.data[numeroFila][dia] = true;
      if (this.horas >= this.minimo) {
        this.diasNoSeleccionados = false;
      }

      return EstadoHoras.Agregando;
    }

    return EstadoHoras.Fin;
  }

  openDialog(): void {
    this.disponibilidad = this.generarHorario();
    this.horarioEnVista = {
      disponibilidad: this.disponibilidad,
      cursos: this.cursosSeleccionados
    };
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '450px',
      data: {
        titulo: 'Disponibilidad',
        mensaje: '¿Esta seguro de registrar este horario?',
        template: { element: this.horarioVista, data: this.horarioEnVista }
      }
    });
    console.log(this.dias);
    console.log(this.horario);

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.profesorService.registrarCursos(this.id, this.cursosSeleccionados)
            .then(
              res => {
                this.profesorService.registrarDisponibilidad(this.id,this.dias,this.horario)
                .then(
                  res => {
                    this.notificacionService.mostrarMensajeSuccess('Disponibilidad Registrada Exitosamente')
                  }
                )
                .catch();
              }
            )
            .catch();
        }
      });
  }

  private generarHorario(): Array<any> {
    const horario = [];
    this.horario = []
    this.dias = []
    for (
      let indexDia = 1;
      indexDia < this.displayedColumns.length;
      indexDia++
    ) {
      let horas = '';
      let horasDia = []
      for (const row of this.dataSource.data) {
        console.log(row[this.displayedColumns[indexDia]]);

        if (row[this.displayedColumns[indexDia]]) {
          horas = sumarHora(horas, row.hora);
          horasDia.push(parseInt(row.hora, 10));
        }
      }
      if (horas !== '') {
        this.dias.push(indexDia);
        this.horario.push(horasDia);
        horario.push({
          dia: this.displayedColumns[indexDia],
          horas: horas.replace('-', '')
        });
      }
    }

    return horario;
  }
}
