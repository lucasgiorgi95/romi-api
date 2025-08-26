# ROMI API - Asistente Médico Virtual

API para gestión de pacientes y síntomas. Construida con Node.js, TypeScript y SQLite.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev
```

La API estará disponible en `http://localhost:4000`

## � Endupoints

| Método   | Ruta                 | Descripción         |
| -------- | -------------------- | ------------------- |
| `GET`    | `/health`            | Estado de la API    |
| `GET`    | `/api/pacientes`     | Listar pacientes    |
| `POST`   | `/api/pacientes`     | Crear paciente      |
| `GET`    | `/api/pacientes/:id` | Obtener paciente    |
| `PUT`    | `/api/pacientes/:id` | Actualizar paciente |
| `DELETE` | `/api/pacientes/:id` | Eliminar paciente   |

### Ejemplo de uso

```bash
# Crear paciente
curl -X POST http://localhost:4000/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan Pérez", "edad": 35, "sintomas": ["fiebre", "tos"]}'
```

## � ETecnologías

- **Node.js** + **TypeScript** - Runtime y tipado
- **Express.js** - Framework web
- **TypeORM** - ORM para base de datos
- **SQLite** - Base de datos embebida
- **Winston** - Logging
- **Class-validator** - Validaciones

## 📁 Estructura

```
src/
├── controllers/     # Lógica de negocio
├── entities/        # Modelos de datos
├── routes/          # Endpoints de la API
├── middleware/      # Validaciones y errores
└── config/          # Configuración
```

# romi-api
