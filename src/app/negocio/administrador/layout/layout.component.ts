import { Component } from '@angular/core';

import { Administrador } from '../administrador';

@Component({
  selector: 'app-layout-administrador',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutAdministradorComponent {
  user: Administrador;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
