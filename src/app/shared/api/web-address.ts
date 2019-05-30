import { HttpHeaders } from '@angular/common/http'

export class WebAddress {
  public headers: HttpHeaders
  private dominio: string
  private siguientes: string
  private queryParams: any[] = []
  private formData: any[] = []
  private token = ''
  constructor(url: string) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" })

    this.dominio = url
    this.siguientes = ''
    this.headers = headers
  }

  setUrlPath(url: string) {
    this.dominio = url
  }

  addUrl(ruta: any) {
    if (ruta !== undefined && ruta !== null && ruta !== '') {
      this.siguientes += '/' + ruta
    }
  }

  setSiguientes(ruta: any) {
    if (ruta !== undefined && ruta !== null && ruta !== '') {
      this.siguientes = '/' + ruta
    }
  }

  private addHeader(header: { name; value }) {
    if (this.headers.has(header.name)) {
      this.headers.delete(header.name)
    }
    this.headers.append(header.name, header.value)
  }

  addHeaders(headers: { name; value }[]) {
    for (const header of headers) {
      this.addHeader(header)
    }
  }

  addQueryParams(query: { name; value }) {
    const indice = this.queryParams.indexOf(query)
    if (indice >= 0) {
      this.queryParams[indice] = query
    } else {
      this.queryParams.push(query)
    }
  }

  addFormData(data: { name; value }) {
    const indice = this.formData.indexOf(data)
    if (indice >= 0) {
      this.formData[indice] = data
    } else {
      this.formData.push(data)
    }
  }

  getFormData() {
    return this.formData
  }

  public getUrl(): string {
    return this.dominio + this.siguientes
  }

  public getHeaders(): HttpHeaders {
    return this.headers
  }

  public getHeaderKeys(): string[] {
    return this.headers.keys()
  }
}
