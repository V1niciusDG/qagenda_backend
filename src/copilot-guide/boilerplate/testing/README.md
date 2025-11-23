# Boilerplate de Testes (Jest + TypeScript)

Este boilerplate padroniza configuração e utilitários de testes para o projeto.

## O que inclui

- Configuração Jest + ts-jest (ver `jest.config.ts` na raiz)
- Setup global `jest.setup.ts` com mocks de Redis, TypeORM, TSyringe e services/auth
- Aliases de import para testes (`@test-utils/*`)
- Utilitários de teste reusáveis:
  - `src/test-utils/express.ts` (Request/Response mocks e runMiddleware)
  - `src/test-utils/streams.ts` (streams de leitura/escrita)
  - `src/test-utils/typeorm.ts` (QueryBuilder/QueryRunner)
- Guia de padrões: `TESTING.md`

## Estrutura sugerida

```text
src/
  test-utils/
    express.ts
    streams.ts
    typeorm.ts
jest.config.ts
jest.setup.ts
TESTING.md
```

## Como aplicar no projeto

1. Garanta os aliases no TypeScript e Jest:

   - tsconfig.json:
     - paths → `"@test-utils/*": ["test-utils/*"]`
   - jest.config.ts:
     - moduleNameMapper → `'^@test-utils/(.*)$': '<rootDir>/src/test-utils/$1'`

2. Copie os utilitários para `src/test-utils`:

```bash
cp -r copilot-guide/boilerplate/testing/test-utils src/
```

3. Revise o setup global (`jest.setup.ts`) para manter/desligar mocks globais conforme necessário.

4. Use os utilitários nos seus testes:

```ts
import { makeReq, makeRes, runMiddleware } from '@test-utils/express';
import { makeReadable, makeWritable } from '@test-utils/streams';
import { makeQueryRunner } from '@test-utils/typeorm';
```

5. Rode a suíte:

```bash
yarn test
# com cobertura
yarn test:coverage
```

## Padrões de escrita de testes

- Use `.test.ts` para unitário e `.spec.ts` para integração/e2e.
- Cubra sucesso e ao menos um caminho de erro.
- Evite dependências externas; use `streams.ts` para simular I/O.
- Para Express, utilize `makeReq`/`makeRes` e `runMiddleware`.
- Para TypeORM, injete `makeQueryRunner()`/`makeQueryBuilder()` onde couber.

## Templates de exemplo

- Controller/middleware básico: `__templates__/express-controller.test.ts`
- Hook com streams: `__templates__/stream-hook.test.ts`
- Use case com TypeORM: `__templates__/typeorm-usecase.test.ts`
