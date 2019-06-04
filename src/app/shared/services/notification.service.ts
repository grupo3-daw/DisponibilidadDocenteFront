import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // tslint:disable-next-line: decorator-not-allowed
  @Output() readonly mostrandoSnackbar = new EventEmitter<{ body: string, titulo: string, color: 'primary' | 'accent' | 'error' }>();

  mostrarMensajeInfo(titulo: string, body = ''): void {
    setTimeout(() => {
      // this.toastr.info(body, titulo);
    }, 10);
    this.mostrandoSnackbar.emit({ body, titulo, color: 'primary' });
  }

  mostrarMensajeSuccess(titulo: string, body = ''): void {
    setTimeout(() => {
      // this.toastr.success(body, titulo);
    }, 0);
    this.mostrandoSnackbar.emit({ body, titulo, color: 'accent' });
  }

  mostrarMensajeErrorServidor(): void {
    setTimeout(() => {
      // this.toastr.error('', 'Error de Servidor');
    }, 0);
    this.mostrandoSnackbar.emit({ body:'', titulo:'Error de Servidor', color: 'error' });
  }

  mostrarMensajeError(titulo = '', body = '', limpiar = false): void {
    // this.toastr.error(body, titulo);
    this.mostrandoSnackbar.emit({ body, titulo, color: 'error' });
  }

  camposImcompletos(): void {
    // this.toastr.clear();
    // this.toastr.error('', 'Faltan llenar campos');
    this.mostrandoSnackbar.emit({ body: '', titulo: 'Faltan llenar campos', color: 'error' });
  }
}
