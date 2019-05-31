import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly toastr: ToastrService) { }

  mostrarMensajeInfo(titulo, body = ''): void {
    this.toastr.clear()
    setTimeout(() => {
      this.toastr.info(body, titulo);
    }, 10);
  }

  mostrarMensajeSuccess(titulo, body = ''): void {
    setTimeout(() => {
      this.toastr.success(body, titulo);
    }, 0);
  }

  mostrarMensajeErrorServidor(): void {
    setTimeout(() => {
      this.toastr.error('', 'Error de Servidor');
    }, 0);
  }

  mostrarMensajeError(titulo = '', body = '', limpiar = false): void {
    if (limpiar) {
      this.toastr.clear();
    }
    this.toastr.error(body, titulo);
  }

  camposImcompletos(): void {
    this.toastr.clear();
    this.toastr.error('', 'Faltan llenar campos');
  }
}
