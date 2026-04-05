import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ToneImprover from '@/components/organisms/ToneImprover';

export const metadata = {
  title: 'Tone Improver — Diplomatic',
  description: 'Polish rough text into formal diplomatic language',
};

export default function ToneImproverPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:text-navy-700 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="font-medium" style={{ color: 'var(--navy-800)' }}>Tone Improver</span>
      </nav>

      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h1
          className="text-3xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Improve Diplomatic Tone
        </h1>
        <span className="gold-divider" aria-hidden="true" />
        <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
          Paste informal or direct text. The AI will rewrite it using proper diplomatic language.
        </p>
      </div>

      <ToneImprover />
    </div>
  );
}
