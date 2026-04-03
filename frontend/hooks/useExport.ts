'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type ExportFormat = 'docx' | 'pdf';

export function useExportMutation(format: ExportFormat) {
  return useMutation({
    mutationFn: async (content: string) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/download/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, filename: 'diplomatic-document' }),
        credentials: 'include',
      });

      if (!res.ok) throw new Error(`Export failed: ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diplomatic-document.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error(`Failed to export .${format}`);
    },
  });
}
