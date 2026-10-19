import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items = signal<Producto[]>([]);
  productos = this.items.asReadonly();
  readonly cantidad = computed(() => this.items().length);
  readonly total = computed(() => this.items().reduce((suma, p) => suma + p.price, 0));

  private readonly CLAVE = 'carrito_wposs';

  agregar(producto: Producto): void {
    this.items.update((lista) => [...lista, producto]);
    this.persistir();
  }

  quitar(id: number): void {
    this.items.update((lista) => lista.filter((p) => p.id !== id));
    this.persistir();
  }

  vaciar(): void {
    this.items.set([]);
    this.persistir();
  }

  private persistir(): void {
    localStorage.setItem(this.CLAVE, JSON.stringify(this.items()));
  }

  constructor() {
    try {
      const guardado = localStorage.getItem(this.CLAVE);
      if (guardado) {
        this.items.set(JSON.parse(guardado));
      }
    } catch {
      this.items.set([]);
    }
  }
}

