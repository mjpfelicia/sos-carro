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
        .from('providers')
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
