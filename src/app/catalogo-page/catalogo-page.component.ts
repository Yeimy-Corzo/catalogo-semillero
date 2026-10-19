import { Component, signal, computed, inject } from '@angular/core';
import { productos} from '../models/productos';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';
import { TablaProductosComponent } from '../tabla-productos/tabla-productos.component';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';

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

  private categoriaService = inject(CategoriaService);
  categorias$ = this.categoriaService.obtenerTodas();

  productos = signal(productos);
  carrito = signal<Producto[]>([]);
  rol = signal<'admin' | 'customer'>('customer');

  cambiarRol() {
    this.rol.update(rolActual =>
      rolActual === 'admin' ? 'customer' : 'admin'
    );
  }

  agregarProducto(producto: Producto) {
    this.carrito.update(carritoActual => [
      ...carritoActual,
      producto
    ]);
  }

  cantidadProductos = computed(() => this.carrito().length);
  totalCarrito = computed(() =>
  this.carrito().reduce((total, producto) => total + producto.price, 0)

);
categoriaSeleccionada = signal<number | null>(null); 
productosFiltrados = computed(() => {
  const categoria = this.categoriaSeleccionada();

  if (categoria === null) {
    return this.productos();
  }

  return this.productos().filter(
    producto => producto.category.id === categoria
  );
});
trackById(index: number, producto: Producto): number {
  return producto.id;
}
}


