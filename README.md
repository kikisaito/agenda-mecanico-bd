# Agenda Mecánico - Capa de Persistencia

Este repositorio contiene la configuración, el modelado de datos y los scripts de población inicial para el sistema de gestión de citas de un taller mecánico. El proyecto está desarrollado bajo un entorno Node.js utilizando TypeScript y el ORM Prisma en su versión 7.

## Desarrollo Asistido por Inteligencia Artificial (IA)

El desarrollo de este módulo de base de datos ha sido realizado con la asistencia de Inteligencia Artificial. La IA fue integrada como una herramienta estratégica para:

1. **Gestión de Versiones**: Resolución de incompatibilidades y cambios disruptivos introducidos en la versión 7 de Prisma.
2. **Diseño de Arquitectura de Conexión**: Implementación de Driver Adapters para permitir la comunicación directa con infraestructuras en la nube (Render).
3. **Depuración de Conectividad**: Resolución de protocolos SSL y handshakes de seguridad requeridos por proveedores externos.

## Stack Tecnológico

- **Entorno de Ejecución**: Node.js (Módulos ESM).
- **Lenguaje**: TypeScript.
- **ORM**: Prisma 7.8.0.
- **Base de Datos**: PostgreSQL (Instancia en Render).
- **Controladores**: pg, @prisma/adapter-pg (Driver Adapter).
- **Ejecución de Scripts**: TSX.

## Modelos de Datos

El esquema se compone de las siguientes entidades principales:

- **Usuario**: Registro de clientes y mecánicos con control de acceso y roles.
- **TipoServicio**: Catálogo de servicios técnicos con definición de tiempos y afectación a la capacidad del taller.
- **Cita**: Gestión de solicitudes de servicio, vinculación de usuarios y estados del flujo de trabajo.
- **OcupacionDiaria**: Control de carga operativa por fecha y horario.
- **ConfiguracionTaller**: Definición de parámetros de negocio (capacidad diaria, horarios de apertura y cierre).

## Configuración de Variables de Entorno

Para que el proyecto funcione correctamente, es imperativo crear un archivo `.env` en la raíz del directorio. La cadena de conexión debe incluir explícitamente el parámetro de seguridad SSL para evitar cierres de conexión por parte del servidor:

DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD?sslmode=require"

## Guía de Despliegue

### 1. Instalación
Descargar e instalar todas las dependencias del proyecto:
npm install

### 2. Generación del Cliente
Construir el motor de Prisma basado en el esquema y la configuración de adaptadores de la versión 7:
npx prisma generate

### 3. Sincronización de Base de Datos
Proyectar el modelo definido en `schema.prisma` directamente hacia la instancia de Render:
npx prisma db push

### 4. Población de Datos (Seed)
Ejecutar el script para insertar los servicios base y la configuración operativa:
npx prisma db seed

## Notas Técnicas sobre Conectividad

Debido a que el proyecto utiliza la versión 7 de Prisma, la conexión directa por TCP se realiza mediante un adaptador de base de datos. En el archivo `seed.ts`, se ha configurado un `Pool` de conexiones que gestiona el cifrado SSL con la propiedad `rejectUnauthorized: false`, permitiendo la comunicación segura con certificados dinámicos.
