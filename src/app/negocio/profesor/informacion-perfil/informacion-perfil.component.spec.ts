import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@shared/material';

import { InformacionPerfilComponent } from './informacion-perfil.component';

describe('InformacionPerfilComponent', () => {
  let component: InformacionPerfilComponent;
  let fixture: ComponentFixture<InformacionPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionPerfilComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
