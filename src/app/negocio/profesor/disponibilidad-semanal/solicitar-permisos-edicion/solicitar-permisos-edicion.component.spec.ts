import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPermisosEdicionComponent } from './solicitar-permisos-edicion.component';

describe('SolicitarPermisosEdicionComponent', () => {
  let component: SolicitarPermisosEdicionComponent;
  let fixture: ComponentFixture<SolicitarPermisosEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarPermisosEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarPermisosEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
