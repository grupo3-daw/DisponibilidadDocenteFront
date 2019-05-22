import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) {}

  onSubmit() {
    return this.http.get('...');
  }
}
