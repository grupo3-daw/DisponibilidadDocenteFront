import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public mostrarMensajeInfo(titulo, body = '') {
    this.toastr.clear()
    setTimeout(() => {
      this.toastr.info(body, titulo)
    }, 10)
  }

  public mostrarMensajeSuccess(titulo, body = '') {
    setTimeout(() => {
      this.toastr.success(body, titulo)
    }, 0)
  }

  public mostrarMensajeErrorServidor() {
    /*setTimeout(() => {
      this.toastr.error('', 'Error de Servidor');
    }, 0);*/
    return
  }

  public mostrarMensajeError(titulo = '', body = '', limpiar: boolean = false) {
    if (limpiar) {
      this.toastr.clear()
    }
    this.toastr.error(body, titulo)
  }

  camposImcompletos() {
    this.toastr.clear()
    this.toastr.error('', 'Faltan llenar campos')
  }
}
