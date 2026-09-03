import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/api';

export function useStatsQuery() {
    return useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/stats`);
            if (!res.ok) throw new Error('Failed to fetch stats');
            const data = await res.json();
            if (data.status !== 'success') throw new Error('Failed to fetch stats');
            return data.data;
        },
        staleTime: 5 * 60 * 1000,
    });
}
