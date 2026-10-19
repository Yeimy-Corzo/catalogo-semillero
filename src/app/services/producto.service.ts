import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto';
import { Observable, catchError, of, map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private productosUrl = environment.apiURL + '/products';

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      map((productos) => productos.map((p) => ({ ...p, stock: 10 }))),
      catchError((error) => {
        console.error('Error al cargar productos', error);
        return of([]);
      })
    );
  }
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.productosUrl}/${id}`);
  }
  crear(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto);
  }

  actualizar(id: number, cambios: Partial<Producto>): Observable<Producto> {
    return this.http.put<Producto>(`${this.productosUrl}/${id}`, cambios);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.productosUrl}/${id}`);
  }

  obtenerPorCategoria(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.productosUrl}/?categoryId=${id}`).pipe(
    map((productos) => productos.map((p) => ({ ...p, stock: 10 })))
  );
  }

  constructor() { }
}
