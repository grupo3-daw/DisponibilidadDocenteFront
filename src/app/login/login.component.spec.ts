import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFormsModule } from '@material';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

// tslint:disable
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [LoginService],
      imports: [MaterialFormsModule, HttpClientModule, BrowserAnimationsModule]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener imagen de fondo de la fisi', () => {
    fixture.detectChanges();
    const elem: HTMLImageElement = fixture.debugElement.query(
      By.css('#portada')
    ).nativeElement;
    expect(elem.src).toContain('assets/img/fondo.jpg');
  });

  it('Debe tener imagen de logo', () => {
    fixture.detectChanges();
    const elem: HTMLImageElement = fixture.debugElement.query(By.css('#logo'))
      .nativeElement;
    expect(elem.src).toContain('assets/img/logo.png');
  });

  it('Debe de mostrar en el input id el valor del id', () => {
    component.formGroup.patchValue({ id: 'alarcon' });
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const elem: HTMLInputElement = fixture.debugElement.query(
          By.css('#identificador')
        ).nativeElement;
        expect(elem.value).toBe('alarcon');
      })
      .catch(error => {
        console.error(error);
      });
  });

  it('Debe de mostrar en el input password el valor del password', () => {
    component.formGroup.patchValue({ password: '123456' });
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const elem: HTMLInputElement = fixture.debugElement.query(
          By.css('#password')
        ).nativeElement;
        expect(elem.value).toBe('123456');
      })
      .catch(error => {
        console.error(error);
      });
  });
});
