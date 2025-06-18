// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'Authentication API with JWT (Register, Login, Profile)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './docs/*.js'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
