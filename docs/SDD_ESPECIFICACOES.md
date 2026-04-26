# 📝 Especificações SDD - SOS Carros

## Metodologia: Spec-Driven Development (SDD)

Cada requisito funcional será especificado com:

- **Descrição**: O que a feature faz
- **Critérios de Aceite**: Condições para considerar pronto
- **Casos de Teste**: Cenários de teste
- **Dependências**: O que precisa estar pronto antes
- **Endpoints/API**: Integrações necessárias
- **Componentes**: Elementos de UI envolvidos

---

## RF01 - Página Inicial (Landing Page)

### Descrição

Página principal do SOS Carros que apresenta a plataforma, busca rápida de serviços e call-to-actions para usuários e prestadores.

### Critérios de Aceite

- [ ] Hero section com título impactante e botão de busca
- [ ] Barra de busca com autocomplete por categoria e cidade
- [ ] Seção de categorias em destaque (8 categorias)
- [ ] Seção "Como Funciona" com 3 passos ilustrados
- [ ] Seção de prestadores em destaque (top rated)
- [ ] Depoimentos de clientes
- [ ] CTA para "Seja um Prestador"
- [ ] Footer com links institucionais
- [ ] Responsivo (mobile-first)
- [ ] Performance: Lighthouse > 90

### Casos de Teste

```gherkin
Cenário: Usuário acessa a página inicial
  Dado que estou na home do site
  Quando a página carrega
  Então devo ver o hero com busca
  E devo ver as 8 categorias principais
  E devo ver prestadores em destaque

Cenário: Usuário busca por categoria
  Dado que estou na home
  Quando clico em "Mecânica"
  Então sou redirecionado para /buscar?category=mecanica

Cenário: Usuário clica em "Seja Prestador"
  Dado que estou na home
  Quando clico no botão "Seja Prestador"
  Então sou redirecionado para /seja-prestador
```

### Dependências

- Componentes UI (Button, Card, Input)
- Dados mock de categorias e providers
- Router configurado

### Componentes

- `HeroSection`
- `CategoryGrid`
- `FeaturedProviders`
- `HowItWorks`
- `Testimonials`
- `CTASection`
- `Footer`

### Métricas de Sucesso

- Taxa de clique na busca > 40%
- Taxa de conversão para /buscar > 60%
- Tempo médio na página > 30s

---

## RF02 - Buscar Prestadores

### Descrição

Página de listagem e filtro de prestadores de serviços com opções de busca por categoria, localização, preço e avaliação.

### Critérios de Aceite

- [ ] Lista de prestadores com cards informativos
- [ ] Filtros laterais (categoria, preço, rating, distância)
- [ ] Ordenação (rating, distância, preço, mais recentes)
- [ ] Mapa integrado mostrando localização dos prestadores
- [ ] Paginação ou infinite scroll
- [ ] Indicador de disponibilidade em tempo real
- [ ] Badge de "Resposta Rápida", "Mais Avaliado"
- [ ] View mobile com filtros em drawer
- [ ] URL com query params para compartilhamento

### Casos de Teste

```gherkin
Cenário: Usuário filtra por categoria
  Dado que estou em /buscar
  Quando seleciono "Elétrica"
  Então vejo apenas prestadores de elétrica
  E a URL atualiza para ?category=eletrica

Cenário: Usuário ordena por rating
  Dado que estou em /buscar
  Quando seleciono ordenar por "Melhor Avaliados"
  Então os prestadores com maior rating aparecem primeiro

Cenário: Usuário aplica múltiplos filtros
  Dado que estou em /buscar
  Quando filtro por categoria="Mecânica" E preço máximo=100
  Então vejo prestadores que correspondem a ambos critérios
```

### Dependências

- RF01 concluído
- API de busca de providers (Supabase)
- Componente de mapa (Leaflet/Google Maps)
- Tipos TypeScript de Provider

### Endpoints Supabase

```typescript
// Query exemplo
const { data } = await supabase
  .from("provider_listings")
  .select("*")
  .eq("category", category)
  .gte("rating", minRating)
  .lte("price_from", maxPrice)
  .order("rating", { ascending: false });
```

### Componentes

- `ProviderList`
- `ProviderCard`
- `FilterSidebar`
- `FilterDrawer` (mobile)
- `SortDropdown`
- `MapView`
- `Pagination`

---

## RF03 - Perfil do Prestador

### Descrição

Página detalhada de um prestador específico com informações completas, serviços, avaliações e opção de agendamento.

### Critérios de Aceite

- [ ] Header com foto, nome, rating e badges
- [ ] Galeria de fotos do prestador
- [ ] Descrição/bio completa
- [ ] Lista de serviços com preços
- [ ] Horário de funcionamento
- [ ] Localização no mapa
- [ ] Avaliações e reviews (com filtro)
- [ ] Formulário de contato/agendamento rápido
- [ ] Botões de ação: "Agendar", "WhatsApp", "Compartilhar"
- [ ] Breadcrumb de navegação

### Casos de Teste

```gherkin
Cenário: Usuário visualiza perfil completo
  Dado que estou em /prestador/1
  Quando a página carrega
  Então vejo todas as informações do prestador
  E vejo a lista de serviços
  E vejo as avaliações

Cenário: Usuário entra em contato via WhatsApp
  Dado que estou no perfil do prestador
  Quando clico em "WhatsApp"
  Então sou redirecionado para wa.me/numerodoprestador

Cenário: Usuário agenda serviço
  Dado que estou no perfil do prestador
  Quando preencho o formulário de agendamento
  E submeto
  Então recebo confirmação
  E o booking é criado no banco
```

### Dependências

- RF02 concluído
- API de providers por ID
- API de reviews por provider
- Auth para agendamento

### Endpoints Supabase

```typescript
// Buscar provider por ID
const { data: provider } = await supabase
  .from("providers")
  .select("*, profiles(*), services(*), provider_photos(*)")
  .eq("id", id)
  .single();

// Buscar reviews
const { data: reviews } = await supabase
  .from("reviews")
  .select("*, profiles(full_name, avatar_url)")
  .eq("reviewed_provider_id", id)
  .eq("is_visible", true)
  .order("created_at", { ascending: false });
```

### Componentes

- `ProviderHeader`
- `PhotoGallery`
- `ServicesList`
- `AvailabilitySchedule`
- `ReviewsList`
- `ReviewCard`
- `BookingForm`
- `MapLocation`

---

## RF04 - Cadastro de Usuários

### Descrição

Fluxo de cadastro para novos usuários (clientes ou prestadores) com validação e confirmação de email.

### Critérios de Aceite

- [ ] Formulário com campos: nome, email, senha, confirmar senha
- [ ] Seleção de tipo de conta (Cliente ou Prestador)
- [ ] Validação em tempo real (zod)
- [ ] Confirmação de termos de uso
- [ ] Envio de email de verificação
- [ ] Redirecionamento pós-cadastro
- [ ] Mensagens de erro claras
- [ ] Link para login se já tiver conta
- [ ] OAuth com Google (opcional MVP)

### Casos de Teste

```gherkin
Cenário: Cadastro bem-sucedido
  Dado que estou em /cadastro
  Quando preencho todos os campos corretamente
  E submeto
  Então recebo email de verificação
  E sou redirecionado para dashboard

Cenário: Email já cadastrado
  Dado que estou em /cadastro
  Quando uso um email já existente
  Então vejo erro "Email já cadastrado"

Cenário: Senhas não conferem
  Dado que estou em /cadastro
  Quando as senhas não são iguais
  Então vejo erro "Senhas não conferem"
```

### Dependências

- Supabase Auth configurado
- Templates de email no Supabase

### Endpoints Supabase

```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name,
      user_type: accountType,
    },
    emailRedirectTo: `${window.location.origin}/dashboard`,
  },
});
```

### Componentes

- `SignUpForm`
- `AccountTypeSelector`
- `PasswordStrengthMeter`
- `TermsCheckbox`
- `OAuthButtons`

---

## RF05 - Autenticação/Login

### Descrição

Sistema de autenticação com login, logout, recuperação de senha e gestão de sessão.

### Critérios de Aceite

- [ ] Formulário de login (email/senha)
- [ ] Link "Esqueci minha senha"
- [ ] Fluxo de recuperação de senha
- [ ] Logout seguro
- [ ] Persistência de sessão
- [ ] Protected routes
- [ ] Redirect após login
- [ ] Mostrar erro de credenciais inválidas
- [ ] Loading state durante autenticação

### Casos de Teste

```gherkin
Cenário: Login bem-sucedido
  Dado que tenho uma conta verificada
  Quando faço login com credenciais corretas
  Então sou redirecionado para /dashboard
  E meu nome aparece no header

Cenário: Credenciais inválidas
  Dado que estou em /entrar
  Quando uso email ou senha incorretos
  Então vejo erro "Credenciais inválidas"

Cenário: Recuperação de senha
  Dado que estou em /entrar
  Quando clico em "Esqueci minha senha"
  E informo meu email
  Então recebo link de reset
```

### Dependências

- Supabase Auth configurado
- Contexto de autenticação

### Endpoints Supabase

```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// Logout
await supabase.auth.signOut();

// Reset password
await supabase.auth.resetPasswordForEmail(email);
```

### Componentes

- `LoginForm`
- `ForgotPasswordForm`
- `ResetPasswordForm`
- `AuthProvider` (context)
- `ProtectedRoute`

---

## RF06 - Dashboard do Prestador

### Descrição

Área administrativa do prestador para gerenciar perfil, serviços, bookings e visualizar métricas.

### Critérios de Aceite

- [ ] Visão geral com métricas (bookings, receita, rating)
- [ ] Gestão de perfil (editar informações)
- [ ] Gestão de serviços (CRUD)
- [ ] Lista de bookings (pendentes, confirmados, históricos)
- [ ] Atualizar status de bookings
- [ ] Gestão de horários/disponibilidade
- [ ] Visualizar e responder reviews
- [ ] Upload de fotos
- [ ] Configurações de notificação

### Casos de Teste

```gherkin
Cenário: Prestador visualiza dashboard
  Dado que sou um prestador logado
  Quando acesso /dashboard
  Então vejo minhas métricas do mês
  E vejo bookings pendentes

Cenário: Prestador atualiza status de booking
  Dado que tenho um booking pendente
  Quando mudo status para "Confirmado"
  Então o cliente é notificado
  E o booking atualiza no banco

Cenário: Prestador adiciona novo serviço
  Dado que estou em dashboard/serviços
  Quando crio um novo serviço
  Então ele aparece na lista
  E está visível no meu perfil público
```

### Dependências

- RF05 concluído (auth)
- APIs de CRUD de providers/services/bookings
- Storage do Supabase para fotos

### Endpoints Supabase

```typescript
// Dashboard metrics
const { data } = await supabase
  .from("provider_dashboard")
  .select("*")
  .eq("provider_id", providerId)
  .single();

// Update booking status
await supabase
  .from("bookings")
  .update({ status: "confirmed", confirmed_at: new Date() })
  .eq("id", bookingId);
```

### Componentes

- `DashboardLayout`
- `MetricsCards`
- `BookingsTable`
- `ServicesManager`
- `ProfileEditor`
- `AvailabilityCalendar`
- `ReviewsManager`
- `PhotoUploader`

---

## RF07 - Página Seja Prestador

### Descrição

Página institucional explicando benefícios de ser prestador na plataforma com formulário de interesse.

### Critérios de Aceite

- [ ] Hero com proposta de valor
- [ ] Benefícios listados (visibilidade, autonomia, etc.)
- [ ] Depoimentos de prestadores atuais
- [ ] FAQ sobre cadastro
- [ ] Formulário de interesse/cadastro inicial
- [ ] CTA claro para cadastro
- [ ] Design consistente com landing page

### Casos de Teste

```gherkin
Cenário: Usuário demonstra interesse
  Dado que estou em /seja-prestador
  Quando preencho formulário de interesse
  Então recebo confirmação
  E sou direcionado para cadastro completo
```

### Dependências

- RF01 concluído
- Integração com email/marketing

### Componentes

- `BenefitsSection`
- `TestimonialCarousel`
- `FAQAccordion`
- `InterestForm`

---

## RF08 - Página Como Funciona

### Descrição

Página explicativa detalhando o funcionamento da plataforma para clientes e prestadores.

### Critérios de Aceite

- [ ] Explicação passo-a-passo para clientes (3-5 passos)
- [ ] Explicação passo-a-passo para prestadores
- [ ] Ilustrações/icons para cada passo
- [ ] Vídeo explicativo (opcional)
- [ ] FAQ geral
- [ ] Links para cadastro nas duas jornadas

### Casos de Teste

```gherkin
Cenário: Cliente entende o processo
  Dado que estou em /como-funciona
  Quando visualizo a seção "Para Clientes"
  Então entendo os 4 passos do serviço

Cenário: Prestador entende o processo
  Dado que estou em /como-funciona
  Quando visualizo a seção "Para Prestadores"
  Então entendo como funciona a plataforma
```

### Dependências

- RF01 concluído

### Componentes

- `StepsTimeline`
- `DualJourneyTabs`
- `VideoEmbed`
- `GeneralFAQ`

---

## 📊 Matriz de Priorização

| RF   | Prioridade | Esforço | Impacto | Sprint |
| ---- | ---------- | ------- | ------- | ------ |
| RF01 | Alta       | Baixo   | Alto    | 1      |
| RF05 | Alta       | Médio   | Crítico | 1      |
| RF04 | Alta       | Médio   | Crítico | 1      |
| RF02 | Alta       | Médio   | Alto    | 2      |
| RF03 | Alta       | Médio   | Alto    | 2      |
| RF06 | Alta       | Alto    | Crítico | 3      |
| RF07 | Média      | Baixo   | Médio   | 1      |
| RF08 | Média      | Baixo   | Médio   | 1      |

---

_Documento SDD v1.0 - SOS Carros_
