import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../utils/api';

export function useContactMutation() {
    return useMutation({
        mutationFn: async (formData) => {
            const res = await axios.post(`${API_URL}/contact`, formData);
            return res.data;
        },
    });
}
