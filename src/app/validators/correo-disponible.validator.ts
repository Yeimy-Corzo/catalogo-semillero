import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export function correoDisponible(usuarioService: UsuarioService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>
    usuarioService.correoDisponible(control.value).pipe(
      map(disponible => (disponible ? null : { correoEnUso: true }))
    );
}