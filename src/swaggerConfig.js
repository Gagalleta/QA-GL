const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bandas Musicales',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de canciones y bandas musicales.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec