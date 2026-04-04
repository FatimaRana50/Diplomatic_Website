'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';

interface TranslatePayload {
  text: string;
  targetLanguage: string;
}

interface TranslateResult {
  translatedText: string;
}

export function useTranslateMutation() {
  return useMutation<TranslateResult, Error, TranslatePayload>({
    mutationFn: async ({ text, targetLanguage }) => {
      const token = useAuthStore.getState().token;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${apiUrl}/api/email/translate`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text, targetLanguage }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed: ${res.status}`);
      }

      return res.json();
    },
  });
}
