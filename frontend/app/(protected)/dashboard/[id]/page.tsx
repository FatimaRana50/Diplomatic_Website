'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import { useDocument } from '@/hooks/useDocuments';
import DocumentView from './DocumentView';
import Spinner from '@/components/atoms/Spinner';

interface Props {
  params: Promise<{ id: string }>;
}

export default function DocumentPage({ params }: Props) {
  const { id } = use(params);
  const { data, isLoading, isError } = useDocument(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) return notFound();

  return <DocumentView document={data} />;
}
