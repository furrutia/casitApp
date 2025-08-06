# casitApp

casitApp es una aplicación backend desarrollada en Node.js con TypeScript, Express y Prisma, utilizando PostgreSQL como base de datos. El proyecto está preparado para ejecutarse en un entorno local mediante Docker.

## Tecnologías utilizadas

- **Node.js** y **TypeScript**: Para el desarrollo del servidor backend.
- **Express**: Framework para la creación de APIs REST.
- **Prisma**: ORM para la gestión de la base de datos PostgreSQL.
- **PostgreSQL**: Base de datos relacional.
- **Docker** y **docker-compose**: Para la gestión de contenedores y servicios.
- **dotenv** y **env-var**: Para la gestión de variables de entorno.

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

## Configuración inicial

1. **Clona el repositorio:**

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd casitapp
   ```

2. **Instala las dependencias:**

   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   Copia el archivo `.env.example` a `.env` y completa los valores necesarios:

   ```sh
   cp .env.example .env
   ```

   Edita el archivo `.env` para configurar la conexión a la base de datos y otros parámetros.

4. **Levanta la base de datos con Docker:**

   ```sh
   docker compose up -d
   ```

   Esto iniciará un contenedor de PostgreSQL configurado para el proyecto.

5. **Configura la base de datos con Prisma:**

   Ejecuta las migraciones para crear las tablas necesarias:

   ```sh
   npx prisma migrate deploy
   ```

   (O bien, si estás en desarrollo, puedes usar `npx prisma migrate dev`).

## Ejecución del proyecto

- **Modo desarrollo:**

  ```sh
  npm run dev
  ```

  Esto iniciará el servidor con recarga automática usando `ts-node-dev`.

- **Modo producción:**

  ```sh
  npm run build
  npm start
  ```

  Compila el proyecto y lo ejecuta desde la carpeta `dist`.

## Estructura del proyecto

```
casitapp/
├── src/                # Código fuente principal
│   └── app.ts          # Punto de entrada de la aplicación
├── prisma/             # Esquema y migraciones de Prisma
│   └── schema.prisma
├── postgres/           # Archivos de configuración y datos de PostgreSQL (usados por Docker)
├── .env                # Variables de entorno
├── docker-compose.yml  # Configuración de servicios Docker
├── package.json        # Dependencias y scripts
└── README.md           # Documentación del proyecto
```

## Comandos útiles

- **Verificar estado de la base de datos:**

  ```sh
  docker compose ps
  ```

- **Acceder a la base de datos:**

  ```sh
  docker exec -it <nombre_del_contenedor_postgres> psql -U <usuario>
  ```

- **Generar cliente Prisma:**

  ```sh
  npx prisma generate
  ```

## Notas

- Si modificas el esquema de la base de datos en `prisma/schema.prisma`, recuerda ejecutar las migraciones.
- Para pruebas locales, asegúrate de que los puertos configurados en Docker y en `.env` no estén en uso por otros servicios.

---

Si tienes dudas o problemas, revisa la documentación de cada tecnología o abre un issue en el repositorio.