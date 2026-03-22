'use client';

import Link from 'next/link';
import { Wand2, ArrowRight, FileText } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { getAllGenerators } from '@/config/generators';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const container: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cardVariant: any = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};


export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const generators = getAllGenerators();
  const firstName = user?.name?.split(' ')[0] ?? 'Ambassador';

  return (
    <div className="relative min-h-screen">
      {/* Background mesh */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,184,58,0.05) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,27,42,0.04) 0%, transparent 65%)',
        }} />
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(74,97,128,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">

        {/* Greeting */}
        <motion.section
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px flex-1 max-w-8" style={{ background: 'var(--gold-400)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--gold-600)' }}>
              {formatDate()}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {getGreeting()},{' '}
            <span style={{ color: 'var(--gold-600)' }}>{firstName}.</span>
          </h1>
          <p className="text-text-secondary mt-1">
            Select a document type to begin generating.
          </p>
        </motion.section>

        {/* Generator Grid */}
        <section className="flex flex-col gap-5">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-base font-semibold text-navy-700 uppercase tracking-widest"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              Document Generators
            </h2>
            <span className="text-xs text-text-muted">{generators.length} types available</span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {generators.map((gen) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const IconComp = (Icons as Record<string, any>)[gen.icon] as React.ComponentType<{ size?: number; className?: string }> | undefined;
              return (
                <motion.div key={gen.id} variants={cardVariant}>
                  <Link
                    href={`/generate/${gen.id}`}
                    className="group flex flex-col gap-4 p-5 h-full bg-white rounded-[var(--radius-xl)] transition-all duration-250"
                    style={{
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1.5px var(--gold-400), var(--shadow-md)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-400)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    }}
                  >
                    <motion.div
                      className="w-11 h-11 rounded-[var(--radius-lg)] bg-navy-050 flex items-center justify-center text-navy-700"
                      whileHover={{ scale: 1.1, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      style={{ background: 'var(--navy-050)' }}
                    >
                      {IconComp ? <IconComp size={20} /> : <FileText size={20} />}
                    </motion.div>
                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="text-sm font-semibold text-navy-900 group-hover:text-navy-700 transition-colors">
                        {gen.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">{gen.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors"
                      style={{ color: 'var(--gold-600)' }}>
                      Generate
                      <motion.span
                        className="inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <ArrowRight size={12} />
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Tone Improver card */}
            <motion.div variants={cardVariant}>
              <Link
                href="/tools/tone"
                className="group flex flex-col gap-4 p-5 h-full bg-white rounded-[var(--radius-xl)] transition-all duration-250"
                style={{ border: '1.5px solid var(--teal-500)', boxShadow: '0 0 0 0 var(--teal-100)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px var(--teal-100), var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 var(--teal-100)';
                }}
              >
                <motion.div
                  className="w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center"
                  style={{ background: 'var(--teal-100)', color: 'var(--teal-600)' }}
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Wand2 size={20} />
                </motion.div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-navy-900">Tone Improver</h3>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                      style={{ background: 'var(--teal-100)', color: 'var(--teal-600)' }}>
                      Tool
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Polish informal text into proper diplomatic language instantly
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: 'var(--teal-600)' }}>
                  Open Tool
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
