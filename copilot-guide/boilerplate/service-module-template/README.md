# Service Module Template

Este template é para módulos de **serviço sem persistência** - módulos que não se conectam ao banco de dados e não possuem entidades, apenas DTOs, rotas e use cases.

## 📁 Estrutura

```
service-module-template/
├── dtos/
│   ├── ServiceRequestDTO.ts    # DTO para requisições
│   └── ServiceResponseDTO.ts   # DTO para respostas
├── routes/
│   └── service.routes.ts       # Definição das rotas HTTP
└── useCases/
    ├── ServiceUseCase.ts       # Lógica de negócio
    └── ServiceController.ts    # Controller HTTP
```

## 🎯 Quando Usar

Este template é ideal para:

- **Serviços de integração** com APIs externas
- **Processamento de dados** sem persistência
- **Transformação de dados** e formatação
- **Validação de dados** complexa
- **Cálculos e operações** matemáticas
- **Serviços de notificação** e comunicação
- **Utilitários** e helpers de negócio

## ⚡ Como Usar

### 1. Copiar o Template

```bash
# Navegue até a pasta dos módulos
cd src/modules

# Copie o template
cp -r ../../copilot-guide/boilerplate/service-module-template my-service

# Renomeie para seu módulo específico
mv my-service notification-service
```

### 2. Personalizar os Arquivos

#### ServiceRequestDTO.ts

- Renomeie a interface `IServiceRequestDTO` para `INotificationRequestDTO`
- Renomeie a classe `ServiceRequestDTO` para `NotificationRequestDTO`
- Ajuste as propriedades conforme sua necessidade

#### ServiceResponseDTO.ts

- Renomeie a interface `IServiceResponseDTO` para `INotificationResponseDTO`
- Renomeie a classe `ServiceResponseDTO` para `NotificationResponseDTO`
- Mantenha os factory methods (success, error, failure)

#### ServiceUseCase.ts

- Renomeie a interface `IServiceUseCase` para `INotificationUseCase`
- Renomeie a classe `ServiceUseCase` para `NotificationUseCase`
- Implemente sua lógica específica nos métodos privados

#### ServiceController.ts

- Renomeie a classe `ServiceController` para `NotificationController`
- Ajuste os métodos conforme suas operações específicas

#### service.routes.ts

- Renomeie o arquivo para `notification.routes.ts`
- Renomeie a constante `serviceRoutes` para `notificationRoutes`
- Ajuste os paths e documentação Swagger

### 3. Registrar o Módulo

Adicione as rotas no arquivo principal de rotas:

```typescript
// src/routes/index.ts
import { notificationRoutes } from '../modules/notification-service/routes/notification.routes';

router.use('/notifications', notificationRoutes);
```

## 🔧 Funcionalidades Incluídas

### DTOs Estruturados

- Request DTO com metadata e validação
- Response DTO com factory methods
- Tratamento de erros padronizado

### Use Case Flexível

- Suporte a múltiplas ações via switch/case
- Logging integrado
- Medição de tempo de execução
- Tratamento de erros robusto

### Controller Completo

- Métodos específicos para cada ação
- Health check endpoint
- Tratamento de headers de request
- Respostas HTTP padronizadas

### Rotas Documentadas

- Documentação Swagger completa
- Múltiplos endpoints especializados
- Validação de entrada
- Códigos de status apropriados

## 📝 Exemplo de Implementação

### Serviço de Notificação

```typescript
// NotificationRequestDTO.ts
export interface INotificationRequestDTO {
  type: 'email' | 'sms' | 'push';
  recipient: string;
  subject?: string;
  message: string;
  templateData?: Record<string, any>;
}

// NotificationUseCase.ts
private async processRequest(request: NotificationRequestDTO): Promise<any> {
  switch (request.action) {
    case 'send':
      return await this.sendNotification(request.data);

    case 'validate-recipient':
      return await this.validateRecipient(request.data);

    default:
      throw new Error(`Unsupported action: ${request.action}`);
  }
}

private async sendNotification(data: any): Promise<any> {
  // Implementar envio via email, SMS, push, etc.
  return {
    sent: true,
    notificationId: `notif_${Date.now()}`,
    sentAt: new Date().toISOString()
  };
}
```

## 🚀 Vantagens

### Simplicidade

- ✅ Sem complexidade de banco de dados
- ✅ Foco na lógica de negócio
- ✅ Rápido de implementar

### Flexibilidade

- ✅ Facilmente extensível
- ✅ Múltiplas ações por endpoint
- ✅ Integração simples com APIs externas

### Padronização

- ✅ Estrutura consistente
- ✅ Tratamento de erros uniforme
- ✅ Documentação automática

### Performance

- ✅ Sem overhead de ORM
- ✅ Processamento direto
- ✅ Latência reduzida
