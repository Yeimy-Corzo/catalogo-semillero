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
- El boton "Cambiar rol" alterna entre la vista admin (tabla) y la vista customer (tarjetas)
- El selector filtra los productos por categoria

## Taller 02 Servicios DI y HttpClient
Rama `frontend-02`

- Ahora el catalogo trae los productos de la Fake Store API de Platzi
- La URL base esta en `src/environments/environment.ts`
- Las peticiones se hacen desde ProductoService y CategoriaService y no desde los componentes
- El selector de categorias le pide a la API solo los productos de esa categoria
- Mientras cargan los productos sale "Cargando productos..."
- Si no hay productos sale un mensaje avisando
- El carrito esta en CarritoService y se guarda en LocalStorage asi que no se borra al recargar
- Si no hay internet sale un mensaje en pantalla
- La API no trae stock entonces el servicio le pone stock 10 a cada producto para que salga el boton de agregar al carrito sin tocar la tarjeta del Taller 01