import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Disponibilidad, ProfesorDetalle } from '../profesor';
import { CursoSeleccionado } from '../seleccionar-curso/cursos-escogidos/cursos-escogidos.component';
import { SeleccionarCursoService } from '../seleccionar-curso/seleccionar-curso.service';
import { ProfesorService } from '../services/profesor.service';
import { DiaLaborable } from './dia-laborable.type';
import { EstadoDisponibilidad } from './estado-disponibilidad.enum';
import { EstadoHoras } from './estado-horas.enum';
import { SemanaLaborable, toStringDia } from './semana-laborable';

@Component({
  selector: 'app-disponibilidad-semanal',
  templateUrl: './disponibilidad-semanal.component.html',
  styleUrls: ['./disponibilidad-semanal.component.scss']
})
export class DisponibilidadSemanalComponent implements OnInit {
  @Input() profesor: ProfesorDetalle;
  estado = EstadoDisponibilidad;
  abriendoPopUp = false;
  horas = 0;
  diasNoSeleccionados = true;
  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<SemanaLaborable>;
  flotando = false;
  constructor(
    private readonly seleccionarCursoService: SeleccionarCursoService,
    private readonly profesorService: ProfesorService
  ) {
    this.displayedColumns = [
      'horaRango',
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado'
    ];
    this.dataSource = new MatTableDataSource<SemanaLaborable>([
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
      new SemanaLaborable(21),
      new SemanaLaborable(22)
    ]);
    this.seleccionarCursoService.cursosSeleccionadosEvento.subscribe((res: Array<CursoSeleccionado>) => {
      console.log(res);
      if (res.length > 0) {
        this.profesor.cursos = res.map(curso => ({
          id: curso.id,
          escuela_id: curso.escuela_id,
          nombrecurso: curso.nombrecurso,
          nhoras: curso.nhoras
        }));
      }
    });
    this.profesorService.exitoEnProceso.subscribe((estado: EstadoDisponibilidad) => {
      this.abriendoPopUp = false;
    });
  }

  ngOnInit(): void {
    this.inicializarDisponibilidad(this.profesor.disponibilidades);
  }

  @HostListener('window:scroll', ['$event']) scroll($event: any): void {
    const algo = document.getElementsByTagName('html')[0];
    this.flotando = algo.scrollTop >= 947;
  }

  openDialog(): void {
    this.abriendoPopUp = true;
  }

  public actualizarDisponibilidad(numeroFila: number, dia: DiaLaborable): EstadoHoras {
    if (this.profesor.permiso === EstadoDisponibilidad.REGISTRAR || this.profesor.permiso === EstadoDisponibilidad.EDITAR) {
      if (this.dataSource.data[numeroFila][dia]) {
        this.horas--;
        if (this.horas < this.profesor.categoria.horas_minimas) {
          this.diasNoSeleccionados = true;
        }
        this.dataSource.data[numeroFila][dia] = false;

        return EstadoHoras.Disminuyendo;
      }
      if (this.horas < this.profesor.categoria.horas_maximas) {
        this.horas++;
        this.dataSource.data[numeroFila][dia] = true;
        if (this.horas >= this.profesor.categoria.horas_minimas) {
          this.diasNoSeleccionados = false;
        }

        return EstadoHoras.Agregando;
      }

      return EstadoHoras.Fin;
    }

  }

  private inicializarDisponibilidad(disponibilidad: Array<Disponibilidad>): void {
    if (this.profesor.permiso_object) {
      if (this.profesor.permiso_object.estado === 'RECHAZADO') {
        setTimeout(() => {
          this.profesor.permiso = EstadoDisponibilidad.RECHAZADO;
        }, 1);

      } else {

        setTimeout(() => {
          this.profesor.permiso = EstadoDisponibilidad.EDITAR;
        }, 1);
      }
    }
    disponibilidad.forEach(element => {
      console.log(element);
      const horas = element.horas.split(',');
      horas.forEach(hora => {
        const indice = this.dataSource.data.findIndex(
          semanaLaborable => semanaLaborable.hora === parseInt(hora, 10)
        );
        const dia = toStringDia(element.dia);
        this.horas++;
        this.dataSource.data[indice][dia] = true;
      });
      console.log(this.horas);
      if (this.horas !== 0) {
        this.diasNoSeleccionados = false;
      }
    });
  }

}
