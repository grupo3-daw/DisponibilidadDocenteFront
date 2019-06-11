import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule, MyButton } from '@shared/buttons';
import { GroupButtonsComponent } from '@shared/buttons/group-buttons/group-buttons.component';
import { MaterialModule } from '@shared/material';

import { BuscadorInputModule } from '../buscador-input/buscador-input.module';
import { MatTableComponent } from './mat-table.component';

describe('MatTableComponent', () => {
  let component: MatTableComponent;
  let fixture: ComponentFixture<MatTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ButtonsModule, BuscadorInputModule, BrowserAnimationsModule],
      declarations: [MatTableComponent]
    });
    fixture = TestBed.createComponent(MatTableComponent);
    component = fixture.componentInstance;
    component.displayedColumns = [{header: 'Nombre', columna: 'nombre'}];
    component.data = [{nombre: 'Alarcon'}, {nombre: 'Machado'}];
    fixture.detectChanges();
  });

  it('Deberia existir componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar a inicializar despues de ngOnInit', () => {
    spyOn(component, 'inicializar');
    fixture.whenStable().then(res => {
      expect(component.inicializar).toHaveBeenCalled();
    });

  });

  it('Datasource debe contener data', () => {
    fixture.whenStable().then(res => {
      expect(component.dataSource.data).toBe(component.data);
    });
  });

  it('Columns to display deben ser inicializadas', () => {
    fixture.whenStable().then(res => {
      expect(component.columnsToDisplay.length).toBe(component.displayedColumns.length);
    });

  });

  it('Paginator debe ser inicializado', async(() => {
    fixture.whenStable().then(res => {
       expect(component.dataSource.paginator).toBe(component.paginator);
    });
  }));

  it('Sort debe ser inicializado', async(() => {
    fixture.whenStable().then(res => {
        expect(component.dataSource.sort).toBe(component.sort);
    });
  }));

  it('Deben pintarse botones internos', () => {
    component.buttons = [new MyButton('1'), new MyButton('2')];
    fixture.whenStable().then(res => {
      const buttons: GroupButtonsComponent = fixture.debugElement.query(
        By.directive(GroupButtonsComponent)
      ).nativeElement;
      expect(buttons).toBeDefined();
    });

  });
});
