import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/api';

export function useTestimonialsQuery() {
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/testimonials`);
            if (!res.ok) throw new Error('Failed to fetch testimonials');
            const data = await res.json();
            if (data.status !== 'success') throw new Error('Failed to fetch testimonials');
            return data.data.testimonials;
        },
        staleTime: 5 * 60 * 1000,
    });
}
