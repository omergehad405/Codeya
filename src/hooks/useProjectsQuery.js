import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/api';

export function useProjectsQuery() {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/projects`);
            if (!res.ok) throw new Error('Failed to fetch projects');
            const data = await res.json();
            if (data.status !== 'success') throw new Error('Failed to fetch projects');
            return data.data.projects.map(p => ({
                id: p._id,
                _id: p._id,
                title: p.name,
                description: p.description,
                link: p.link,
                image: p.image,
                category: p.category || ['websites'],
                ready: p.status === 'completed' || !!p.link,
            }));
        },
        staleTime: 5 * 60 * 1000,
    });
}
