import { Component, signal, inject } from '@angular/core';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';
import { TablaProductosComponent } from '../tabla-productos/tabla-productos.component';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { CarritoService } from '../services/carrito.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,
  imports: [CommonModule, TablaProductosComponent, TarjetaProductoComponent],
  templateUrl: './catalogo-page.component.html',
  styleUrl: './catalogo-page.component.css'
})
export class CatalogoPageComponent {
  private productoService = inject(ProductoService);
  errorCarga = this.productoService.errorCarga; 
  errorGuardado = this.productoService.errorGuardado; 

  private ruta = inject(ActivatedRoute);

  categoriaActual$ = this.ruta.queryParamMap.pipe(
  map(params => Number(params.get('categoria')))
  );

  productos$ = this.ruta.queryParamMap.pipe(
  switchMap(params => {
    const id = Number(params.get('categoria'));
    if (id) {
      return this.productoService.obtenerPorCategoria(id);
    } else {
      return this.productoService.obtenerTodos();
    }
  })
  );
  private router = inject(Router);

  private categoriaService = inject(CategoriaService);
  categorias$ = this.categoriaService.obtenerTodas();

  private carritoService = inject(CarritoService);

  rol = signal<'admin' | 'customer'>('customer');

  cambiarRol() {
    this.rol.update(rolActual =>
      rolActual === 'admin' ? 'customer' : 'admin'
    );
  }

  cambiarCategoria(id: number | null) {
  this.router.navigate([], { queryParams: { categoria: id }, queryParamsHandling: 'merge' });
  }

  agregarProducto(producto: Producto) {
    this.carritoService.agregar(producto);
  }

  cantidadProductos = this.carritoService.cantidad;
  totalCarrito = this.carritoService.total;

  trackById(index: number, producto: Producto): number {
    return producto.id;
  }
}


