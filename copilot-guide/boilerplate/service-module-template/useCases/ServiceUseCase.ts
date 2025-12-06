/**
 * Service Module Template - Use Case
 *
 * Este use case implementa a lógica de negócio do serviço sem dependência de banco de dados.
 * Use este template para criar use cases que processam dados, fazem integrações ou
 * executam lógicas que não requerem persistência.
 *
 * Renomeie a classe e métodos conforme necessário para seu módulo específico.
 */

import { inject, injectable } from 'tsyringe';
import { ServiceRequestDTO } from '../dtos/ServiceRequestDTO';
import { ServiceResponseDTO } from '../dtos/ServiceResponseDTO';

// Interface para definir o contrato do use case
export interface IServiceUseCase {
  execute(request: ServiceRequestDTO): Promise<ServiceResponseDTO>;
}

@injectable()
export class ServiceUseCase implements IServiceUseCase {
  constructor() // Injete aqui dependências necessárias como providers externos, APIs, etc.
  // Exemplo: @inject('SomeProvider') private someProvider: ISomeProvider
  {}

  async execute(request: ServiceRequestDTO): Promise<ServiceResponseDTO> {
    const startTime = Date.now();

    try {
      // Validação de entrada
      if (!request.isValid()) {
        return ServiceResponseDTO.error(
          ['Invalid request data'],
          'Request validation failed',
        );
      }

      // Log da operação (opcional)
      console.log(`[ServiceUseCase] Executing action: ${request.action}`, {
        requestId: request.metadata?.requestId,
        timestamp: new Date().toISOString(),
      });

      // Lógica de negócio principal
      const result = await this.processRequest(request);

      // Criar resposta de sucesso
      const response = ServiceResponseDTO.success(
        result,
        'Service operation completed successfully',
      );
      response.metadata.requestId = request.metadata?.requestId;
      response.setExecutionTime(startTime);

      return response;
    } catch (error: any) {
      console.error('[ServiceUseCase] Error executing service:', error);

      const response = ServiceResponseDTO.error(
        [error.message || 'Unknown error occurred'],
        'Service operation failed',
      );
      response.metadata.requestId = request.metadata?.requestId;
      response.setExecutionTime(startTime);

      return response;
    }
  }

  private async processRequest(request: ServiceRequestDTO): Promise<any> {
    // Implementar aqui a lógica específica do seu serviço

    switch (request.action) {
      case 'process':
        return await this.processData(request.data);

      case 'validate':
        return await this.validateData(request.data);

      case 'transform':
        return await this.transformData(request.data, request.parameters);

      default:
        throw new Error(`Unsupported action: ${request.action}`);
    }
  }

  private async processData(data: any): Promise<any> {
    // Implementar processamento de dados
    // Exemplo: transformações, validações, cálculos, etc.

    return {
      processed: true,
      result: data,
      processedAt: new Date().toISOString(),
    };
  }

  private async validateData(data: any): Promise<any> {
    // Implementar validação de dados
    // Exemplo: validações de negócio, schemas, etc.

    const isValid = data && typeof data === 'object';

    return {
      valid: isValid,
      data: data,
      validatedAt: new Date().toISOString(),
    };
  }

  private async transformData(
    data: any,
    parameters?: Record<string, any>,
  ): Promise<any> {
    // Implementar transformação de dados
    // Exemplo: formatação, conversão, mapeamento, etc.

    return {
      transformed: true,
      originalData: data,
      transformedData: { ...data, ...parameters },
      transformedAt: new Date().toISOString(),
    };
  }
}
