import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Curso } from '@negocio/cursos';
import { ProfesorDetalle } from '@negocio/profesor/profesor';
import { ProfesorService } from '@negocio/profesor/services/profesor.service';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';

import { EstadoDisponibilidad } from '../estado-disponibilidad.enum';
import { SemanaLaborable, toStringDia } from '../semana-laborable';


function sumarHora(horaActual: string, horaNueva: string): string {
  const inicioFinNuevo = horaNueva.split('-');
  if (horaActual.includes(inicioFinNuevo[0])) {
    return horaActual.replace(inicioFinNuevo[0], inicioFinNuevo[1]);
  }

  return `${horaActual} - ${horaNueva}`;
}

@Component({
  selector: 'app-registrar-disponibilidad',
  templateUrl: './registrar-disponibilidad.component.html',
  styleUrls: ['./registrar-disponibilidad.component.css']
})
export class RegistrarDisponibilidadComponent implements OnInit {
  @Input() profesorVista = true;
  @Input() profesor: ProfesorDetalle;
  @Input() data: Array<SemanaLaborable>;
  @Input() estadoDisponibilidad: EstadoDisponibilidad;
  @ViewChild('modelo', {static:false}) modelo;
  displayedColumns: Array<string> = [
    'horaRango',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado'
  ];
  horarioEnVista: { disponibilidad: any, cursos: Array<Curso> };
  private disponibilidad;
  private horario: Array<Array<number>>;
  private dias: Array<number>;
  constructor(
    private readonly dialog: MatDialog,
    private readonly profesorService: ProfesorService

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.profesorVista) {
        this.data = [
          new SemanaLaborable(8),
          new SemanaLaborable(9),
          new SemanaLaborable(10),
          new SemanaLaborable(11),
          new SemanaLaborable(12),
          new SemanaLaborable(13),
          new SemanaLaborable(14),
          new SemanaLaborable(15),
          new SemanaLaborable(16),
          new SemanaLaborable(17),
          new SemanaLaborable(18),
          new SemanaLaborable(19),
          new SemanaLaborable(20),
          new SemanaLaborable(21)
        ];
        this.displayedColumns = [
          'horaRango',
          'lunes',
          'martes',
          'miercoles',
          'jueves',
          'viernes',
          'sabado'
        ];
        this.profesor.disponibilidad.forEach(element => {
          const horas = element.HORAS.split(',');
          horas.forEach(hora => {
            const indice = this.data.findIndex(semanaLaborable => semanaLaborable.hora === parseInt(hora, 10));
            const dia = toStringDia(element.DIA);
            this.data[indice][dia] = true;
          });
        });
      }
      this.disponibilidad = this.generarHorario();
      this.horarioEnVista = {
        disponibilidad: this.disponibilidad,
        cursos: this.profesor.cursos
      };
      const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
        width: '450px',
        data: {
          titulo: 'Disponibilidad',
          mensaje: this.profesorVista ? '¿Esta seguro de registrar este horario?' : '',
          template: { element: this.modelo, data: this.horarioEnVista },
          soloLectura: !this.profesorVista
        }
      });
      dialogRef.afterClosed()
        .subscribe(result => {
          if (result === true && this.profesorVista) {
            if (this.estadoDisponibilidad === EstadoDisponibilidad.REGISTRAR) {
              this.profesorService.registrarDisponibilidadCursos(this.profesor.IDPROFESOR, this.profesor.cursos, this.dias, this.horario);
            } else {
              this.profesorService.editarDisponibilidadCursos(this.profesor.IDPROFESOR, this.profesor.cursos, this.dias, this.horario);
            }
          } else {
            this.profesorService.exitoEnProceso.emit(this.estadoDisponibilidad);
          }
        });
    }, 10);

  }

  private generarHorario(): Array<any> {
    const horario = [];
    this.horario = [];
    this.dias = [];
    for (
      let indexDia = 1;
      indexDia < this.displayedColumns.length;
      indexDia++
    ) {
      let horas = '';
      const horasDia = [];
      for (const row of this.data) {
        console.log(row[this.displayedColumns[indexDia]]);

        if (row[this.displayedColumns[indexDia]]) {
          horas = sumarHora(horas, row.horaRango);
          horasDia.push(parseInt(row.horaRango, 10));
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
