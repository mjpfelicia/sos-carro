# Como Criar Usuário Administrador

Este documento explica como criar o primeiro usuário administrador para acessar o sistema SOS Carros.

## Pré-requisitos

- Acesso ao dashboard do Supabase (https://supabase.com)
- Permissões de administrador no projeto Supabase

## Método 1: Via Dashboard do Supabase (Recomendado)

### Passo a passo:

1. **Acesse o Dashboard do Supabase**
   - Vá para https://supabase.com e faça login
   - Selecione seu projeto

2. **Navegue até Authentication**
   - No menu lateral, clique em **Authentication**
   - Depois em **Users**

3. **Adicionar Usuário Manualmente**
   - Clique no botão **Add user** (canto superior direito)
   - Preencha os dados:
     - **Email**: `admin@soscarros.com.br` (ou outro email de sua preferência)
     - **Senha**: Escolha uma senha forte (mínimo 8 caracteres)
     - **Confirm Password**: Confirme a senha
   - Marque a opção **Confirm email** (para não precisar verificar por email)
   - Em **User metadata**, adicione:
     ```json
     {
       "full_name": "Administrador do Sistema",
       "user_type": "admin"
     }
     ```
   - Clique em **Add user**

4. **Verificar na Tabela profiles**
   - Vá para **Table Editor**
   - Abra a tabela `profiles`
   - Localize o usuário criado
   - Edite o registro e certifique-se de que:
     - `user_type` = `admin`
     - `status` = `active`

## Método 2: Via SQL Script

1. **Acesse o SQL Editor**
   - No menu lateral, clique em **SQL Editor**
   - Clique em **New query**

2. **Execute o Script**
   - Copie o conteúdo do arquivo `CREATE_ADMIN_USER.sql` (na pasta `docs/`)
   - Cole no editor SQL
   - Clique em **Run** ou pressione `Ctrl+Enter`

3. **Verifique o Resultado**
   - O script irá criar o usuário com as seguintes credenciais padrão:
     - **Email**: `admin@soscarros.com.br`
     - **Senha**: `Admin@123456`
   - ⚠️ **IMPORTANTE**: Troque a senha após o primeiro login!

## Método 3: Via API/SDK (Programático)

Se preferir criar via código, use o SDK do Supabase:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_SERVICE_ROLE_KEY' // Use a service role key, não a anon key
)

async function createAdminUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@soscarros.com.br',
    password: 'Admin@123456',
    email_confirm: true,
    user_metadata: {
      full_name: 'Administrador do Sistema',
      user_type: 'admin'
    }
  })

  if (error) {
    console.error('Erro ao criar usuário:', error)
  } else {
    console.log('Usuário admin criado com sucesso:', data.user)
  }
}

createAdminUser()
```

## Credenciais Padrão (após execução do script SQL)

| Campo | Valor |
|-------|-------|
| Email | `admin@soscarros.com.br` |
| Senha | `Admin@123456` |
| Tipo | `admin` |
| Status | `active` |

⚠️ **ATENÇÃO**: 
- Estas são credenciais temporárias
- **Troque a senha imediatamente após o primeiro login**
- Nunca use estas credenciais em produção sem alterá-las

## Primeiro Acesso ao Sistema

1. Acesse a página de login do sistema (normalmente `/entrar` ou `/login`)
2. Use as credenciais do usuário admin criado
3. Você será redirecionado para o dashboard administrativo
4. **Importante**: Vá até as configurações e troque sua senha

## Troubleshooting

### Erro: "Invalid login credentials"
- Verifique se o email foi confirmado no dashboard do Supabase
- Confira se a senha está correta (lembre-se que é case-sensitive)

### Erro: "User not found"
- Execute o script SQL novamente
- Verifique se o trigger `create_profile_for_new_user` está ativo

### Erro: "Permission denied"
- Certifique-se de estar usando a **service role key** ao criar usuários programaticamente
- A chave anon não tem permissão para criar usuários diretamente

### Usuário criado mas não consegue login
- Verifique se o campo `email_confirmed_at` está preenchido na tabela `auth.users`
- Confira se o perfil na tabela `profiles` foi criado corretamente
- Verifique as políticas de RLS (Row Level Security)

## Segurança

Após criar o usuário administrador:

1. ✅ Troque a senha padrão imediatamente
2. ✅ Ative autenticação de dois fatores (2FA) se disponível
3. ✅ Revise as permissões e políticas de RLS
4. ✅ Monitore logs de acesso regularmente
5. ✅ Considere criar usuários adicionais com perfis específicos

## Links Úteis

- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [Managing Users in Supabase](https://supabase.com/docs/guides/auth/manage-users)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
