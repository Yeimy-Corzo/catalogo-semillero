import {Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  iniciarSesion (usuario: string, clave: string): boolean {
    if (clave === 'wposs123'){
      const sesion = { usuario: usuario, rol: usuario === 'admin' ? 'admin' : 'usuario' };
      localStorage.setItem('usuario', JSON.stringify(sesion));
      return true; 
    }
    return false; 
  }
  cerrarSesion(): void {
      localStorage.removeItem('usuario');
  } 

  estaAutenticado(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  tieneRol (rol: string): boolean {
    const texto = localStorage.getItem('usuario');
    if (texto === null)  {
      return false;
    } 
  const usuario = JSON.parse(texto); 
  return usuario.rol === rol;
  }
}
