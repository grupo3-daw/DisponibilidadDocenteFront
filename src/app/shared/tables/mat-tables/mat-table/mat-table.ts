import { Input, OnDestroy } from '@angular/core';
import { MyButton } from '@shared/buttons';

export interface ColumnaMaterialTable {
  header: string;
  columna: string;
  editable?: true;
}

export class MatTablePadre<T = any> implements OnDestroy {
  @Input() data: Array<T> = [];
  @Input() filterValue: string;
  @Input() displayedColumns: Array<ColumnaMaterialTable>;
  @Input() buttons: Array<MyButton>;
  @Input() buttonsExt: Array<MyButton>;
  @Input() pageSize = 10;
  filaEscogida: T;
  activo = true;
  loading = true;

  mantenerFiltro(filtro: string): void {
    setTimeout(() => {
      this.filterValue = filtro;
    }, 1);
  }

  actualizarFilaTabla(id: string, nuevoElemento: T, parametros: Array<string> = []): void {
    let fila: T;
    let i = 0;
    for (let index = 0; index < this.data.length; index++) {
      fila = this.data[index];
      i = index;
      if (fila[id] !== null && fila[id] === this.filaEscogida[id]) {
        index = this.data.length;
      }
    }
    if (parametros.length === 0) {
      fila = nuevoElemento;
      this.data[i] = fila;
    } else {
      for (const parametro of parametros) {
        fila[parametro] = nuevoElemento[parametro];
        this.data[i][parametro] = fila[parametro];
      }
    }
  }

  async desactivarBotonesInternos(): Promise<any> {
    const promise = await new Promise((resolve, reject) => {
      for (const button of this.buttons) {
        button.disabled = true;
      }
      resolve(true);
      reject(false);
    });

    return promise;
  }

  activarBotonesInternos(): void {
    for (const button of this.buttons) {
      button.disabled = false;
    }
  }

  desactivarBotonesExternos(): void {
    for (const button of this.buttonsExt) {
      button.disabled = true;
    }
  }

  activarBotonesExternos(): void {
    for (const button of this.buttonsExt) {
      button.disabled = false;
    }
  }

  ngOnDestroy(): void {
    this.activo = false;
  }
}
