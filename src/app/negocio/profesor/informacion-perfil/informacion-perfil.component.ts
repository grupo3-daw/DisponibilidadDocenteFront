import { Component, OnInit } from '@angular/core';

import { Perfil } from './perfil';

@Component({
  selector: 'app-informacion-perfil',
  templateUrl: './informacion-perfil.component.html',
  styleUrls: ['./informacion-perfil.component.scss']
})
export class InformacionPerfilComponent implements OnInit {
  perfil: Perfil = {
    nombre: 'Alarcón Loayza, Luis Alberto',
    codigo: '091081',
    categoria: 'Asociado TP 20 horas',
    horas: 20
  };
  constructor() {}

  ngOnInit() {}
}
