# Supabase Setup Guide

## 1. Configurar Projeto no Supabase

### Passos:
1. Acesse [supabase.com](https://supabase.com) e crie uma conta (ou faça login)
2. Clique em "New Project"
3. Preencha as informações do projeto:
   - **Name**: sos-carros (ou o nome desejado)
   - **Database Password**: Escolha uma senha forte
   - **Region**: Selecione a região mais próxima (us-east-1 para melhor performance)
4. Aguarde a criação do projeto (pode levar alguns minutos)

## 2. Obter Credenciais da API

Após criar o projeto:

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie os seguintes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Chave pública para uso no frontend

## 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e substitua os valores:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

⚠️ **Importante**: Nunca commit o arquivo `.env` no Git. Ele já está listado no `.gitignore`.

## 4. Executar Schema do Banco de Dados

No dashboard do Supabase:

1. Vá em **SQL Editor**
2. Clique em "New Query"
3. Copie o conteúdo do arquivo `docs/SUPABASE_SCHEMA.sql`
4. Cole no editor e clique em "Run"

Isso criará todas as tabelas, enums, triggers e políticas necessárias.

## 5. Gerar Tipos TypeScript (Opcional mas Recomendado)

Para ter tipos TypeScript atualizados automaticamente baseados no schema do banco:

### Instalar CLI do Supabase:

```bash
npm install -g supabase
```

### Linkar projeto:

```bash
supabase link --project-ref seu-project-ref
```

O project-ref é o ID do seu projeto (encontrado em Settings → API)

### Gerar tipos:

```bash
npx supabase gen types typescript --linked > src/types/supabase.ts
```

Execute este comando sempre que modificar o schema do banco de dados.

## 6. Configurar Autenticação

No dashboard do Supabase:

1. Vá em **Authentication** → **Providers**
2. Certifique-se de que **Email** está habilitado
3. (Opcional) Configure provedores sociais como Google, GitHub, etc.

### Configurar Email Templates (Opcional):

1. Vá em **Authentication** → **Email Templates**
2. Personalize os templates de confirmação e recuperação de senha

## 7. Configurar Storage (Para Upload de Fotos)

Para permitir upload de fotos de perfil e comprovantes:

1. Vá em **Storage**
2. Crie um novo bucket chamado `photos`
3. Defina as políticas de segurança adequadas

### Políticas Sugeridas:

```sql
-- Permitir leitura pública
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

-- Permitir upload apenas para usuários autenticados
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'photos' AND 
    auth.role() = 'authenticated'
  );
```

## 8. Testar Conexão

Após configurar tudo, teste a conexão executando o projeto:

```bash
npm run dev
```

Se tudo estiver correto, você não verá erros relacionados ao Supabase no console.

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe e contém as variáveis corretas
- Reinicie o servidor de desenvolvimento após alterar o `.env`

### Erro: "Invalid API key"
- Verifique se copiou a chave `anon/public` correta (não a `service_role`)
- Confirme que o projeto está ativo no Supabase

### Erro: "relation does not exist"
- Execute o schema SQL no Supabase SQL Editor
- Verifique se todas as tabelas foram criadas corretamente

## Próximos Passos

Após configurar o Supabase:

1. Implementar telas de login/cadastro
2. Criar funcionalidades de CRUD para prestadores
3. Implementar sistema de bookings
4. Adicionar upload de fotos
5. Configurar notificações em tempo real

## Links Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Dashboard do Projeto](https://app.supabase.com)
- [Supabase JS Client Docs](https://supabase.com/docs/reference/javascript/introduction)
