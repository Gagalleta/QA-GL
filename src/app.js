const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const cors = require('cors');


// Habilitar CORS para todas las rutas y orígenes
app.use(cors());

// Middleware
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
const indexRoute = require('./routes/routes');
app.use('/', indexRoute);

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
});