import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-administrador',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutAdministradorComponent implements OnInit {
  user;
  constructor() {
    this.user = localStorage.getItem('user');
  }

  ngOnInit() {
  }

}
