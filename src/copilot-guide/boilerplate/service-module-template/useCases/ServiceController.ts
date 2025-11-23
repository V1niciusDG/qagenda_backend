/**
 * Service Module Template - Controller
 *
 * Este controller gerencia as requisições HTTP para o serviço sem dependência de banco de dados.
 * Use este template para criar controllers que processam dados, fazem integrações ou
 * executam lógicas que não requerem persistência.
 *
 * Renomeie a classe e métodos conforme necessário para seu módulo específico.
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ServiceUseCase } from './ServiceUseCase';
import { ServiceRequestDTO } from '../dtos/ServiceRequestDTO';

export class ServiceController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // Extrair dados da requisição
      const { action, data, parameters } = request.body;

      // Criar DTO de request
      const serviceRequest = new ServiceRequestDTO({
        action: action || 'process',
        data,
        parameters,
        metadata: {
          source: 'http',
          requestId: request.headers['x-request-id'] as string,
        },
      });

      // Executar use case
      const serviceUseCase = container.resolve(ServiceUseCase);
      const result = await serviceUseCase.execute(serviceRequest);

      // Retornar resposta com status apropriado
      const statusCode = result.success ? 200 : 400;
      return response.status(statusCode).json(result);
    } catch (error: any) {
      console.error('[ServiceController] Unexpected error:', error);

      return response.status(500).json({
        success: false,
        message: 'Internal server error',
        errors: [error.message || 'Unknown error occurred'],
        metadata: {
          timestamp: new Date(),
          requestId: request.headers['x-request-id'],
        },
      });
    }
  }

  async process(request: Request, response: Response): Promise<Response> {
    // Método específico para processamento
    request.body = {
      ...request.body,
      action: 'process',
    };

    return this.handle(request, response);
  }

  async validate(request: Request, response: Response): Promise<Response> {
    // Método específico para validação
    request.body = {
      ...request.body,
      action: 'validate',
    };

    return this.handle(request, response);
  }

  async transform(request: Request, response: Response): Promise<Response> {
    // Método específico para transformação
    request.body = {
      ...request.body,
      action: 'transform',
    };

    return this.handle(request, response);
  }

  async health(request: Request, response: Response): Promise<Response> {
    // Endpoint de health check
    return response.status(200).json({
      success: true,
      message: 'Service is healthy',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.APP_VERSION || '1.0.0',
      },
    });
  }
}
