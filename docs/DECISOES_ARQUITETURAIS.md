# 📋 Decisões Arquiteturais - SOS Carros

## 🎯 Visão Geral do Projeto

**SOS Carros** é uma plataforma de conexão entre motoristas e prestadores de serviços automotivos emergenciais.

---

## 🏗️ Stack Tecnológico

### Frontend

- **Framework**: React 19
- **Router**: TanStack Router v1.168
- **Estilização**: TailwindCSS v4.2.1
- **Componentes UI**: Radix UI (acessibilidade)
- **Forms**: React Hook Form + Zod validation
- **Estado Server**: TanStack Query v5
- **Build Tool**: Vite 7
- **Deploy**: Cloudflare Pages/Vercel

### Backend (Decisão: Supabase)

- **Banco de Dados**: PostgreSQL (Supabase)
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage (avatars, fotos)
- **Realtime**: Supabase Realtime (notificações)
- **Edge Functions**: Supabase Functions (lógica server-side)
- **RLS**: Row Level Security (segurança por linha)

### Por que Supabase?

1. ✅ **PostgreSQL completo** - Suporte a queries complexas, geolocalização (PostGIS)
2. ✅ **Auth integrado** - Email, Google, telefone, magic link
3. ✅ **RLS nativo** - Segurança granular no banco
4. ✅ **Tempo real** - Notificações instantâneas para prestadores
5. ✅ **Escalabilidade** - Cresce com o projeto sem refatoração
6. ✅ **Custo-benefício** - Plano free generoso (500MB, 50k MAU)
7. ✅ **DX excelente** - TypeScript auto-generated, SDK oficial
8. ✅ **Cloudflare compatible** - Funciona bem com edge deployment

---

## 📊 Arquitetura de Dados

### Entidades Principais

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Users     │──1:1──│   Profiles   │──1:N──│  Providers  │
└─────────────┘       └──────────────┘       └─────────────┘
                              │                      │
                              │1:N                  │1:N
                              ▼                      ▼
                       ┌──────────────┐       ┌─────────────┐
                       │   Reviews    │       │  Services   │
                       └──────────────┘       └─────────────┘
                              ▲                      │
                              │                      │1:N
                              │                      ▼
                       ┌──────────────┐       ┌─────────────┐
                       │  Bookings    │◄──────│ Availability│
                       └──────────────┘       └─────────────┘
```

---

## 🔐 Modelo de Segurança

### Row Level Security (RLS)

| Tabela         | Políticas Implementadas                      |
| -------------- | -------------------------------------------- |
| `profiles`     | User vê apenas seu perfil; Admin vê todos    |
| `providers`    | Público lê; User cria/edita o próprio        |
| `bookings`     | Cliente e prestador envolvidos acessam       |
| `reviews`      | Público lê; User cria apenas se teve booking |
| `availability` | Prestador gerencia; Público lê               |

### Autenticação

- **Métodos suportados**: Email/Senha, Google OAuth, Magic Link
- **Session management**: JWT com refresh tokens
- **Protected routes**: Dashboard, Perfil, Bookings
- **Public routes**: Home, Buscar, Como Funciona, Seja Prestador

---

## 🌐 Estrutura de Rotas

```
/ (Landing Page)                    [PÚBLICO]
/buscar                             [PÚBLICO]
/como-funciona                      [PÚBLICO]
/seja-prestador                     [PÚBLICO]
/prestador/:id                      [PÚBLICO]
/entrar                             [PÚBLICO/AUTENTICADO]
/cadastro                           [PÚBLICO/AUTENTICADO]
/dashboard                          [PROTEGIDO]
/dashboard/perfil                   [PROTEGIDO]
/dashboard/bookings                 [PROTEGIDO]
/dashboard/configuracoes            [PROTEGIDO]
```

---

## 📦 Estratégia de Estado

| Tipo de Estado | Solução                 | Justificativa                |
| -------------- | ----------------------- | ---------------------------- |
| Server State   | TanStack Query          | Cache, revalidação, otimista |
| Auth State     | Supabase Auth + Context | Session management           |
| Form State     | React Hook Form         | Performance, validação       |
| UI State       | Component local         | Simplicidade                 |
| Global State   | Context API (mínimo)    | Evitar complexidade          |

---

## 🚀 Estratégia de Deploy

### Ambiente de Desenvolvimento

- Hot reload com Vite
- Supabase local (Docker) ou cloud dev
- Mock data para desenvolvimento offline

### Ambiente de Produção

- **Frontend**: Vercel ou Cloudflare Pages
- **Backend**: Supabase Cloud
- **CDN**: Automático pela plataforma
- **SSL**: Automático

### CI/CD

- GitHub Actions para testes
- Preview deployments em PRs
- Deploy automático na main

---

## 📈 Métricas de Sucesso

| Métrica                             | Meta   | Ferramenta |
| ----------------------------------- | ------ | ---------- |
| Tempo de carregamento               | < 2s   | Lighthouse |
| First Contentful Paint              | < 1.5s | Web Vitals |
| Taxa de conversão (busca → booking) | > 15%  | Analytics  |
| Retenção de prestadores (30 dias)   | > 60%  | Supabase   |
| NPS                                 | > 50   | Survey     |

---

## 🔄 Próximos Passos

1. ✅ Documentar decisões arquiteturais
2. ⏳ Criar schema do banco de dados
3. ⏳ Especificações SDD por RF
4. ⏳ Plano de implementação detalhado
5. ⏳ Configurar projeto Supabase
6. ⏳ Migrar dados mock para DB real
7. ⏳ Implementar autenticação
8. ⏳ Integrar APIs com frontend

---

_Documento criado em: 2025-01-XX_
_Última atualização: 2025-01-XX_
_Versão: 1.0.0_
