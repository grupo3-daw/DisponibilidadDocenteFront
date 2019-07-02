import { Component, OnInit } from '@angular/core';

import { Profesor } from '../profesor';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-layout-profesor',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutProfesorComponent implements OnInit {
  profesor: Profesor;
  loading = true;
  constructor(private readonly profesorService: ProfesorService) {
    this.profesor = JSON.parse(localStorage.getItem('user'));
  }

  async ngOnInit(): Promise<any> {

    this.profesor = await this.profesorService.obtenerDetalle(this.profesor);
    this.loading = false;
  }
}
