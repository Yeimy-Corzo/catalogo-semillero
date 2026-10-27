import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent {
 private fb = inject(FormBuilder); 
 private categoriaService = inject(CategoriaService);
 categorias$ = this.categoriaService.obtenerTodas();
 caracteresRestantes = 500;
 @ViewChild('formularioElement') formularioElement!: ElementRef<HTMLFormElement>;

  formularioProducto = this.fb.nonNullable.group({
  titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/.*\S.*/)]],
  precio: [0, [Validators.required, Validators.min(1),]],
  descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
  imagenes: this.fb.array([this.nuevaImagen()]),
  categoriaId: [0, [Validators.required, Validators.min(1)]],
  
});

ngOnInit(): void {
    this.formularioProducto.controls.descripcion.valueChanges.subscribe(descripcion => {
      this.caracteresRestantes = 500 - descripcion.length;
    });
  }

get imagenes(): FormArray {
  return this.formularioProducto.controls.imagenes as FormArray;
}
get f() {
  return this.formularioProducto.controls;
}

guardar(): void {
  if (this.formularioProducto.invalid) {
    this.formularioProducto.markAllAsTouched();

    const primerCampo = this.formularioElement.nativeElement.querySelector(
      'input.ng-invalid, textarea.ng-invalid, select.ng-invalid'
    );
    primerCampo?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    return;
  }
  console.log(this.formularioProducto.getRawValue());
}


private nuevaImagen() {
  return this.fb.nonNullable.control('', [Validators.required]);
}

agregarImagen(): void {
  this.imagenes.push(this.nuevaImagen());
}
quitarImagen(i: number): void {
  if (this.imagenes.length > 1) {
    this.imagenes.removeAt(i);
  }
}

}
