import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { cambiosSinGuardarGuard } from '../../guards/cambios-sin-guardar.guard';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: 'productos', component: AdminProductosComponent },
    { path: 'usuarios', component: AdminUsuariosComponent },
    { path: 'productos', component: AdminProductosComponent, canDeactivate: [cambiosSinGuardarGuard] },
  ]},
];