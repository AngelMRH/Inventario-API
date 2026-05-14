# 🏪 Inventory API

REST API con autenticación JWT y control de acceso por roles (RBAC), construida con Node.js, Express, PostgreSQL y Prisma.

## ✨ Features

- 🔐 Autenticación con JWT (Access Token + Refresh Token)
- 👥 Control de acceso por roles: `ADMIN`, `EDITOR`, `USER`
- 📦 CRUD completo de productos con paginación y filtros
- ✅ Validación de inputs con Zod
- 📚 Documentación interactiva con Swagger UI
- 🧪 Tests automatizados con Jest + Supertest
- 🚀 Deploy en Railway

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| Node.js + Express | Servidor |
| PostgreSQL + Prisma | Base de datos |
| JWT + bcrypt | Autenticación |
| Zod | Validación |
| Swagger | Documentación |
| Jest + Supertest | Testing |

## 🚦 Roles y Permisos

| Endpoint | USER | EDITOR | ADMIN |
|---|---|---|---|
| GET /api/products | ✅ | ✅ | ✅ |
| POST /api/products | ❌ | ✅ | ✅ |
| PUT /api/products/:id | ❌ | ✅ | ✅ |
| DELETE /api/products/:id | ❌ | ❌ | ✅ |
| GET /api/users | ❌ | ❌ | ✅ |

## 🚀 Instalación local

```bash
# 1. Clonar e instalar
git clone https://github.com/AngelMRH/inventory-api
cd inventory-api
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tu conexión a PostgreSQL y secretos JWT

# 3. Crear base de datos con Prisma
npx prisma migrate dev --name init
npx prisma generate

# 4. Arrancar en desarrollo
npm run dev
```

## 📡 Endpoints principales

### Auth
```
POST /api/auth/register   → Registrar usuario
POST /api/auth/login      → Login (devuelve tokens)
POST /api/auth/refresh    → Renovar access token
POST /api/auth/logout     → Cerrar sesión
```

### Products (requiere Bearer token)
```
GET    /api/products          → Listar productos (paginado)
GET    /api/products/:id      → Obtener producto
POST   /api/products          → Crear (EDITOR, ADMIN)
PUT    /api/products/:id      → Actualizar (EDITOR, ADMIN)
DELETE /api/products/:id      → Eliminar (solo ADMIN)
```

### Users (requiere Bearer token)
```
GET /api/users     → Listar usuarios (solo ADMIN)
GET /api/users/me  → Mi perfil
```

## 📚 Documentación

Disponible en `http://localhost:3000/api-docs` con Swagger UI interactivo.

##  Tests

```bash
npm test
```

## 🌐 Demo en vivo

[https://inventory-api.railway.app](https://inventory-api.railway.app/api-docs)

##  Autor

**Angel Manuel Ruiz Herrera**  
GitHub: [@AngelMRH](https://github.com/AngelMRH)
