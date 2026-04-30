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
