# 🚀 Plano de Implementação Supabase - SOS Carros

## Visão Geral

Este plano detalha a implementação do Supabase em **passos pequenos e incrementais**, seguindo as especificações SDD e o schema definido.

---

## 📋 Pré-requisitos

- [ ] Conta no Supabase criada (https://supabase.com)
- [ ] Node.js 18+ instalado
- [ ] Projeto frontend já configurado
- [ ] Git configurado

---

## 🎯 Fase 0: Configuração Inicial (Dia 1)

### Passo 0.1: Criar Projeto no Supabase
```bash
# Acessar https://app.supabase.com
# Click em "New Project"
# Preencher:
# - Name: sos-carros
# - Database Password: <gerar senha forte>
# - Region: us-east-1 (mais próxima do Brasil)
```

**Critério de aceite**: Projeto criado e dashboard acessível

### Passo 0.2: Instalar CLI do Supabase
```bash
npm install -g supabase
# ou
bun add -g supabase
```

**Verificação**:
```bash
supabase --version
```

### Passo 0.3: Link com Projeto Local
```bash
cd /workspace
supabase login
supabase link --project-ref <seu-project-ref>
```

**Critério de aceite**: Conexão estabelecida sem erros

### Passo 0.4: Instalar SDK no Projeto
```bash
cd /workspace
bun add @supabase/supabase-js
```

### Passo 0.5: Configurar Variáveis de Ambiente
```bash
# Criar arquivo .env.local
cat > .env.local << EOF
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
EOF
```

**⚠️ Importante**: Nunca commitar chaves no git

### Passo 0.6: Criar Estrutura de Libs
```bash
mkdir -p src/lib
cat > src/lib/supabase.ts << 'EOF'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos auxiliares
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Exportar tipos das tabelas
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update'];
EOF
```

---

## 🗄️ Fase 1: Banco de Dados (Dia 1-2)

### Passo 1.1: Executar Schema SQL
```bash
# Copiar conteúdo de docs/SUPABASE_SCHEMA.sql
# Ir para SQL Editor no dashboard do Supabase
# Colar e executar todo o script
```

**Verificação**:
```sql
-- Testar no SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
-- Deve retornar 8 tabelas
```

### Passo 1.2: Gerar Tipos TypeScript
```bash
cd /workspace
supabase gen types typescript --linked > src/types/supabase.ts
```

**Critério de aceite**: Arquivo de tipos gerado com todas as tabelas

### Passo 1.3: Popular Dados de Seed (Opcional Dev)
```bash
# Criar script de seed
cat > scripts/seed-providers.ts << 'EOF'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
);

// Dados mock dos providers existentes
const providers = [...]; // copiar do src/data

async function seed() {
  for (const provider of providers) {
    await supabase.from('providers').insert({
      business_name: provider.name,
      category: provider.categoryId,
      bio: provider.bio,
      city: 'São Paulo',
      state: 'SP',
      rating: provider.rating,
      reviews_count: provider.reviewsCount,
      price_from: provider.priceFrom,
      is_available: provider.available,
      response_time: provider.responseTime,
      // ... mapear todos os campos
    });
  }
  console.log('Seed completed!');
}

seed();
EOF
```

---

## 🔐 Fase 2: Autenticação (Dia 2-3)

### Passo 2.1: Configurar Auth Providers
```bash
# No dashboard do Supabase:
# Authentication -> Providers
# Habilitar:
# - Email Provider (já vem enabled)
# - Google OAuth (opcional, requer credentials)
```

### Passo 2.2: Configurar Email Templates
```bash
# Authentication -> Email Templates
# Personalizar:
# - Confirm signup
# - Reset password
# - Magic link
```

### Passo 2.3: Criar Contexto de Auth
```bash
cat > src/contexts/AuthContext.tsx << 'EOF'
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, userType: 'customer' | 'provider') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'customer' | 'provider') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
EOF
```

### Passo 2.4: Atualizar App Principal
```bash
# Editar src/routes/__root.tsx
# Adicionar AuthProvider envolvendo o app
```

### Passo 2.5: Criar Protected Route Component
```bash
cat > src/components/ProtectedRoute.tsx << 'EOF'
import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children, requireProvider = false }: { 
  children: React.ReactNode; 
  requireProvider?: boolean;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.navigate({ to: '/entrar' });
    }
    
    if (!loading && requireProvider && user) {
      // Check if user is provider
      // Implementation depends on profile fetch
    }
  }, [user, loading, requireProvider, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
EOF
```

---

## 🧩 Fase 3: Integração com Frontend (Dia 3-5)

### Passo 3.1: Criar Hooks de Data Fetching
```bash
mkdir -p src/hooks
cat > src/hooks/useProviders.ts << 'EOF'
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useProviders(filters?: {
  category?: string;
  city?: string;
  minRating?: number;
  maxPrice?: number;
}) {
  return useQuery({
    queryKey: ['providers', filters],
    queryFn: async () => {
      let query = supabase
        .from('provider_listings')
        .select('*')
        .eq('is_active', true);

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      
      if (filters?.minRating) {
        query = query.gte('rating', filters.minRating);
      }
      
      if (filters?.maxPrice) {
        query = query.lte('price_from', filters.maxPrice);
      }

      const { data, error } = await query.order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}
EOF
```

### Passo 3.2: Hook para Provider Individual
```bash
cat > src/hooks/useProvider.ts << 'EOF'
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useProvider(id: string) {
  return useQuery({
    queryKey: ['provider', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select(`
          *,
          profiles(full_name, avatar_url, phone),
          services(*),
          provider_photos(*),
          reviews(
            *,
            profiles(full_name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}
EOF
```

### Passo 3.3: Hook para Bookings
```bash
cat > src/hooks/useBookings.ts << 'EOF'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useMyBookings(userId: string) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          provider(business_name, category),
          customer(full_name, phone)
        `)
        .or(`customer_id.eq.${userId},provider_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
EOF
```

---

## 🖼️ Fase 4: Storage (Dia 5)

### Passo 4.1: Criar Bucket no Supabase
```bash
# Dashboard -> Storage -> New Bucket
# Name: provider-photos
# Public: true
# File size limit: 5MB
```

### Passo 4.2: Configurar Policies do Storage
```sql
-- No SQL Editor
CREATE POLICY "Anyone can view photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'provider-photos');

CREATE POLICY "Providers can upload photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'provider-photos' AND
  auth.uid() IN (
    SELECT user_id FROM providers WHERE id = (storage.foldername(name))[1]
  )
);
```

### Passo 4.3: Criar Hook de Upload
```bash
cat > src/hooks/useUploadPhoto.ts << 'EOF'
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUploadPhoto() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File, providerId: string) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${providerId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('provider-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('provider-photos')
        .getPublicUrl(fileName);

      // Create record in provider_photos table
      await supabase.from('provider_photos').insert({
        provider_id: providerId,
        photo_url: publicUrl,
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, progress };
}
EOF
```

---

## 🔔 Fase 5: Realtime e Notificações (Dia 6)

### Passo 5.1: Habilitar Realtime nas Tabelas
```bash
# Dashboard -> Database -> Replication
# Enable realtime para:
# - bookings
# - notifications
```

### Passo 5.2: Criar Hook de Realtime para Bookings
```bash
cat > src/hooks/useRealtimeBookings.ts << 'EOF'
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeBookings(providerId: string, onNewBooking: (booking: any) => void) {
  useEffect(() => {
    const channel = supabase
      .channel('bookings-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
          filter: `provider_id=eq.${providerId}`,
        },
        (payload) => {
          onNewBooking(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [providerId, onNewBooking]);
}
EOF
```

---

## 🧪 Fase 6: Testes e Validação (Dia 7)

### Passo 6.1: Testar Fluxo Completo de Auth
```bash
# Checklist:
# [ ] Criar nova conta via email
# [ ] Verificar email de confirmação
# [ ] Fazer login
# [ ] Fazer logout
# [ ] Reset de senha
# [ ] Protected routes redirecionam corretamente
```

### Passo 6.2: Testar CRUD de Providers
```bash
# Checklist:
# [ ] Listar providers funciona
# [ ] Filtrar por categoria funciona
# [ ] Ver detalhes do provider funciona
# [ ] RLS está funcionando (tentar acessar dados privados)
```

### Passo 6.3: Testar Bookings
```bash
# Checklist:
# [ ] Criar booking como cliente
# [ ] Provider recebe notificação
# [ ] Provider pode atualizar status
# [ ] Cliente vê atualização em realtime
```

---

## 📊 Cronograma Resumido

| Fase | Dias | Tarefas Principais |
|------|------|-------------------|
| Fase 0 | 0.5 | Setup inicial, env vars |
| Fase 1 | 1.5 | Schema, tipos, seed |
| Fase 2 | 1 | Auth, contexto, protected routes |
| Fase 3 | 2 | Hooks, integração frontend |
| Fase 4 | 0.5 | Storage, upload de fotos |
| Fase 5 | 0.5 | Realtime, notificações |
| Fase 6 | 1 | Testes, validação |
| **Total** | **7 dias** | **Implementação completa** |

---

## ✅ Checklist Final de Implementação

### Infraestrutura
- [ ] Projeto Supabase criado
- [ ] Schema executado com sucesso
- [ ] RLS policies ativas
- [ ] Buckets de storage configurados
- [ ] Email templates personalizados

### Código
- [ ] SDK instalado e configurado
- [ ] Types gerados e importados
- [ ] AuthContext funcional
- [ ] Hooks de data fetching criados
- [ ] Protected routes implementadas
- [ ] Upload de fotos funcionando
- [ ] Realtime configurado

### Testes
- [ ] Fluxo de auth testado
- [ ] CRUD de providers testado
- [ ] Bookings end-to-end testado
- [ ] RLS validado
- [ ] Performance verificada

### Documentação
- [ ] README atualizado com setup
- [ ] ENV example criado
- [ ] API endpoints documentados

---

## 🆘 Troubleshooting Comum

### Erro: "Invalid API key"
```bash
# Verificar se está usando anon key (não service role)
# Verificar se variáveis de ambiente estão carregadas
console.log(import.meta.env.VITE_SUPABASE_URL);
```

### Erro: "Row Level Security"
```sql
-- Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Se necessário, desabilitar temporariamente para debug
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
```

### Erro: "JWT expired"
```typescript
// O cliente Supabase gerencia refresh automaticamente
// Verificar se onAuthStateChange está configurado corretamente
```

---

*Plano de Implementação v1.0 - SOS Carros*
*Última atualização: 2025-01-XX*
