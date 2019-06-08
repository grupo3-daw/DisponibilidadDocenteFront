import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '@material';
import { ModalsModule } from '@shared/modals/modals.module';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component:ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      declarations:[ToolbarComponent],
      imports: [FlexLayoutModule, MaterialModule, ModalsModule]
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    component	 = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse el componente', () => {
    expect(component)
    .toBeTruthy();
  });

  it('Debe tener boton de salida de aplicación', () => {
      fixture.detectChanges();
      const elem: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(elem)
      .toBeTruthy();
  });

  

});
