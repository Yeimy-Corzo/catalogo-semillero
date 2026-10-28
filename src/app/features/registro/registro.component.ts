import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { clavesIguales } from '../../validators/claves-iguales.validator';
import { NgIf } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { correoDisponible } from '../../validators/correo-disponible.validator';
import { noSoloEspacios } from '../../validators/espacios.validator';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);


  formularioRegistro = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), noSoloEspacios]],
    correo: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [correoDisponible(this.usuarioService)],
      updateOn: 'blur'
    }],
    clave: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
    confirmacion: ['', [Validators.required]],
  }, { validators: clavesIguales }
  );
  registrar(): void {
  if (this.formularioRegistro.invalid) {
    this.formularioRegistro.markAllAsTouched();
    return;
  }

  console.log(this.formularioRegistro.getRawValue());
}
}
