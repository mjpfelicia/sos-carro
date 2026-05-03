-- =====================================================
-- SCRIPT PARA CRIAR USUÁRIO ADMINISTRADOR
-- =====================================================
-- Execute este script no Editor SQL do Supabase
-- Para criar o primeiro usuário administrador do sistema
-- =====================================================

-- Configurações do usuário admin
-- Altere estas variáveis conforme necessário
\set admin_email 'admin@soscarros.com.br'
\set admin_password 'Admin@123456'
\set admin_name 'Administrador do Sistema'

-- =====================================================
-- 1. CRIAR USUÁRIO NA TABELA auth.users
-- =====================================================
-- Nota: A criação direta em auth.users requer permissões especiais
-- O método recomendado é através da função signup ou API

-- Opção A: Usando a função signup do Supabase (Recomendado)
-- Execute isso na seção Authentication > Users do dashboard do Supabase
-- Ou use a API REST/SDK

-- =====================================================
-- 2. SCRIPT ALTERNATIVO - Inserção direta (requer permissões)
-- =====================================================
-- Se você tem acesso de superadmin, pode usar:

DO $$
DECLARE
  v_user_id UUID;
  v_email TEXT := 'admin@soscarros.com.br';
  v_password TEXT := 'Admin@123456';
  v_full_name TEXT := 'Administrador do Sistema';
BEGIN
  -- Criar usuário na tabela auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    v_email,
    crypt(v_password, gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', v_full_name,
      'user_type', 'admin'
    ),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO v_user_id;
  
  RAISE NOTICE 'Usuário admin criado com ID: %', v_user_id;
EXCEPTION
  WHEN unique_violation THEN
    RAISE NOTICE 'E-mail já existe. Atualizando usuário existente...';
    
    -- Atualizar usuário existente para admin
    UPDATE auth.users
    SET 
      raw_user_meta_data = jsonb_build_object(
        'full_name', v_full_name,
        'user_type', 'admin'
      ),
      email_confirmed_at = NOW(),
      updated_at = NOW()
    WHERE email = v_email;
    
    RAISE NOTICE 'Usuário atualizado para administrador.';
END $$;

-- =====================================================
-- 3. ATUALIZAR PERFIL NA TABELA profiles
-- =====================================================
-- O trigger create_profile_for_new_user deve criar automaticamente
-- Mas podemos garantir que o perfil esteja correto:

UPDATE profiles
SET 
  user_type = 'admin',
  status = 'active',
  full_name = 'Administrador do Sistema',
  updated_at = NOW()
WHERE email = 'admin@soscarros.com.br';

-- =====================================================
-- 4. VERIFICAR CRIAÇÃO
-- =====================================================
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.user_type,
  p.status,
  p.full_name,
  p.created_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'admin@soscarros.com.br';

-- =====================================================
-- INSTRUÇÕES DE USO:
-- =====================================================
-- 1. Acesse o dashboard do Supabase
-- 2. Vá para SQL Editor
-- 3. Cole e execute este script
-- 4. Use as credenciais abaixo para login:
--
--    Email: admin@soscarros.com.br
--    Senha: Admin@123456
--
-- 5. IMPORTANTE: Troque a senha após o primeiro login!
-- =====================================================
