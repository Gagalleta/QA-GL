Aquí tienes el archivo README.md actualizado, tomando en cuenta que las pruebas de frontend y backend están en carpetas separadas y que también se incluye el reporte de Mochawesome:

# Proyecto: Información de Bandas Musicales - Backend

## **Descripción General**
Este proyecto backend permite consultar canciones de una banda musical a partir de la API pública de Itunes. Además, permite guardar una canción como favorita.

## **Requisitos de Instalación y Configuración**

### Backend
1. **Node.js** versión >= 14.x
2. **Paquete de gestor de dependencias** npm
3. **Docker & Docker-compose** en caso de querer correr el proyecto de esa manera.

### Dependencias del Proyecto
- **Backend:**
  - Chai
  - Chai-http
  - Mocha
  - Mochawesome
- **Frontend (Si se usa el frontend también):**
  - Selenium
  - Mocha/Mochawesome

## **Pasos para levantar la API Backend**
1. **Clonar este repositorio y entrar a la carpeta del proyecto:**
   ```bash
   git clone https://github.com/Gagalleta/QA-GL.git
   cd itunes-back-main

	2.	Instalar las dependencias:

npm install


	3.	Iniciar el servidor:

npm start



Correr con Docker-compose

Si prefieres usar Docker, puedes ejecutar el proyecto con Docker y Docker-compose:
	1.	Ejecutar docker-compose desde donde está ubicado el archivo “docker-compose.yml”:

docker-compose up



Probar la API

Accede a los endpoints disponibles en la dirección: http://localhost:3000

GET /search_tracks?name={nombre_banda}: Busca canciones de una banda.

POST /favoritos: Marca una canción como favorita.

Documentación SWAGGER

La documentación de la API está disponible en Swagger.
Una vez que el servidor esté en ejecución, accede a la URL: http://localhost:3000/api-docs para información detallada de cada endpoint.

QA-GL

Test QA engineer para Grupo Lagos :)

Estructura de pruebas:

Las pruebas están organizadas en dos carpetas: tests/frontend y tests/backend.
Los resultados de las pruebas se almacenan en la carpeta mochawesome-report.

Herramientas utilizadas:
	•	Frontend:
	•	Selenium
	•	Mocha/Mochawesome
	•	Backend:
	•	Chai
	•	Chai-http
	•	Mocha
	•	Mochawesome
	•	Reportes:
	•	Mochawesome

Casos de prueba aprobados:
	1.	GL-FR-05: Persistencia visual
El usuario realiza búsquedas consecutivas y la tabla se actualiza con los resultados de la nueva búsqueda.
	2.	GL-FR-09: Previsualización de canciones
El usuario reproduce una canción y la canción comienza a reproducirse correctamente.
	3.	GL-FR-10: Descarga de canciones
El usuario descarga una canción y la descarga comienza correctamente.
	4.	GL-FR-11: Velocidad de reproducción
El usuario cambia la velocidad de reproducción y la canción se reproduce a la velocidad seleccionada.
	5.	GL-FR-12: Detener reproducción
El usuario detiene la reproducción y la reproducción se detiene inmediatamente.
	6.	GL-FR-13: Silenciar reproducción
El usuario silencia la reproducción y el audio se silencia sin detener la reproducción.
	7.	GL-EN-01: Parámetros obligatorios faltantes
El backend valida que los parámetros obligatorios sean proporcionados en el endpoint POST /favoritos.
	8.	GL-EN-02: Canción no encontrada
El backend devuelve un error si la canción no existe al intentar agregarla a favoritos.
	9.	GL-EN-03: Límite de favoritos
El backend valida que no se pueda agregar más de 5 canciones a favoritos.
	10.	GL-EN-04: Obtención de favoritos
El backend permite obtener la lista de favoritos correctamente a través del endpoint GET /misfavoritos.
	11.	GL-EN-05: Caché en búsquedas
El backend maneja la caché para las búsquedas de canciones.

Instrucciones para ejecutar pruebas:
	1.	Clonar el repositorio.
	2.	Ejecutar npm install para instalar las dependencias necesarias.
	3.	Ejecutar las pruebas con:

npm run test
