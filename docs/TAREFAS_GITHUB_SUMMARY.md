# 📋 Tarefas para GitHub Projects - SOS Carros

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

## RF01 - Página Inicial (5 tarefas)

**1.1** Implementar Hero Section com busca | 2h | Alta
**1.2** Criar grid de categorias | 3h | Alta  
**1.3** Seção Como Funciona | 2h | Média
**1.4** Prestadores em Destaque | 4h | Alta
**1.5** Depoimentos e Footer | 2h | Média

## RF02 - Buscar Prestadores (6 tarefas)

**2.1** Layout da página de busca | 3h | Alta
**2.2** Componentes de filtro | 4h | Alta
**2.3** Provider Card component | 3h | Alta
**2.4** Integração Supabase - Listagem | 4h | Alta
**2.5** Ordenação e paginação | 3h | Média
**2.6** Mapa integrado (opcional) | 6h | Baixa

## RF03 - Perfil do Prestador (6 tarefas)

**3.1** Header do perfil | 3h | Alta
**3.2** Galeria de fotos e bio | 3h | Alta
**3.3** Lista de serviços | 2h | Alta
**3.4** Horário de funcionamento | 2h | Média
**3.5** Avaliações e reviews | 4h | Alta
**3.6** Formulário de agendamento | 6h | Alta

## RF04 - Cadastro de Usuários (4 tarefas)

**4.1** Layout do formulário | 2h | Alta
**4.2** Validação com Zod | 3h | Alta
**4.3** Integração Supabase Auth | 4h | Crítica
**4.4** OAuth Google (opcional) | 3h | Baixa

## RF05 - Autenticação/Login (5 tarefas)

**5.1** Formulário de login | 2h | Crítica
**5.2** Contexto de autenticação | 4h | Crítica
**5.3** Protected routes | 2h | Crítica
**5.4** Recuperação de senha | 3h | Média
**5.5** Logout e sessão | 1h | Alta

## RF06 - Dashboard do Prestador (6 tarefas)

**6.1** Layout do dashboard | 3h | Alta
**6.2** Visão geral com métricas | 6h | Alta
**6.3** Gestão de perfil | 6h | Alta
**6.4** Gestão de serviços | 5h | Alta
**6.5** Gestão de bookings | 8h | Crítica
**6.6** Responder reviews | 3h | Média

## RF07 - Seja Prestador (3 tarefas)

**7.1** Conteúdo institucional | 2h | Média
**7.2** Depoimentos e FAQ | 2h | Baixa
**7.3** Formulário de interesse | 3h | Média

## RF08 - Como Funciona (3 tarefas)

**8.1** Jornada do cliente | 2h | Média
**8.2** Jornada do prestador | 2h | Média
**8.3** FAQ geral | 2h | Baixa

## Infraestrutura (4 tarefas)

**INFRA-1** Configurar Supabase | 4h | Crítica
**INFRA-2** Setup ambiente local | 2h | Alta
**INFRA-3** CI/CD pipeline | 4h | Média
**INFRA-4** Monitoramento | 3h | Baixa

---

## Resumo

- **Total**: 56 tarefas
- **Estimativa**: ~150 horas
- **Críticas**: 6 tarefas
- **Altas**: 20 tarefas
- **Médias**: 14 tarefas
- **Baixas**: 6 tarefas

## Labels para usar

frontend, backend, ui, component, form, validation, integration, supabase, auth, database, infra, devops, cicd, rf01-rf08, critical, high-priority, medium-priority, low-priority, nice-to-have
