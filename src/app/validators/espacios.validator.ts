import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const noSoloEspacios: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const texto = control.value;

  if (typeof texto !== 'string' || texto.length === 0) {
    return null;
  }

  return texto.trim().length === 0 ? { soloEspacios: true } : null;
};