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

    // TODO: Implementar verificação de tipo de usuário quando o perfil estiver disponível
    if (!loading && requireProvider && user) {
      // Check if user is provider
      // Implementation depends on profile fetch
    }
  }, [user, loading, requireProvider, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
