import { Component } from '@angular/core';
import { PuedeSalir } from '../../../guards/cambios-sin-guardar.guard';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.css'
})
export class AdminProductosComponent implements PuedeSalir {
  hayCambios = false;

  marcarCambios(): void {
    this.hayCambios = true;
  }

  guardar(): void {
    this.hayCambios = false;
  }

  puedeSalir(): boolean {
    return !this.hayCambios;
  }

}
