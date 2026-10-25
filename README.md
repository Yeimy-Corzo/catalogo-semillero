# Catalogo Semillero

Taller 01 del semillero WPOSS: catalogo de productos con componentes en Angular 17

## Requisitos
- Node.js
- Angular CLI 17

## Como levantar el proyecto
1. Clonar el repositorio
2. Entrar a la carpeta: `cd catalogo-semillero`
3. Instalar dependencias: `npm install`
4. Levantar el servidor: `ng serve`
5. Abrir `http://localhost:4200`

## Uso
- el boton "Cambiar rol" alterna entre la vista admin (tabla) y la vista customer (tarjetas)
- el selector filtra los productos por categoria

## Taller 02 Servicios DI y HttpClient
Rama `frontend-02`

- ahora el catalogo trae los productos de la Fake Store API de Platzi
- la URL base esta en `src/environments/environment.ts`
- las peticiones se hacen desde ProductoService y CategoriaService y no desde los componentes
- el selector de categorias le pide a la API solo los productos de esa categoria
- mientras cargan los productos sale "Cargando productos..."
- si no hay productos sale un mensaje avisando
- el carrito esta en CarritoService y se guarda en LocalStorage asi que no se borra al recargar
- si no hay internet sale un mensaje en pantalla
- sa API no trae stock entonces el servicio le pone stock 10 a cada producto para que salga el boton de agregar al carrito sin tocar la tarjeta del Taller 01

## Taller 03 
Rama `frontend-03`
- la aplicacion ahora tiene varias pantallas con URL propia: `/productos`, `/productos/:id`, `/carrito`, `/login` y `/admin`. y cualquier otra URL muestra la pagina de "no encontrado"
- el filtro por categoria se guarda en la URL (`?categoria=`) asi que sigue puesto al recargar y se puede compartir el enlace
- carga diferida: `/productos/:id` y `/carrito` cargan con `loadComponent`, y `/admin` con `loadChildren`. `ng build` muestra tres chunks separados
- login simulado: la clave es `wposs123`. El usuario `admin` tiene rol `admin` y cualquier otro usuario tiene rol `usuario`. La sesion se guarda en LocalStorage
- `authGuard` protege `/carrito`: sin sesion manda a `/login?volverA=`, y despues de iniciar sesion vuelve a la pagina que se queria abrir
- `adminGuard` protege `/admin` con `canMatch`: si el usuario no es admin, el chunk de admin no se descarga y se redirige a `/productos`
- el menu oculta los enlaces "Admin" y "Carrito" a quien no tiene acceso, ocultar no reemplaza a los guards, hacen falta los dos
- el panel de admin tiene un formulario que avisa antes de salir si hay cambios sin guardar (`CanDeactivate`)