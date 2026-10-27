import { Routes } from "@angular/router"
import { CatalogoPageComponent } from "./catalogo-page/catalogo-page.component"
import { LoginPageComponent } from "./features/login-page/login-page.component"
import { NoEncontradoComponent } from "./features/no-encontrado/no-encontrado.component"
import { authGuard } from "./guards/auth.guard"
import { adminGuard } from "./guards/admin.guard"


export const routes: Routes = [
    {path: '', redirectTo: 'productos', pathMatch: 'full' },
    {path: 'productos', component: 	CatalogoPageComponent, title: 'Catalogo'},
    {path: 'login', component: LoginPageComponent, title: 'Login'},
    {path: 'productos/:id', title: 'Detalles del producto', loadComponent:() => import('./features/detalle-producto/detalle-producto.component').then(m => m.DetalleProductoComponent),},
    {path: 'carrito', title: 'Mi carrito', canActivate: [authGuard], loadComponent: () => import('./features/carrito-page/carrito-page.component').then(m => m.CarritoPageComponent),},
    {path: 'admin', title:'Admin', canMatch: [adminGuard], loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),},
    {path: '**', component: NoEncontradoComponent, title: 'Pagina no encontrada'},
]