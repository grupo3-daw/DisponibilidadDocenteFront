import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {
  constructor(private readonly api: ApiService) {
  }

  async obtenerUsuario(): Promise<Usuario> {
    return this.api.operacion('auth/user');
  }

}
