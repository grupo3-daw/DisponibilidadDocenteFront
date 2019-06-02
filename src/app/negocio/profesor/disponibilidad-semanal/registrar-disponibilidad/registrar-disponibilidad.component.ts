import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalConfirmacionComponent } from '@shared/modals/modal-confirmacion/modal-confirmacion.component';
import { Curso } from '@shared/services/curso';
import { ProfesorService } from '@shared/services/profesor.service';

import { EstadoDisponibilidad } from '../estado-disponibilidad.enum';
import { SemanaLaborable } from '../semana-laborable';

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
  @Input() id: number;
  @Input() cursosSeleccionados: Array<Curso>;
  @Input() data: Array<SemanaLaborable>;
  @Input() displayedColumns: Array<string>;
  @Input() estadoDisponibilidad: EstadoDisponibilidad;
  @ViewChild('modelo') modelo;
  private disponibilidad;
  private horarioEnVista: { disponibilidad: any, cursos: Array<Curso> };
  private horario: Array<Array<number>>;
  private dias: Array<number>;
  constructor(
    private readonly dialog: MatDialog,
    private readonly profesorService: ProfesorService,

  ) { }

  ngOnInit(): void {
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
        template: { element: this.modelo, data: this.horarioEnVista }
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.profesorService.registrarDisponibilidadCursos(this.id, this.cursosSeleccionados, this.dias, this.horario);
        } else {
          this.profesorService.envioSolicitud.emit(false);
        }
      });
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
