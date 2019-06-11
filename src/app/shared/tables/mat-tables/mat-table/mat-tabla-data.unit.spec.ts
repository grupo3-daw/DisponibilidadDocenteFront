import { MyButton } from '@shared/buttons';

import { MatTableData } from './mat-table-data';

describe('Material Table Data', () => {
  let component: MatTableData;

  beforeEach(() => {
    component = new MatTableData();
    component.pageSize = 10;
    component.data = [{nombre: 'Alarcon'}, {nombre: 'Machado'}];
    component.displayedColumns = [{header: 'Nombre', columna: 'nombre'}];
  });

  it('Debe activar los botones internos', () => {
    component.buttons = [new MyButton('1'), new MyButton('2')];
    component.activarBotonesInternos();
    let resultado = true;
    for (const button of component.buttons) {
      resultado = resultado && !button.disabled;
    }
    expect(resultado)
    .toBe(true);
  });

  it('Debe desactivar los botones internos', () => {
    component.buttons = [new MyButton('1'), new MyButton('2')];
    let resultado = true;
    component.desactivarBotonesInternos();
    for (const button of component.buttons) {
      resultado = resultado && button.disabled;
    }
    expect(resultado)
    .toBe(true);
  });

  it('Debe activar los botones externos', () => {
    component.buttonsExt = [new MyButton('1'), new MyButton('2')];
    component.activarBotonesExternos();
    let resultado = true;
    for (const button of component.buttonsExt) {
      resultado = resultado && !button.disabled;
    }
    expect(resultado)
    .toBe(true);
  });

  it('Debe desactivar los botones externos', () => {
    component.buttonsExt = [new MyButton('1'), new MyButton('2')];
    component.desactivarBotonesExternos();
    let resultado = true;
    for (const button of component.buttonsExt) {
      resultado = resultado && button.disabled;
    }
    expect(resultado)
    .toBe(true);
  });
});
