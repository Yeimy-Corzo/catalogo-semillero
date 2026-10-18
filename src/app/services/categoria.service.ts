import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private categoriasUrl = environment.apiURL + '/categories'; 

   obtenerTodas(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(this.categoriasUrl).pipe(
      catchError ((error) => {
        console.error('Error al cargar categorias', error);
        return of([]);
      })  
    );
}
  constructor() { }
}
