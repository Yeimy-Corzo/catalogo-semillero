import { Component, inject, OnInit, ElementRef, ViewChild, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { PuedeSalir } from '../../../guards/cambios-sin-guardar.guard';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})

export class FormularioProductoComponent implements OnInit, PuedeSalir {
  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  categorias$ = this.categoriaService.obtenerTodas();
  caracteresRestantes = 500;
  guardando = signal(false);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  error = signal<string | null>(null);
  @ViewChild('formularioElement') formularioElement!: ElementRef<HTMLFormElement>;
  puedeSalir(): boolean {
    return !this.formularioProducto.dirty;
  }

  formularioProducto = this.fb.nonNullable.group({
    codigo: [{ value: 0, disabled: true }],
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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productoService.obtenerPorId(Number(idParam)).subscribe(producto => {
        this.imagenes.clear();
        producto.images.forEach(url =>
          this.imagenes.push(this.fb.nonNullable.control(url, [Validators.required]))
        );
        this.formularioProducto.patchValue({
          codigo: producto.id,
          titulo: producto.title,
          precio: producto.price,
          descripcion: producto.description,
          categoriaId: producto.category.id,
        });
      });
    }
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
    const valores = this.formularioProducto.getRawValue();
    const datos = {
      codigo: valores.codigo,
      title: valores.titulo,
      price: valores.precio,
      description: valores.descripcion,
      categoryId: valores.categoriaId,
      images: valores.imagenes,
    };

        this.guardando.set(true);
    this.error.set(null);

    const idParam = this.route.snapshot.paramMap.get('id');

    const peticion$ = idParam
      ? this.productoService.actualizar(Number(idParam), datos)
      : this.productoService.crear(datos);

    peticion$.subscribe({
      next: () => {
        this.guardando.set(false);
        this.formularioProducto.markAsPristine();
        this.router.navigate(['/admin/productos']);
      },
      error: () => {
        this.guardando.set(false);
        this.error.set('No se pudo guardar el producto. Intenta de nuevo.');
      },
    });
  
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
