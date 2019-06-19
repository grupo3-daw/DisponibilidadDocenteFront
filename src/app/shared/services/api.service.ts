import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Consulta } from './consulta.enum';
import { NotificationService } from './notification.service';
import { Dominio } from './url.enum';
import { WebAddress } from './web-address';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  results: any = undefined;
  webAddress: WebAddress;
  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {
    this.webAddress = new WebAddress(Dominio.LOCAL);
  }

  devolverFecha(fecha): string {
    const array = fecha.split('/');
    const nuevaFecha = array[2] + '-' + array[1] + '-' + array[0];

    return nuevaFecha;
  }

  agregarRutasDominio(ruta: any): void {
    this.webAddress.setSiguientes(ruta);
  }

  agregarHeaders(headers: Array<{ name: any; value: any }>): void {
    this.webAddress.addHeaders(headers);
  }

  /**
   *
   * @param tipo Consulta
   * @param body any
   * @param headers HttpHeaders
   * @param mostrarAlertaSuccess boolean
   * @param mostrarAlertaError boolean
   */
  async operacion<T = any>(
    ruta: string,
    tipo: Consulta = Consulta.GET,
    body: any = {},
    headersOld: HttpHeaders = this.webAddress.getHeaders(),
    mostrarAlertaSuccess = false,
    mostrarAlertaError = true
  ): Promise<T> {
    let headers = headersOld;
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      headers = new HttpHeaders(
        { 'Content-Type': 'application/json', 'Authorization': token }
      )
    }

    let consulta;
    this.webAddress.setSiguientes(ruta);
    switch (tipo) {
      case Consulta.POST:
        consulta = this.http
          .post(this.webAddress.getUrl(), body, { headers })
          .toPromise<any>();

        break;
      case Consulta.PATCH:
        consulta = this.http
          .patch(this.webAddress.getUrl(), body, { headers })
          .toPromise<any>();

        break;
      case Consulta.PUT:
        consulta = this.http
          .put(this.webAddress.getUrl(), body, { headers })
          .toPromise<any>();

        break;
      default:
        consulta = this.http
          .get(this.webAddress.getUrl(), { headers })
          .toPromise<any>();
        break;
    }

    const resultado = this.evaluate(consulta, mostrarAlertaError)
      .then(resultados => {
        if (resultados !== undefined) {
          return this.validacionMensajes(
            resultados,
            mostrarAlertaSuccess
          );
        }
        this.notificationService.mostrarMensajeError(resultados.msg);

        return undefined;
      })
      .catch(error => Promise.reject(new Error(''))
      );

    return resultado;
  }

  async evaluate(promise, mostrarError = true): Promise<any> {
    const router = this.router;

    return promise
      .then(async res => {
        if (res.error) {
          throw new Error(res.message);
        }

        return Promise.resolve(res);
      })
      .catch(async error => {
        let message = 'Ocurrió un problema al procesar su solicitud';
        switch (error.status || 500) {
          case 400:
            message = 'Acceso Denegado';
            break;
          case 401:
            message = 'Recurso no autorizado';
            break;
          case 403:
            message = 'Recurso no autorizado';
            break;
          case 404:
            message = 'Recurso no encontrado';
            break;
          case 429:
            message = 'Muchas consultas';
            break;
          case 0:
          case 500:
          case 502:
          case 503:
          case 504:
          default:
            message = 'No se pudo conectar con el servidor';
            break;
        }
        message = error.error.msg || message;
        if (mostrarError) {
          this.notificationService.mostrarMensajeError(message);
        }
        console.error(`${error.status} - ${error.statusText}: ${message}`);

        return Promise.reject(new Error(message));
      });
  }

  private validacionMensajes(
    resultados: any,
    mostrarSucces: boolean
  ): any {
    let msg = '';

    if (resultados.msg) {
      msg = resultados.msg;
    }

    if (resultados.success) {
      if (mostrarSucces) {
        this.notificationService.mostrarMensajeInfo(msg);
      }
    }

    return resultados;
  }
}
