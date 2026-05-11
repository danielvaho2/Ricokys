# Ricokys

Aplicación fullstack de punto de venta con gestión de productos, registro de ventas y control de turnos.

## Estructura del proyecto

- `backend/`: servidor Express con conexión a base de datos SQL Server.
- `frontend/`: aplicación React con Vite y React Router.
- `README.MD`: documentación principal del proyecto.

## Tecnologías

### Backend
- Node.js
- Express
- `mssql`
- `dotenv`
- `cors`
- `nodemon`

### Frontend
- React 19
- Vite
- React Router DOM 7
- ESLint

## Instalación

1. Clona el repositorio.
2. Instala dependencias del backend:
   ```bash
   cd backend
   npm install
   ```
3. Instala dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuración

En el backend crea un archivo `.env` con los datos de conexión a la base de datos. Ejemplo:

```env
DB_SERVER=localhost
DB_NAME=NombreDeLaBase
DB_USER=usuario
DB_PASSWORD=clave
DB_INSTANCE=SQLEXPRESS
PORT=3000
```

> El backend usa SQL Server mediante `mssql`. Ajusta los valores según tu entorno.

## Ejecución

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Endpoints disponibles

### Productos
- `GET /productos/` - Obtener lista de productos.
- `POST /productos/insertar` - Insertar un producto.
- `POST /productos/eliminar` - Eliminar un producto.
- `GET /test` - Prueba de conexión a la base de datos y listado simple.

### Turnos
- `POST /turno/abrir` - Abrir turno.
- `POST /turno/cerrar` - Cerrar turno.
- `GET /turno/activo` - Obtener el turno activo.

### Ventas
- `POST /ventas/` - Registrar una venta.
- `GET /ventas/get` - Obtener ventas.
- `GET /ventas/resumen` - Obtener resumen de ventas.

## Notas importantes

- El frontend consume la API en `http://localhost:3000`.
- El servidor backend se inicia con `nodemon src/server.js`.
- Ajusta la conexión a la base de datos SQL Server en `backend/src/db/db.js`.

## Flujo general

1. Abre un turno en el backend mediante `/turno/abrir`.
2. Obtén productos y registra ventas desde el frontend.
3. Cierra el turno con `/turno/cerrar`.
