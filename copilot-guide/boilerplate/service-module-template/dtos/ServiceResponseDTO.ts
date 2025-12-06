/**
 * Service Module Template - Response DTO
 *
 * Este DTO define a estrutura dos dados de resposta das operações do serviço.
 * Use este template para criar DTOs de response para módulos que não precisam de persistência.
 *
 * Renomeie a classe e propriedades conforme necessário para seu módulo específico.
 */

export interface IServiceResponseDTO<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  metadata?: {
    requestId?: string;
    timestamp: Date;
    executionTimeMs?: number;
    version?: string;
  };
}

export class ServiceResponseDTO<T = any> implements IServiceResponseDTO<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  metadata: {
    requestId?: string;
    timestamp: Date;
    executionTimeMs?: number;
    version?: string;
  };

  constructor(data: Partial<IServiceResponseDTO<T>> = {}) {
    this.success = data.success ?? false;
    this.data = data.data;
    this.message = data.message;
    this.errors = data.errors;
    this.metadata = {
      timestamp: new Date(),
      ...data.metadata,
    };
  }

  // Factory methods para facilitar criação de respostas
  static success<T>(data?: T, message?: string): ServiceResponseDTO<T> {
    return new ServiceResponseDTO<T>({
      success: true,
      data,
      message: message || 'Operation completed successfully',
    });
  }

  static error<T>(errors: string[], message?: string): ServiceResponseDTO<T> {
    return new ServiceResponseDTO<T>({
      success: false,
      errors,
      message: message || 'Operation failed',
    });
  }

  static failure<T>(message: string): ServiceResponseDTO<T> {
    return new ServiceResponseDTO<T>({
      success: false,
      message,
      errors: [message],
    });
  }

  // Métodos utilitários
  addError(error: string): void {
    if (!this.errors) {
      this.errors = [];
    }
    this.errors.push(error);
    this.success = false;
  }

  setExecutionTime(startTime: number): void {
    this.metadata.executionTimeMs = Date.now() - startTime;
  }
}
