# Quick Start - Criação de Módulo

## Comando Rápido

```bash
# System Module (com conexão tenant)
cp -r copilot-guide/boilerplate/system-module-template src/modules/MEU_MODULO

# Tenant Module (sem conexão tenant)
cp -r copilot-guide/boilerplate/tenant-module-template src/modules/MEU_MODULO

# Service Module (sem banco de dados)
cp -r copilot-guide/boilerplate/service-module-template src/modules/MEU_MODULO
```

## Checklist de Implementação

### ✅ 1. Renomear Arquivos e Classes

- [ ] Renomear `Entity` para o nome da sua entidade
- [ ] Substituir `[module-name]` pelos paths corretos
- [ ] Atualizar nome da tabela no `@Entity()`

### ✅ 2. Configurar DTOs

- [ ] Definir propriedades específicas da entidade
- [ ] Adicionar validações se necessário

### ✅ 3. Implementar Repository

- [ ] Personalizar métodos conforme necessário
- [ ] Adicionar queries específicas

### ✅ 4. Implementar UseCases

- [ ] Adicionar regras de negócio
- [ ] Configurar validações e permissões

### ✅ 5. Registrar no Container

```typescript
// Em src/containers/modules.ts
container.registerSingleton<IEntityRepository>(
  'EntityRepository',
  EntityRepository,
);
```

### ✅ 6. Registrar Rotas

```typescript
// Em src/routes/index.ts
import { entityRoutes } from '@modules/meu-modulo/route';
routes.use('/meu-modulo', entityRoutes);
```

### ✅ 7. Testar

- [ ] Endpoint GET funcionando
- [ ] Endpoint POST funcionando
- [ ] Middlewares aplicados corretamente
- [ ] Tratamento de erros funcionando

## Diferenças entre Templates

| Aspecto           | System Module              | Tenant Module          | Service Module     |
| ----------------- | -------------------------- | ---------------------- | ------------------ |
| **Conexão**       | `getConnection(tenant_id)` | `getConnection()`      | Nenhuma            |
| **Entidades**     | Sim                        | Sim                    | Não                |
| **Repositórios**  | Sim                        | Sim                    | Não                |
| **Inicialização** | Requer `tenant_id`         | Não requer             | Não requer         |
| **Uso**           | Dados por tenant/projeto   | Dados globais          | Processamento/APIs |
| **Middleware**    | `HasTenant` obrigatório    | `Authenticated` apenas | Depende do caso    |

## Exemplo de Uso

```typescript
// System Module - dados específicos do tenant
await repository.initialize({
  tenant_id: user.tenant_id,
  project_id: user.project_id,
});

// Tenant Module - dados globais
// (sem inicialização especial)

// Service Module - processamento sem persistência
const result = await useCase.execute({
  action: 'process',
  data: inputData,
});
```

// Sem inicialização necessária

```

```
