# 📚 Documentação Completa - SOS Carros

Este diretório contém toda a documentação técnica e de planejamento do projeto SOS Carros.

## 📄 Documentos Disponíveis

### 1. [DECISOES_ARQUITETURAIS.md](./DECISOES_ARQUITETURAIS.md)

**Propósito**: Registrar todas as decisões técnicas e arquiteturais do projeto

**Conteúdo**:

- Stack tecnológico (React 19, TanStack Router, TailwindCSS v4, Supabase)
- Justificativa da escolha do Supabase
- Arquitetura de dados e entidades principais
- Modelo de segurança com RLS
- Estrutura de rotas
- Estratégia de deploy

**Quando consultar**: Antes de tomar decisões técnicas ou entender o "porquê" das escolhas

---

### 2. [SUPABASE_SCHEMA.sql](./SUPABASE_SCHEMA.sql)

**Propósito**: Schema completo do banco de dados PostgreSQL para Supabase

**Conteúdo**:

- 8 tabelas principais (profiles, providers, services, bookings, reviews, etc.)
- Enums e tipos customizados
- Triggers e funções automáticas
- Políticas de Row Level Security (RLS)
- Views úteis (provider_listings, provider_dashboard)
- Índices para performance

**Como usar**:

```sql
-- Copiar todo o conteúdo e executar no SQL Editor do Supabase
-- Ou via CLI:
psql -h db.xxx.supabase.co -U postgres -d postgres -f SUPABASE_SCHEMA.sql
```

---

### 3. [SDD_ESPECIFICACOES.md](./SDD_ESPECIFICACOES.md)

**Propósito**: Especificações detalhadas de cada Requisito Funcional usando Spec-Driven Development

**Conteúdo por RF**:

- Descrição da funcionalidade
- Critérios de aceite (checklist)
- Casos de teste (formato Gherkin)
- Dependências
- Endpoints/APIs necessários
- Componentes de UI envolvidos
- Métricas de sucesso

**RFs Cobertos**:

- RF01: Página Inicial
- RF02: Buscar Prestadores
- RF03: Perfil do Prestador
- RF04: Cadastro de Usuários
- RF05: Autenticação/Login
- RF06: Dashboard do Prestador
- RF07: Seja Prestador
- RF08: Como Funciona

**Quando consultar**: Durante implementação de features e criação de testes

---

### 4. [PLANO_IMPLEMENTACAO_SUPABASE.md](./PLANO_IMPLEMENTACAO_SUPABASE.md)

**Propósito**: Guia passo-a-passo para implementação do Supabase

**Estrutura em 6 Fases**:

- **Fase 0**: Configuração inicial (0.5 dia)
- **Fase 1**: Banco de dados (1.5 dias)
- **Fase 2**: Autenticação (1 dia)
- **Fase 3**: Integração frontend (2 dias)
- **Fase 4**: Storage (0.5 dia)
- **Fase 5**: Realtime (0.5 dia)
- **Fase 6**: Testes (1 dia)

**Inclui**:

- Comandos exatos para executar
- Snippets de código prontos
- Checklists de validação
- Troubleshooting comum

**Tempo total estimado**: 7 dias

---

### 5. [TAREFAS_GITHUB_SUMMARY.md](./TAREFAS_GITHUB_SUMMARY.md)

**Propósito**: Lista resumida de tarefas para importar no GitHub Projects

**Conteúdo**:

- 56 tarefas divididas por RF
- Estimativa de horas por tarefa
- Priorização (Crítica, Alta, Média, Baixa)
- Labels sugeridas
- Instruções de importação

**Como usar**:

1. Acesse https://github.com/users/mjpfelicia/projects/5
2. Click em "Add item"
3. Copie título e descrição de cada tarefa

---

## 🗺️ Fluxo de Trabalho Recomendado

### Para Novos Desenvolvedores

1. Leia `DECISOES_ARQUITETURAIS.md` para entender o contexto
2. Execute `SUPABASE_SCHEMA.sql` no Supabase
3. Siga `PLANO_IMPLEMENTACAO_SUPABASE.md` fase por fase
4. Consulte `SDD_ESPECIFICACOES.md` ao implementar cada RF
5. Crie as tarefas no GitHub Projects usando `TAREFAS_GITHUB_SUMMARY.md`

### Para Implementar uma Feature

1. Identifique o RF em `SDD_ESPECIFICACOES.md`
2. Revise critérios de aceite
3. Verifique schema relacionado em `SUPABASE_SCHEMA.sql`
4. Implemente seguindo padrões de `PLANO_IMPLEMENTACAO_SUPABASE.md`
5. Crie testes baseados nos casos de teste do SDD

### Para Revisão de Código

1. Verifique se todos os critérios de aceite foram atendidos
2. Confirme que testes passam
3. Valide que RLS está funcionando
4. Cheque performance (queries otimizadas?)

---

## 📊 Status da Documentação

| Documento                       | Status      | Última Atualização | Versão |
| ------------------------------- | ----------- | ------------------ | ------ |
| DECISOES_ARQUITETURAIS.md       | ✅ Completo | 2025-01-XX         | 1.0.0  |
| SUPABASE_SCHEMA.sql             | ✅ Completo | 2025-01-XX         | 1.0.0  |
| SDD_ESPECIFICACOES.md           | ✅ Completo | 2025-01-XX         | 1.0.0  |
| PLANO_IMPLEMENTACAO_SUPABASE.md | ✅ Completo | 2025-01-XX         | 1.0.0  |
| TAREFAS_GITHUB_SUMMARY.md       | ✅ Completo | 2025-01-XX         | 1.0.0  |

---

## 🔄 Como Atualizar esta Documentação

1. **Mudanças arquiteturais**: Atualize `DECISOES_ARQUITETURAIS.md` e incremente versão
2. **Schema changes**: Adicione migration em `/migrations` e atualize `SUPABASE_SCHEMA.sql`
3. **Novas features**: Crite seção no `SDD_ESPECIFICACOES.md`
4. **Processos**: Atualize `PLANO_IMPLEMENTACAO_SUPABASE.md` se fluxo mudar

---

## 📞 Dúvidas?

Consulte a documentação na ordem recomendada ou abra uma issue no repositório.

**Link do Projeto**: https://github.com/users/mjpfelicia/projects/5

---

_Documentação mantida pela equipe SOS Carros_
_Última revisão: 2025-01-XX_
