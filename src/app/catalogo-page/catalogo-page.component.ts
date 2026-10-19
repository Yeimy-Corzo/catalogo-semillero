import { Component, signal, inject } from '@angular/core';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';
import { TablaProductosComponent } from '../tabla-productos/tabla-productos.component';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,
  imports: [CommonModule, TablaProductosComponent, TarjetaProductoComponent],
  templateUrl: './catalogo-page.component.html',
  styleUrl: './catalogo-page.component.css'
})
export class CatalogoPageComponent {
  private productoService = inject(ProductoService);
  productos$ = this.productoService.obtenerTodos();
  errorCarga = this.productoService.errorCarga; 
  errorGuardado = this.productoService.errorGuardado; 

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
    if (id) {
      this.productos$ = this.productoService.obtenerPorCategoria(id);
    } else {
      this.productos$ = this.productoService.obtenerTodos();
    }
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


