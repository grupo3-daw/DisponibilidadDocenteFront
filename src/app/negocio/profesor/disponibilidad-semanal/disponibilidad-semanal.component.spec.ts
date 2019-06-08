import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadSemanalComponent } from './disponibilidad-semanal.component';

describe('DisponibilidadSemanalComponent', () => {
  let component: DisponibilidadSemanalComponent;
  let fixture: ComponentFixture<DisponibilidadSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilidadSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
