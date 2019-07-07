import { Seleccion } from './seleccion';

export class Selecciones {
  constructor(public data: Array<Seleccion> = []) { }

  eliminar(seleccion: Seleccion): boolean {
    const index = this.data.indexOf(seleccion);
    if (index >= 0) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }

  deseleccionar(seleccion: Seleccion) {
    const index = this.data.indexOf(seleccion);
    this.data[index].seleccionado = false;
  }
  devolverSoloNombre(): Array<string> {
    return this.data.filter(row => row.seleccionado).map(row => row.nombre);
  }
}
