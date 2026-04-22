# Agenda Mecánico - Capa de Persistencia

Este repositorio contiene la configuración y el modelo de datos para el sistema de gestión de citas de un taller mecánico. El proyecto está construido sobre un entorno de ejecución Node.js utilizando TypeScript y el ORM Prisma en su versión 7.

## Arquitectura Técnica

El proyecto implementa una arquitectura moderna basada en módulos de ECMAScript (ESM) y utiliza las siguientes tecnologías clave:

- **Prisma 7.8.0**: Utilizado para el modelado de datos y la interfaz de consulta.
- **PostgreSQL**: Motor de base de datos relacional alojado en Render.
- **Driver Adapters**: Implementación obligatoria de Prisma 7 para conexiones directas mediante el paquete `pg` y `@prisma/adapter-pg`.
- **TSX**: Ejecutor de scripts de TypeScript para procesos de automatización y población de datos.

## Estructura del Modelo de Datos

La base de datos se rige por los siguientes modelos principales definidos en el esquema:

1. **Usuario**: Gestiona perfiles con roles diferenciados (cliente y mecánico).
2. **TipoServicio**: Catálogo que define la duración (en minutos o días) y si el servicio impacta en la capacidad diaria del taller.
3. **Cita**: Registro central que vincula usuarios con servicios, incluyendo estados de flujo (pendiente, aceptada, en curso, etc.).
4. **OcupacionDiaria**: Entidad de apoyo para el cálculo de capacidad y disponibilidad por fechas.
5. **ConfiguracionTaller**: Parámetros globales de operación como horarios y capacidad máxima por día.

## Configuración del Entorno

Para la ejecución del proyecto, es indispensable contar con un archivo `.env` en el directorio raíz. Debido a las políticas de seguridad de la infraestructura de Render, la cadena de conexión debe incluir obligatoriamente el modo SSL:

DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD?sslmode=require"

## Instrucciones de Despliegue

### 1. Instalación de Dependencias
Instalar los módulos necesarios para el desarrollo y la ejecución del cliente de base de datos:

npm install

### 2. Generación del Cliente Prisma
Este paso es crucial para sincronizar los tipos de TypeScript con el esquema definido. En Prisma 7, este comando lee la configuración desde `prisma.config.ts`:

npx prisma generate

### 3. Sincronización de Esquema (Push)
Para proyectar los modelos en la base de datos de Render sin el uso de migraciones tradicionales (ideal para fases de prototipado):

npx prisma db push

### 4. Población de Datos (Seed)
Para inicializar la base de datos con los servicios base y la configuración operativa del taller:

npx prisma db seed

## Notas sobre Prisma 7 y SSL

El proyecto utiliza un adaptador de controlador (`PrismaPg`) para gestionar la conexión. Esto permite una mayor flexibilidad y compatibilidad con entornos que requieren configuraciones de SSL específicas. En el script de semilla (`seed.ts`), se ha configurado el objeto `pool` con la propiedad `rejectUnauthorized: false` para permitir la comunicación cifrada con los certificados dinámicos de Render.
