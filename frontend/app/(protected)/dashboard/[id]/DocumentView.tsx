'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect } from 'react';
import type { Document } from '@/types/document.types';
import { useGeneratorStore } from '@/stores/generatorStore';
import { useUpdateDocumentMutation } from '@/hooks/useDocuments';
import Badge from '@/components/atoms/Badge';
import OutputPanel from '@/components/organisms/OutputPanel';

const typeLabels: Record<string, string> = {
  'note-verbale': 'Note Verbale',
  'meeting-brief': 'Meeting Brief',
  'meeting-summary': 'Meeting Summary',
  speech: 'Speech',
  'diplomatic-letter': 'Diplomatic Letter',
  'talking-points': 'Talking Points',
  invitation: 'Invitation',
};

interface DocumentViewProps {
  document: Document;
}

export default function DocumentView({ document }: DocumentViewProps) {
  const { setOutput, clearOutput } = useGeneratorStore();
  const { mutateAsync: updateDocument } = useUpdateDocumentMutation(document.id as string);

  useEffect(() => {
    setOutput(document.content);
    return () => { clearOutput(); };
  }, [document.content, setOutput, clearOutput]);

  const label = typeLabels[document.type] || document.type;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-navy-700 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Badge variant="default">{label}</Badge>
          <span className="text-sm text-text-muted">
            {format(new Date(document.createdAt), 'dd MMMM yyyy')}
          </span>
        </div>
        <h1
          className="text-2xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {document.subject}
        </h1>
      </div>

      <OutputPanel onSave={updateDocument} />
    </div>
  );
}
