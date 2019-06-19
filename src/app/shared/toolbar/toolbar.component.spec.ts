import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MaterialModule } from '@shared/material';
import { ModalsModule } from '@shared/modals/modals.module';

import { ToolbarComponent } from './toolbar.component';

class FakeRouter {
  navigate(params) { }
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [FlexLayoutModule, MaterialModule, ModalsModule, BrowserAnimationsModule],
      providers: [{ provide: Router, useClass: FakeRouter }]
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener boton de salida de aplicación', () => {
    const elem: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(elem).toBeTruthy();
  });

  it('Deberia de abrir el cuadro de dialogo', () => {
    component.cargarDialog();
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      component.dialogRef.close(true);
      expect(component.dialogRef).toBeDefined();
    });
  });

  it('Deberia de llamar a navegar login despues de dar si en el cuadro de dialogo', () => {
    component.openDialog();
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      component.dialogRef.close(true);
      fixture.detectChanges();
      fixture.whenStable().then(res => {
        tick(10);
        const spy = spyOn(component, 'navegarLogin');
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  it('Deberia de ir a la vista de login al navegar login', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.navegarLogin(true);
    expect(spy).toHaveBeenCalledWith(['auth']);
  });

});
