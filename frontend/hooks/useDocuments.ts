'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { useAuthStore } from '@/stores/authStore';
import type { Document, PaginatedDocuments } from '@/types/document.types';
import { toast } from 'sonner';

export function useDocumentHistory(page = 1) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<PaginatedDocuments>({
    queryKey: ['documents', page, isAuthenticated],
    queryFn: async () => {
      const res = await apiClient.get<PaginatedDocuments>('/api/documents', {
        params: { page, pageSize: 10 },
      });
      return res.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDocument(id: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<Document>({
    queryKey: ['document', id],
    queryFn: async () => {
      const res = await apiClient.get<Document>(`/api/documents/${id}`);
      return res.data;
    },
    enabled: !!id && isAuthenticated,
  });
}

export function useSendEmailMutation() {
  return useMutation({
    mutationFn: async (payload: { to: string; subject: string; body: string }) => {
      const res = await apiClient.post('/api/email', payload);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      toast.success(`Email sent to ${variables.to}`);
    },
    onError: () => {
      toast.error('Failed to send email');
    },
  });
}
