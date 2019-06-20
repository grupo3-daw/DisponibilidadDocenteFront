import { HttpHeaders } from '@angular/common/http';

export class WebAddress {
  headers: HttpHeaders;
  private dominio: string;
  private siguientes: string;
  private readonly queryParams: Array<any> = [];
  private readonly formData: Array<any> = [];
  constructor(url: string) {
    let headers;
    if (localStorage.getItem('token')) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    this.dominio = url;
    this.siguientes = '';
    this.headers = headers;
  }

  setUrlPath(url: string): void {
    this.dominio = url;
  }

  addUrl(ruta: string): void {
    if (ruta !== undefined && ruta !== null && ruta !== '') {
      this.siguientes += '/' + `${ruta}`;
    }
  }

  setSiguientes(ruta: string): void {
    if (ruta !== undefined && ruta !== null && ruta !== '') {
      this.siguientes = '/' + `${ruta}`;
    }
  }

  addHeaders(headers: Array<{ name: any; value: any }>): void {
    headers.forEach(header => {
      this.addHeader(header);
    });
  }

  addQueryParams(query: { name: any, value: any }): void {
    const indice = this.queryParams.indexOf(query);
    if (indice >= 0) {
      this.queryParams[indice] = query;
    } else {
      this.queryParams.push(query);
    }
  }

  addFormData(data: { name: any, value: any }): void {
    const indice = this.formData.indexOf(data);
    if (indice >= 0) {
      this.formData[indice] = data;
    } else {
      this.formData.push(data);
    }
  }

  getFormData(): any {
    return this.formData;
  }

  getUrl(): string {
    return this.dominio + this.siguientes;
  }

  getHeaders(): HttpHeaders {
    return this.headers;
  }

  getHeaderKeys(): Array<string> {
    return this.headers.keys();
  }

  private addHeader(header: { name: any, value: any }): void {
    if (this.headers.has(header.name)) {
      this.headers.delete(header.name);
    }
    this.headers.append(header.name, header.value);
  }
}
