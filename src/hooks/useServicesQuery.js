import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/api';

export function useServicesQuery() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/services`);
      if (!res.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await res.json();
      if (data.status !== 'success' || !data.data?.services) {
        return [];
      }
      return data.data.services.map((s, index) => ({
        id: s._id,
        _id: s._id,
        num: String(index + 1).padStart(2, '0'),
        title: s.title,
        category: s.category,
        description: s.description,
        suitedFor: s.suitedFor,
        builtToAchieve: s.builtToAchieve || [],
        canInclude: s.canInclude || []
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}
