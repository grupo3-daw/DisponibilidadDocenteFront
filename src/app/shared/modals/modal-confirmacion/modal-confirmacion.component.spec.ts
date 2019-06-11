import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '@shared/material';

import { ModalConfirmacionComponent } from './modal-confirmacion.component';

describe('ModalConfirmacionComponent', () => {
  let component: ModalConfirmacionComponent;
  let fixture: ComponentFixture<ModalConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmacionComponent],
      imports: [MaterialModule],
      providers: [
        {provide: MatDialogRef, useValue: ModalConfirmacionComponent},
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            width: '450px',
            data: {
              titulo: 'Salir',
              mensaje: '¿Desea Salir del Sistema?'
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ModalConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia de crearse el componente', () => {
    expect(component)
    .toBeTruthy();
  });

  it('Debe tener titulo', () => {
    component.data.titulo = 'Salir';
    fixture.detectChanges();
    const elem: HTMLHeadingElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(elem.innerText)
    .toBe('Salir');
  });

  it('Debe tener boton x de close', () => {
    fixture.detectChanges();
    const elem: HTMLButtonElement = fixture.debugElement.query(By.css('#exit')).nativeElement;
    expect(elem)
      .toBeTruthy();
  });

  it('Debe tener descripcion', () => {
    component.data.mensaje = '¿Desea Salir del Sistema?';
    fixture.detectChanges();
    const elem: HTMLParagraphElement = fixture.debugElement.query(By.css('.mat-dialog-content > p')).nativeElement;
    expect(elem.innerText)
      .toBe('¿Desea Salir del Sistema?');
  });

  it('Debe tener botones de Si y No en Actions', () => {
    fixture.detectChanges();
    const buttonSi: HTMLButtonElement = fixture.debugElement.query(By.css('#si')).nativeElement;
    const buttonNo: HTMLButtonElement = fixture.debugElement.query(By.css('#no')).nativeElement;
    expect(buttonSi)
      .toBeTruthy();
    expect(buttonNo)
      .toBeTruthy();
  });

});
