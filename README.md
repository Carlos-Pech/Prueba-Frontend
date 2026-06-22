# Frontend - Sistema de Inventario

Este proyecto fue desarrollado con Angular y forma parte de un sistema de inventario con autenticación JWT y CRUD de productos.

---

## 🚀 Tecnologías utilizadas

- Angular 20
- TypeScript
- HttpClient
- Reactive Forms
- Angular Router
- Guards (AuthGuard / NoAuthGuard)
- HTTP Interceptor (JWT)
- Tailwind CSS

---

## Descripción del proyecto

Aplicación frontend que permite:

- Autenticación de usuarios mediante JWT
- Protección de rutas privadas
- Gestión completa de productos (CRUD)
- Validaciones en formularios
- Consumo de API REST

---

##  Autenticación

- Login con usuario o correo + contraseña
- El backend devuelve un token JWT
- El token se guarda en `localStorage`
- El token se envía automáticamente en cada request mediante un interceptor

---

##  Seguridad

### AuthGuard
Protege rutas como `/products` evitando acceso sin autenticación.

### NoAuthGuard
Evita que usuarios autenticados accedan al login.

### HTTP Interceptor
- Agrega el token JWT a las peticiones
- Maneja errores 401 (Unauthorized)
- Redirige al login si el token expira

---

##  Rutas principales

- `/login` → inicio de sesión
- `/products` → gestión de productos (protegido)
- `/` → redirección automática

---

##  Funcionalidades

- Login de usuario
- Guardado de token JWT
- Listado de productos
- Crear producto
- Editar producto
- Eliminar producto
- Validaciones en formularios

---

##  Validaciones

- Nombre obligatorio
- Precio mayor a 0
- Stock no negativo
- Validaciones en tiempo real

---

##  API consumida

El frontend consume los siguientes endpoints:

- POST `/api/auth/login`
- GET `/api/products`
- GET `/api/products/{id}`
- POST `/api/products`
- PUT `/api/products/{id}`
- DELETE `/api/products/{id}`

---

##  Cómo ejecutar el proyecto

```bash
npm install
ng serve
