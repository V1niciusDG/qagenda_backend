/**
 * Service Module Template - Routes
 *
 * Este arquivo define as rotas HTTP para o serviço sem dependência de banco de dados.
 * Use este template para criar rotas que processam dados, fazem integrações ou
 * executam lógicas que não requerem persistência.
 *
 * Renomeie as rotas conforme necessário para seu módulo específico.
 */

import { Router } from 'express';
import { ServiceController } from '../useCases/ServiceController';

// Instanciar o controller
const serviceController = new ServiceController();

// Criar roteador
const serviceRoutes = Router();

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Execute service operation
 *     description: Executes a service operation based on the action specified in the request body
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [process, validate, transform]
 *                 description: The action to perform
 *               data:
 *                 type: object
 *                 description: The data to process
 *               parameters:
 *                 type: object
 *                 description: Additional parameters for the operation
 *     responses:
 *       200:
 *         description: Operation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 metadata:
 *                   type: object
 *       400:
 *         description: Bad request or operation failed
 *       500:
 *         description: Internal server error
 */
serviceRoutes.post('/', serviceController.handle.bind(serviceController));

/**
 * @swagger
 * /service/process:
 *   post:
 *     summary: Process data
 *     description: Processes the provided data
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: The data to process
 *               parameters:
 *                 type: object
 *                 description: Additional parameters for processing
 *     responses:
 *       200:
 *         description: Data processed successfully
 *       400:
 *         description: Invalid data provided
 */
serviceRoutes.post(
  '/process',
  serviceController.process.bind(serviceController),
);

/**
 * @swagger
 * /service/validate:
 *   post:
 *     summary: Validate data
 *     description: Validates the provided data
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: The data to validate
 *     responses:
 *       200:
 *         description: Data validation completed
 */
serviceRoutes.post(
  '/validate',
  serviceController.validate.bind(serviceController),
);

/**
 * @swagger
 * /service/transform:
 *   post:
 *     summary: Transform data
 *     description: Transforms the provided data using the specified parameters
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: The data to transform
 *               parameters:
 *                 type: object
 *                 description: Parameters for transformation
 *     responses:
 *       200:
 *         description: Data transformed successfully
 */
serviceRoutes.post(
  '/transform',
  serviceController.transform.bind(serviceController),
);

/**
 * @swagger
 * /service/health:
 *   get:
 *     summary: Health check
 *     description: Returns the health status of the service
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *                     version:
 *                       type: string
 */
serviceRoutes.get('/health', serviceController.health.bind(serviceController));

export { serviceRoutes };
