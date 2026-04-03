'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

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
      const res = await apiClient.post<TranslateResult>('/api/email/translate', {
        text,
        targetLanguage,
      });
      return res.data;
    },
  });
}
