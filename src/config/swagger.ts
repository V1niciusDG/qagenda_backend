import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QAgenda API',
      version: '1.0.0',
      description: 'API para sistema de agendamento de serviços',
      contact: {
        name: 'API Support',
        email: 'support@qagenda.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/modules/**/route/paths.ts', './src/modules/**/route/paths.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerRoutes = Router();

swaggerRoutes.get(
  '/',
  swaggerUi.serve as any,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'QAgenda API Docs',
  }) as any
);

export { swaggerRoutes };
