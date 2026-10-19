import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto';
import { Observable, catchError, of, map, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private productosUrl = environment.apiURL + '/products';
  errorCarga = signal<string | null>(null);
  errorGuardado = signal<string | null>(null);

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      map((productos) => productos.map((p) => ({ ...p, stock: 10 }))),
      catchError((error) => {
        console.error('Error al cargar productos', error);
        this.errorCarga.set('no se pudieron cargar los productos. revise su conexion');
        return of([]);
      })
    );
  }
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.productosUrl}/${id}`);
  }
  crear(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto).pipe(
      catchError((error)=> {
        this.errorGuardado.set('no se pudo crear el producto'); 
        return throwError(()=>error);
      })
    );
  }

  actualizar(id: number, cambios: Partial<Producto>): Observable<Producto> {
    return this.http.put<Producto>(`${this.productosUrl}/${id}`, cambios).pipe(
      catchError((error)=> {
        this.errorGuardado.set('no se pudo actualizar el producto'); 
        return throwError(()=>error);
      })
    );
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.productosUrl}/${id}`).pipe(
      catchError((error)=> {
        this.errorGuardado.set('no se pudo eliminar el producto'); 
        return throwError(()=>error);
      })
    );
  }

  obtenerPorCategoria(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.productosUrl}/?categoryId=${id}`).pipe(
      map((productos) => productos.map((p) => ({ ...p, stock: 10 }))),
     catchError((error) => {
        console.error('Error al cargar productos', error);
        this.errorCarga.set('no se pudieron cargar los productos. revise su conexion');
        return of([]);
      })
    );
  }

  constructor() { }
}
