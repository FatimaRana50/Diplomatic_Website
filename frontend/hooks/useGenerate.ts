'use client';

import { useGeneratorStore } from '@/stores/generatorStore';
import { useAuthStore } from '@/stores/authStore';
import { applyConfidentialMode } from '@/lib/confidentialMode';
import { streamGenerate } from '@/lib/streamGenerate';
import type { GeneratorConfig } from '@/types/generator.types';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export function useGenerate(config: GeneratorConfig) {
  const queryClient = useQueryClient();
  const {
    isConfidentialMode,
    appendOutput,
    clearOutput,
    setIsGenerating,
  } = useGeneratorStore();

  const generate = async (data: Record<string, unknown>) => {
    clearOutput();
    setIsGenerating(true);

    // Read token at call time, not at render time
    const token = useAuthStore.getState().token;

    const payload = isConfidentialMode
      ? applyConfidentialMode(data, config.confidentialFields)
      : data;

    try {
      const stream = streamGenerate(config.id, payload, token || '');
      for await (const chunk of stream) {
        appendOutput(chunk);
      }
      // Give the backend ~1.5s to finish its async MongoDB save, then bust the dashboard cache
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['documents'] });
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Generation failed';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate };
}
