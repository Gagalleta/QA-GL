# Proyecto: Información de Bandas Musicales - Backend

## **Descripción General**
Este proyecto backend permite consultar canciones de una banda musical a partir de la API pública de iTunes y guardar canciones como favoritas. Incluye pruebas automatizadas para backend y frontend organizadas en diferentes carpetas.

## **Requisitos de Instalación y Configuración**

### Backend
1. **Node.js** versión >= 14.x
2. **npm** como gestor de dependencias
3. **Docker & Docker-compose** (opcional, para ejecución en contenedores)

### Dependencias
- **Backend:** Chai, Chai-http, Mocha, Mochawesome
- **Frontend:** Selenium, Mocha, Mochawesome (si se utiliza el frontend)

## **Pasos para Levantar el Backend**

1. Clonar el repositorio y acceder a la carpeta del proyecto:
   ```bash
   git clone https://github.com/Gagalleta/QA-GL.git
   cd itunes-back-main

2. Instalar las dependencias:
   ```bash
   npm install

3. Iniciar el servidor:
   ```bash
   npm start

## **Probar la API**

- **Base URL:** http://localhost:3000
- **Endpoints disponibles:**
  - **GET /search_tracks?name={nombre_banda}:** Busca canciones de una banda.
  - **POST /favoritos:** Marca una canción como favorita.

### Documentación SWAGGER
Accede a la documentación de la API en Swagger en:  
http://localhost:3000/api-docs  

## **Estructura de Pruebas**

Las pruebas están organizadas en dos carpetas dentro de `tests/`:
- **Frontend:** `tests/frontend/`  
- **Backend:** `tests/backend/`

### Ejecución de Pruebas
Se pueden ejecutar todas las pruebas o solo las pruebas específicas de backend o frontend con los siguientes scripts:

1. Ejecutar todas las pruebas
    ```bash
    npm run test
    
2. Ejecutar solo pruebas de backend:
   ```bash
   npm run test:backend

3. Ejecutar solo pruebas de frontend:
   ```bash
   npm run test:frontend

### Configuración de los scripts
Los scripts predefinidos en `package.json` ejecutan las pruebas con Mocha y generan reportes con Mochawesome.

## **Casos de prueba automatizados**

### **Frontend**
1. **GL-FR-01:** Búsqueda válida muestra resultados relacionados.  
2. **GL-FR-02:** Búsqueda inexistente devuelve tabla vacía.  
3. **GL-FR-03:** Visualización de resultados correctamente formateados.  
4. **GL-FR-04:** Mensaje de error al ingresar caracteres no válidos.  
5. **GL-FR-05:** Persistencia visual al realizar búsquedas consecutivas.  
6. **GL-FR-06:** Mensaje de error al buscar sin texto.  
7. **GL-FR-07:** Resultados correctos para nombres con tildes (e.g., "Babasónicos").  
8. **GL-FR-08:** Manejo de nombres con espacios (e.g., "The Beatles").  
9. **GL-FR-09:** Reproducción de canciones desde el reproductor.  
10. **GL-FR-10:** Descarga de canciones.  
11. **GL-FR-11:** Ajuste de velocidad de reproducción.  
12. **GL-FR-12:** Detener reproducción inmediatamente.  
13. **GL-FR-13:** Silenciar reproducción sin detenerla.

### **Backend**
1. **GL-EN-01:** Validación de parámetros obligatorios faltantes (código 400).  
2. **GL-EN-02:** Manejo de error al intentar agregar canciones inexistentes (código 404).  
3. **GL-EN-03:** Validación del límite de 5 canciones favoritas (código 400).  
4. **GL-EN-04:** Obtención exitosa de favoritos (código 200).  
5. **GL-EN-05:** Implementación de caché para búsquedas con resultados más rápidos en solicitudes repetidas.

## **Reportes de prueba**

Los resultados se generan automáticamente en la carpeta `mochawesome-report` y contienen detalles de todas las pruebas ejecutadas.
