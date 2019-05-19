import { Component, OnInit } from '@angular/core';

import { efecto } from './shared/triggers/efecto_lateral';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [efecto]
})
export class AppComponent implements OnInit {
  loading = true;
  title = 'DisponibilidadDocente';
  maxHeight;
  private readonly px = 'px';
  ngOnInit(): void {
    this.loading = false;
    this.maxHeight = window.outerHeight + this.px;
  }

  // prepRouteState(outlet) {
  //   return outlet.activatedRouteData['page'];
  // }
}
