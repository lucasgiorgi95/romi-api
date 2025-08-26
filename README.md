# API de Gestión de Pacientes

API RESTful para el manejo de pacientes y sus síntomas, construida con Node.js, TypeScript, Express y TypeORM con SQLite.

## 🚀 Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Git (opcional)

## 🛠 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/romi-api.git
   cd romi-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configuración del entorno**
   - Copiar el archivo `.env.example` a `.env`
   - Configurar las variables según sea necesario

## ⚙️ Configuración

Archivo `.env`:
```env
PORT=4000
NODE_ENV=development
DB_FILENAME=database.sqlite
```

## 🚦 Iniciar la aplicación

### Desarrollo
```bash
# Modo desarrollo con reinicio automático
npm run dev
```

### Producción
```bash
# Compilar TypeScript a JavaScript
npm run build

# Iniciar la aplicación
npm start
```

## 📚 Documentación de la API

### Endpoints

#### Crear un nuevo paciente
```http
POST /api/pacientes
Content-Type: application/json

{
    "nombre": "Juan Pérez",
    "edad": 35,
    "sintomas": ["dolor de cabeza", "fiebre"]
}
```

#### Obtener todos los pacientes
```http
GET /api/pacientes
```

#### Obtener un paciente por ID
```http
GET /api/pacientes/1
```

#### Actualizar un paciente
```http
PUT /api/pacientes/1
Content-Type: application/json

{
    "nombre": "Juan Pérez López",
    "edad": 36,
    "sintomas": ["dolor de cabeza", "fiebre", "tos seca"]
}
```

#### Eliminar un paciente
```http
DELETE /api/pacientes/1
```

### Health Check
```http
GET /health
```

## 🧪 Pruebas

### Ejecutar pruebas
```bash
npm test
```

### Ejecutar linter
```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── config/           # Configuraciones
├── controllers/      # Controladores
├── db/              # Configuración de la base de datos
├── entities/        # Entidades de TypeORM
├── middleware/      # Middlewares de Express
├── routes/          # Rutas de la API
├── utils/           # Utilidades
└── index.ts         # Punto de entrada de la aplicación
```

## 🛡️ Validaciones

- **Nombre**: Requerido, máximo 100 caracteres
- **Edad**: Número entero entre 0 y 120
- **Síntomas**: Array de strings, no puede estar vacío

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
# romi-api
