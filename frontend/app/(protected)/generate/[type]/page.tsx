import { notFound } from 'next/navigation';
import { GENERATOR_CONFIGS } from '@/config/generators';
import GeneratorPageClient from './GeneratorPageClient';

interface Props {
  params: Promise<{ type: string }>;
}

export default async function GeneratorPage({ params }: Props) {
  const { type } = await params;
  const config = GENERATOR_CONFIGS[type];
  if (!config) notFound();
  return <GeneratorPageClient config={config} />;
}

export function generateStaticParams() {
  return Object.keys(GENERATOR_CONFIGS).map((type) => ({ type }));
}
