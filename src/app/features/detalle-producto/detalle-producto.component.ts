import { Component, inject, signal } from '@angular/core';
import { switchMap, catchError, of} from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent {
  private ruta = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  errorCarga = signal<string | null>(null);

   producto$ = this.ruta.paramMap.pipe(
    switchMap(params => {this.errorCarga.set(null); return this.productoService.obtenerPorId(Number(params.get('id'))).pipe(
     catchError((error) => {
      console.error('error al cargar el producto', error);
      this.errorCarga.set('el producto no existe');
      return of(null);
     })
    ); 
  })
  );
  productosRelacionados$ = this.productoService.obtenerTodos();
}
