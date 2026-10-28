import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private usuariosUrl = environment.apiURL + '/users';

  correoDisponible(correo: string): Observable<boolean> {
    return this.http
      .post<{ isAvailable: boolean }>(`${this.usuariosUrl}/is-available`, { email: correo })
      .pipe(map(respuesta => respuesta.isAvailable));
  }
}