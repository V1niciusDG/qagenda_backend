# Boilerplates de Módulos

Este diretório contém templates padronizados para criação de novos módulos no projeto.

## Estrutura dos Templates

### 📁 testing

Boilerplate de configuração de testes (Jest + TypeScript) e utilitários de apoio.

**Inclui:**

- Guia `README.md` para aplicação do boilerplate
- Templates de testes em `__templates__`
- Esqueletos de utilitários em `test-utils/` (copiar para `src/test-utils`)

**Como copiar utilitários:**

```bash
cp -r copilot-guide/boilerplate/testing/test-utils src/
```

Mais detalhes em `copilot-guide/boilerplate/testing/README.md`.

### 📁 system-module-template

Template para módulos que acessam o **banco de dados do sistema** (conexão principal).

**Características:**

- Utiliza `getConnection(tenant_id.toString())` para conexões específicas
- Requer inicialização com `tenant_id` e `project_id`
- Usado para dados compartilhados entre tenants

### 📁 tenant-module-template

Template para módulos que acessam o **banco principal** (sem conexão específica de tenant).

**Características:**

- Utiliza `getConnection()` (conexão padrão)
- Não requer inicialização específica de tenant
- Usado para dados globais/configurações

### 📁 service-module-template

Template para módulos de **serviço sem persistência** (sem banco de dados).

**Características:**

- Sem entidades ou repositórios
- Apenas DTOs, rotas e use cases
- Usado para processamento, integrações, transformações
- Ideal para serviços de terceiros, validações, cálculos

## Como Usar

### 1. Escolher o Template

- **System Module**: Para dados específicos de tenant/projeto
- **Tenant Module**: Para dados globais/configurações
- **Service Module**: Para processamento sem persistência

### 2. Copiar Template

```bash
# Para módulos com banco de dados do sistema
cp -r copilot-guide/boilerplate/system-module-template src/modules/meu-novo-modulo

# Para módulos com banco principal (tenant)
cp -r copilot-guide/boilerplate/tenant-module-template src/modules/meu-novo-modulo

# Para módulos de serviço sem banco de dados
cp -r copilot-guide/boilerplate/service-module-template src/modules/meu-novo-modulo
```

### 3. Personalizar

Substitua os seguintes placeholders:

- `[module-name]` → nome do seu módulo
- `Entity` → nome da sua entidade (ex: `User`, `Product`)
- `TenantEntity` → nome da sua entidade tenant
- `entities` → nome da tabela no banco
- `EntityRepository` → nome do repositório

### 4. Atualizar Imports

Corrija todos os imports para apontar para o módulo correto:

```typescript
// De:
import { IEntityDTO } from '@modules/[module-name]/dtos/IEntityDTO';

// Para:
import { IEntityDTO } from '@modules/meu-modulo/dtos/IEntityDTO';
```

### 5. Registrar Dependências

Adicione no arquivo de containers (`src/containers/modules.ts`):

```typescript
container.registerSingleton<IEntityRepository>(
  'EntityRepository',
  EntityRepository,
);
```

### 6. Registrar Rotas

Adicione no arquivo de rotas principal (`src/routes/index.ts`):

```typescript
import { entityRoutes } from '@modules/meu-modulo/route';
routes.use('/entities', entityRoutes);
```

## Testes Unitários

Cada template inclui exemplos de testes unitários na pasta `__tests__/`:

### 📁 system-module-template/**tests**

- `CreateEntityUseCase.test.ts` - Exemplo de teste para use cases de system modules
- Testa inicialização de repositório com tenant/project
- Inclui mocks para conexões de banco específicas

### 📁 tenant-module-template/**tests**

- `CreateTenantEntityUseCase.test.ts` - Exemplo de teste para use cases de tenant modules
- Testa funcionalidades sem inicialização específica
- Inclui testes para dados globais/configurações

### 📁 service-module-template/**tests**

- `ExampleService.test.ts` - Exemplo de teste para services
- Testa integração com APIs externas
- Inclui testes de cache e performance

### Como Usar os Templates de Teste

1. **Copie os testes junto com o módulo:**

```bash
# Os testes são copiados automaticamente com o template
cp -r copilot-guide/boilerplate/system-module-template src/modules/meu-novo-modulo
```

2. **Ajuste os imports nos testes:**

```typescript
// Mude de:
// import { createMockUser, createTestData, clearAllMocks } from '@/__tests__/helpers/testHelpers';

// Para usar os helpers reais:
import {
  createMockUser,
  createTestData,
  clearAllMocks,
} from '@/__tests__/helpers/testHelpers';
```

3. **Renomeie as classes e métodos:**

```typescript
// Substitua 'CreateEntityUseCase' pelo nome do seu use case
describe('CreateMyEntityUseCase', () => {
  // Seus testes aqui
});
```

4. **Execute os testes:**

```bash
# Testar apenas seu módulo
npm test -- src/modules/meu-novo-modulo

# Executar todos os testes
npm test

# Com coverage
npm run test:coverage
```

### Helpers de Teste Disponíveis

Os templates utilizam helpers globais do projeto:

- `createMockUser()` - Cria mock de usuário autenticado
- `createTestData.dto()` - Cria dados de teste
- `clearAllMocks()` - Limpa todos os mocks
- `createMockRequest()` / `createMockResponse()` - Mocks do Express

### Padrões de Teste por Tipo de Módulo

#### System Modules

- ✅ Testar inicialização de repositório
- ✅ Testar conexão com tenant/project específico
- ✅ Testar validação de tenant_id obrigatório

#### Tenant Modules

- ✅ Testar funcionamento sem tenant_id
- ✅ Testar dados globais/configurações
- ✅ Testar multi-idioma

#### Service Modules

- ✅ Testar integração com APIs externas
- ✅ Testar cache e performance
- ✅ Testar retry e tratamento de erros

## Arquitetura dos Módulos

```text
src/modules/[nome-do-modulo]/
├── dtos/                    # Data Transfer Objects
│   ├── IEntityDTO.ts
│   ├── ICreateEntityDTO.ts
│   └── IUpdateEntityDTO.ts
├── entities/               # Entidades TypeORM
│   └── Entity.ts
├── repositories/          # Repositórios de dados
│   └── Entity/
│       ├── IEntityRepository.ts
│       └── EntityRepository.ts
├── route/                 # Rotas e controladores
│   └── index.ts
└── useCases/             # Casos de uso (regras de negócio)
    ├── find/
    │   ├── FindEntityUseCase.ts
    │   └── FindEntityController.ts
    └── create/
        ├── CreateEntityUseCase.ts
        └── CreateEntityController.ts
```

## Padrões e Convenções

### Nomenclatura

- **Arquivos**: PascalCase para classes, camelCase para interfaces
- **DTOs**: Prefixo `I` + nome da entidade + `DTO`
- **Entities**: Nome singular da entidade
- **Repositories**: Nome da entidade + `Repository`
- **UseCases**: Verbo + nome da entidade + `UseCase`
- **Controllers**: Nome do UseCase + `Controller`

### Injeção de Dependência

Todos os repositórios e providers devem ser registrados no container TSyringe:

```typescript
@injectable()
class ExampleUseCase {
  constructor(
    @inject('EntityRepository')
    private entityRepository: IEntityRepository,
  ) {}
}
```

### Tratamento de Erros

Sempre use `AppError` para erros customizados:

```typescript
throw new AppError(
  await this.multiLangCoreProvider.getTranscriptionByKeyAndLang(
    'error.general',
    user.lang,
  ),
  500,
);
```

### Middlewares Comuns

- `Authenticated`: Verificação de autenticação
- `HasTenant`: Verificação de tenant
- `HasProject`: Verificação de projeto
- `IsAdminOrManagerProfile`: Verificação de permissões

## Exemplos Reais

Para referência, veja os módulos existentes:

- `src/modules/llm-keys/` (tenant module)
- `src/modules/mcp/` (system module)
- `src/modules/tquerys/` (system module)

## Dependências Obrigatórias

Certifique-se de que seu módulo importe:

- `tsyringe` para injeção de dependência
- `typeorm` para ORM
- `@config/AppError` para tratamento de erros
- `@providers/MultiLangCore` para internacionalização
- `@config/types/RequestUser` para tipagem do usuário
