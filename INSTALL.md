# 🚀 Guia Rápido de Instalação - Qagenda Backend

## Passo 1: Instalar Dependências

```bash
npm install
```

## Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (copie do `.env.example`):

```bash
cp .env.example .env
```

Configure suas credenciais do SQL Server no `.env`:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=SuaSenhaForte123
DB_DATABASE=qagenda

SECRET_TOKEN=seu_secret_muito_seguro_aqui_123
SECRET_REFRESH_TOKEN=seu_refresh_secret_muito_seguro_456
```

## Passo 3: Criar o Banco de Dados

No SQL Server, crie o banco de dados:

```sql
CREATE DATABASE qagenda;
GO
```

## Passo 4: Executar as Migrations

```bash
npm run migration:run
```

Você deverá ver:

```
✅ Migration CreateUsersTable executed successfully
✅ Migration CreateAuthsTable executed successfully
```

## Passo 5: Iniciar o Servidor

```bash
npm run dev
```

Você deverá ver:

```
✅ Database connected
🚀 Server running on port 3000
```

## Passo 6: Testar a API

### Criar primeiro usuário:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@qagenda.com",
    "password": "admin123"
  }'
```

### Fazer login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@qagenda.com",
    "password": "admin123"
  }'
```

Você receberá um token JWT para usar nas próximas requisições!

## ✅ Pronto!

Seu sistema de autenticação está funcionando! 🎉

## 🆘 Troubleshooting

### Erro de conexão com banco:

- Verifique se o SQL Server está rodando
- Confirme usuário e senha no `.env`
- Teste a conexão com o SQL Server Management Studio

### Erro nas migrations:

- Certifique-se de que o banco `qagenda` foi criado
- Verifique as permissões do usuário do banco

### Porta 3000 já em uso:

- Altere a variável `PORT` no `.env`
- Ou finalize o processo na porta 3000
