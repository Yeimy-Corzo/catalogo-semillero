import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { cambiosSinGuardarGuard } from '../../guards/cambios-sin-guardar.guard';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';


export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: 'usuarios', component: AdminUsuariosComponent },
    { path: 'productos', component: AdminProductosComponent, canDeactivate: [cambiosSinGuardarGuard]},
    {path: 'productos/nuevo', component: FormularioProductoComponent, title: 'Nuevo producto'},
    { path: 'productos/:id/editar', component: FormularioProductoComponent, title: 'Editar producto', canDeactivate: [cambiosSinGuardarGuard] },
  ]},
];