# 📋 Tarefas para GitHub Projects - SOS Carros

## Status Atualizado

**Última atualização**: 2026-01-02
**Fase atual**: Fase 1 - Configuração Inicial ✅ CONCLUÍDA

---

## Instruções de Importação

Para criar as tarefas no GitHub Project (https://github.com/users/mjpfelicia/projects/5):

### Opção 1: Manual via Interface Web (Recomendado)

1. Acesse o projeto
2. Click em "Add item" ou "New issue"
3. Copie e cole cada título e descrição das tarefas abaixo

### Opção 2: GitHub CLI

```bash
# Após instalar gh e fazer login
gh issue create --title "Título da tarefa" --body "Descrição" --label "frontend,rf01"
```

---

## ✅ Tarefas Concluídas - Fase 1 (Configuração Inicial)

### Infraestrutura Básica

**INFRA-1** ✅ Configurar Supabase SDK | 2h | Crítica | **CONCLUÍDA**
- Descrição: Instalação do @supabase/supabase-js e configuração do cliente
- Arquivos: `src/lib/supabase.ts`
- Status: Implementado

**INFRA-2** ✅ Setup ambiente local | 2h | Alta | **CONCLUÍDA**
- Descrição: Criação de estrutura de diretórios, contexts, hooks e componentes base
- Arquivos: `src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`, `src/hooks/*`
- Status: Implementado

**INFRA-3** ✅ Criar AuthContext | 3h | Crítica | **CONCLUÍDA**
- Descrição: Contexto de autenticação com signIn, signUp, signOut, resetPassword
- Arquivos: `src/contexts/AuthContext.tsx`
- Status: Implementado

**INFRA-4** ✅ Criar ProtectedRoute | 1h | Crítica | **CONCLUÍDA**
- Descrição: Componente para proteger rotas que requerem autenticação
- Arquivos: `src/components/ProtectedRoute.tsx`
- Status: Implementado

**INFRA-5** ✅ Integrar AuthProvider no App | 1h | Crítica | **CONCLUÍDA**
- Descrição: Envolver o RouterProvider com AuthProvider no main.tsx
- Arquivos: `src/main.tsx`
- Status: Implementado

**INFRA-6** ✅ Criar hooks de data fetching | 4h | Alta | **CONCLUÍDA**
- Descrição: Hooks useProviders, useProvider, useBookings, useUploadPhoto
- Arquivos: `src/hooks/useProviders.ts`, `src/hooks/useProvider.ts`, `src/hooks/useBookings.ts`, `src/hooks/useUploadPhoto.ts`
- Status: Implementado

**INFRA-7** ✅ Criar .env.local.example | 0.5h | Alta | **CONCLUÍDA**
- Descrição: Template de variáveis de ambiente para configuração do Supabase
- Arquivos: `.env.local.example`
- Status: Implementado

---

## 🔄 Pendências - Ações Manuais Necessárias

Estas tarefas requerem ação manual fora do repositório:

**MANUAL-1** ⏳ Criar Projeto no Supabase | 0.5h | Crítica
- Acessar https://app.supabase.com
- Criar projeto "sos-carros"
- Região: us-east-1

**MANUAL-2** ⏳ Executar Schema SQL | 0.5h | Crítica
- Copiar `docs/SUPABASE_SCHEMA.sql`
- Executar no SQL Editor do Supabase

**MANUAL-3** ⏳ Configurar .env.local | 0.5h | Crítica
- Copiar `.env.local.example` para `.env.local`
- Preencher com chaves do projeto

**MANUAL-4** ⏳ Gerar Tipos TypeScript | 0.5h | Alta
- Instalar CLI: `npm install -g supabase`
- Executar: `supabase gen types typescript --linked > src/types/supabase.ts`

**MANUAL-5** ⏳ Configurar Storage Bucket | 0.5h | Alta
- Criar bucket "provider-photos"
- Configurar como público
- Adicionar policies

**MANUAL-6** ⏳ Configurar Email Templates | 0.5h | Média
- Personalizar templates de email no Supabase

---

## RF01 - Página Inicial (5 tarefas)

**1.1** Implementar Hero Section com busca | 2h | Alta | ⏳ PENDENTE
**1.2** Criar grid de categorias | 3h | Alta | ⏳ PENDENTE  
**1.3** Seção Como Funciona | 2h | Média | ⏳ PENDENTE
**1.4** Prestadores em Destaque | 4h | Alta | ⏳ PENDENTE
**1.5** Depoimentos e Footer | 2h | Média | ⏳ PENDENTE

## RF02 - Buscar Prestadores (6 tarefas)

**2.1** Layout da página de busca | 3h | Alta | ⏳ PENDENTE
**2.2** Componentes de filtro | 4h | Alta | ⏳ PENDENTE
**2.3** Provider Card component | 3h | Alta | ⏳ PENDENTE
**2.4** Integração Supabase - Listagem | 4h | Alta | ⏳ PENDENTE *(hook já criado)*
**2.5** Ordenação e paginação | 3h | Média | ⏳ PENDENTE
**2.6** Mapa integrado (opcional) | 6h | Baixa | ⏳ PENDENTE

## RF03 - Perfil do Prestador (6 tarefas)

**3.1** Header do perfil | 3h | Alta | ⏳ PENDENTE
**3.2** Galeria de fotos e bio | 3h | Alta | ⏳ PENDENTE
**3.3** Lista de serviços | 2h | Alta | ⏳ PENDENTE
**3.4** Horário de funcionamento | 2h | Média | ⏳ PENDENTE
**3.5** Avaliações e reviews | 4h | Alta | ⏳ PENDENTE
**3.6** Formulário de agendamento | 6h | Alta | ⏳ PENDENTE

## RF04 - Cadastro de Usuários (4 tarefas)

**4.1** Layout do formulário | 2h | Alta | ⏳ PENDENTE
**4.2** Validação com Zod | 3h | Alta | ⏳ PENDENTE
**4.3** Integração Supabase Auth | 4h | Crítica | ⏳ PENDENTE *(AuthContext já criado)*
**4.4** OAuth Google (opcional) | 3h | Baixa | ⏳ PENDENTE

## RF05 - Autenticação/Login (5 tarefas)

**5.1** Formulário de login | 2h | Crítica | ⏳ PENDENTE
**5.2** Contexto de autenticação | 4h | Crítica | ✅ CONCLUÍDA
**5.3** Protected routes | 2h | Crítica | ✅ CONCLUÍDA
**5.4** Recuperação de senha | 3h | Média | ⏳ PENDENTE *(função já criada no contexto)*
**5.5** Logout e sessão | 1h | Alta | ✅ CONCLUÍDA *(implementado no contexto)*

## RF06 - Dashboard do Prestador (6 tarefas)

**6.1** Layout do dashboard | 3h | Alta | ⏳ PENDENTE
**6.2** Visão geral com métricas | 6h | Alta | ⏳ PENDENTE
**6.3** Gestão de perfil | 6h | Alta | ⏳ PENDENTE
**6.4** Gestão de serviços | 5h | Alta | ⏳ PENDENTE
**6.5** Gestão de bookings | 8h | Crítica | ⏳ PENDENTE *(hooks já criados)*
**6.6** Responder reviews | 3h | Média | ⏳ PENDENTE

## RF07 - Seja Prestador (3 tarefas)

**7.1** Conteúdo institucional | 2h | Média | ⏳ PENDENTE
**7.2** Depoimentos e FAQ | 2h | Baixa | ⏳ PENDENTE
**7.3** Formulário de interesse | 3h | Média | ⏳ PENDENTE

## RF08 - Como Funciona (3 tarefas)

**8.1** Jornada do cliente | 2h | Média | ⏳ PENDENTE
**8.2** Jornada do prestador | 2h | Média | ⏳ PENDENTE
**8.3** FAQ geral | 2h | Baixa | ⏳ PENDENTE

## Infraestrutura Adicional (3 tarefas)

**INFRA-8** CI/CD pipeline | 4h | Média | ⏳ PENDENTE
**INFRA-9** Monitoramento | 3h | Baixa | ⏳ PENDENTE
**INFRA-10** Gerar tipos TypeScript | 0.5h | Alta | ⏳ PENDENTE *(manual)*

---

## Resumo Atualizado

| Status | Quantidade |
|--------|------------|
| **Concluídas** | 7 tarefas |
| **Pendentes Manuais** | 6 tarefas |
| **Pendentes Desenvolvimento** | 43 tarefas |
| **Total Geral** | 56 tarefas |

### Por Prioridade

- **Críticas**: 6 tarefas (2 concluídas, 4 pendentes)
- **Altas**: 20 tarefas (5 concluídas, 15 pendentes)
- **Médias**: 14 tarefas (0 concluídas, 14 pendentes)
- **Baixas**: 6 tarefas (0 concluídas, 6 pendentes)

### Estimativa de Tempo

- **Fase 1 (Configuração)**: ~13 horas ✅ CONCLUÍDA
- **Ações Manuais**: ~3 horas ⏳ PENDENTE
- **Desenvolvimento RFs**: ~134 horas ⏳ PENDENTE
- **Total Restante**: ~137 horas

---

## Labels para usar

frontend, backend, ui, component, form, validation, integration, supabase, auth, database, infra, devops, cicd, rf01-rf08, critical, high-priority, medium-priority, low-priority, nice-to-have, completed, in-progress, manual-action

---

## Próximos Passos Recomendados

1. **Imediato**: Completar ações manuais (MANUAL-1 a MANUAL-6)
2. **Sprint 1**: RF05 (LoginForm), RF04 (Cadastro), RF01 (Página Inicial)
3. **Sprint 2**: RF02 (Busca), RF03 (Perfil)
4. **Sprint 3**: RF06 (Dashboard), RF07, RF08
