/**
 * Service Module Template - Request DTO
 *
 * Este DTO define a estrutura dos dados de entrada para operações do serviço.
 * Use este template para criar DTOs de request para módulos que não precisam de persistência.
 *
 * Renomeie a classe e propriedades conforme necessário para seu módulo específico.
 */

export interface IServiceRequestDTO {
  // Defina as propriedades necessárias para sua requisição
  action: string;
  data?: any;
  parameters?: Record<string, any>;
  metadata?: {
    requestId?: string;
    timestamp?: Date;
    source?: string;
  };
}

export class ServiceRequestDTO implements IServiceRequestDTO {
  action: string;
  data?: any;
  parameters?: Record<string, any>;
  metadata?: {
    requestId?: string;
    timestamp?: Date;
    source?: string;
  };

  constructor(data: IServiceRequestDTO) {
    this.action = data.action;
    this.data = data.data;
    this.parameters = data.parameters;
    this.metadata = {
      ...data.metadata,
      timestamp: data.metadata?.timestamp || new Date(),
      requestId: data.metadata?.requestId || this.generateRequestId(),
    };
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Método de validação básica
  isValid(): boolean {
    return Boolean(this.action);
  }
}
