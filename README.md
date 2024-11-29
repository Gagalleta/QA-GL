# Proyecto: Información de Bandas Musicales - Backend

## **Descripción General**
Este proyecto backend permite consultar canciones de una banda musical a partir de la API pública de Itunes. 
Además, permite guardar una canción como favoritos.

## **Requisitos de Instalación y Configuración**
1. **Node.js** versión >= 14.x
2. **Paquete de gestor de dependencias** npm
3. **Docker & Docker-compose** en caso de querer correr el proyecto de esa manera.

## **Pasos para levantar la API Backend**
1. **Clonar este repositorio y entrar a la carpeta del proyecto:**
   ```bash
   git clone https://github.com/GrupoLagos/itunes-back-main.git
2. **Instalar las dependencias:**
   ```bash
   npm install
3. **Iniciar el servidor:**
   ```bash
   npm start 
## **Correr con Docker-compose**
1. **Ejecutar docker-compose desde donde está ubicado el archivo "docker-compose.yml"**
   ```bash
   docker-compose up
## **Probar la API** 
Accede a los endpoints disponibles en la dirección: http://localhost:3000

   **GET** /search_tracks?name={nombre_banda}: Busca canciones de una banda.

   **POST** /favoritos: Marca una canción como favorita.

## **Documentación SWAGGER**
La documentación de la API está disponible en Swagger.

Una vez que el servidor esté en ejecución, accede a la URL: **http://localhost:3000/api-docs** para información detallada de cada endpoint.
