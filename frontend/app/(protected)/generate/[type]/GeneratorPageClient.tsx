'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GeneratorConfig } from '@/types/generator.types';
import GeneratorForm from '@/components/organisms/GeneratorForm';
import OutputPanel from '@/components/organisms/OutputPanel';

export default function GeneratorPageClient({ config }: { config: GeneratorConfig }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <motion.nav
        className="flex items-center gap-1.5 text-sm mb-6"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Link href="/" className="hover:text-navy-700 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="font-medium" style={{ color: 'var(--navy-800)' }}>{config.title}</span>
      </motion.nav>

      {/* Page header */}
      <motion.div
        className="mb-8 pb-6 border-b"
        style={{ borderColor: 'var(--border)' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h1
          className="text-3xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.title}
        </h1>
        <span className="gold-divider" aria-hidden="true" />
        <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>{config.description}</p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-8 items-start">
        <motion.div
          className="sticky top-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <GeneratorForm config={config} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <OutputPanel />
        </motion.div>
      </div>
    </div>
  );
}
