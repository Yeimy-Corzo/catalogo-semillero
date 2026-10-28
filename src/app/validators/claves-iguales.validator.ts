import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const clavesIguales: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const clave = grupo.get('clave')?.value;
  const confirmacion = grupo.get('confirmacion')?.value;

  return clave === confirmacion ? null : { clavesDistintas: true };
};