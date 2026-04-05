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
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cardVariant: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const generators = getAllGenerators();
  const firstName = user?.name?.split(' ')[0] ?? 'Ambassador';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 60%, var(--navy-700) 100%)',
          boxShadow: '0 8px 32px rgba(13,27,42,0.25)',
        }}
      >
        {/* Gold accent top stripe */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, var(--gold-400) 30%, var(--gold-500) 50%, var(--gold-400) 70%, transparent 100%)' }}
        />
        {/* Dot grid pattern overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Glow orbs */}
        <div aria-hidden="true" className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 60%)' }} />
        <div aria-hidden="true" className="absolute -left-10 bottom-0 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(20,144,138,0.08) 0%, transparent 60%)' }} />

        <div className="relative px-8 py-10 sm:py-12 flex items-start justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold-400)' }} aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--gold-500)' }}>
                Diplomatic Document Platform
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {getGreeting()},{' '}
              <span style={{ color: 'var(--gold-400)' }}>{firstName}.</span>
            </h1>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Select a document type below to begin AI-assisted generation.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 self-start pt-1">
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{formatDate()}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>AI Engine Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Generator Grid ──────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, var(--gold-400), var(--gold-600))' }} aria-hidden="true" />
            <h2 className="text-sm font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--navy-700)' }}>
              Document Generators
            </h2>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--navy-050)', color: 'var(--navy-400)', border: '1px solid var(--border-light)' }}>
            {generators.length} types
          </span>
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
              <motion.div key={gen.id} variants={cardVariant} className="h-full">
                <Link
                  href={`/generate/${gen.id}`}
                  className="group flex flex-col h-full rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 12px 28px rgba(13,27,42,0.15), 0 0 0 1.5px var(--gold-400)';
                    el.style.borderColor = 'var(--gold-400)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'var(--shadow-card)';
                    el.style.borderColor = 'var(--border)';
                  }}
                >
                  {/* Navy top section with icon */}
                  <div
                    className="px-5 pt-5 pb-4"
                    style={{ background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: 'rgba(232,184,58,0.15)',
                        border: '1px solid rgba(232,184,58,0.3)',
                      }}
                    >
                      <span style={{ color: 'var(--gold-400)' }}>
                        {IconComp ? <IconComp size={18} /> : <FileText size={18} />}
                      </span>
                    </div>
                  </div>

                  {/* White body */}
                  <div className="flex flex-col gap-1.5 px-5 pt-4 pb-3 flex-1">
                    <h3 className="text-sm font-semibold text-navy-900 leading-snug">
                      {gen.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {gen.description}
                    </p>
                  </div>

                  {/* Gold CTA footer */}
                  <div
                    className="flex items-center gap-1.5 px-5 py-3 border-t"
                    style={{ borderColor: 'var(--border-light)' }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--gold-600)' }}>
                      Generate
                    </span>
                    <ArrowRight size={12} style={{ color: 'var(--gold-500)' }} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Tone Improver card */}
          <motion.div variants={cardVariant} className="h-full">
            <Link
              href="/tools/tone"
              className="group flex flex-col h-full rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: 'white',
                border: '1px solid rgba(15,118,110,0.4)',
                boxShadow: '0 2px 8px rgba(15,118,110,0.08), 0 0 0 1px rgba(15,118,110,0.06)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 12px 28px rgba(15,118,110,0.18), 0 0 0 1.5px var(--teal-500)';
                el.style.borderColor = 'var(--teal-500)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 2px 8px rgba(15,118,110,0.08), 0 0 0 1px rgba(15,118,110,0.06)';
                el.style.borderColor = 'rgba(15,118,110,0.4)';
              }}
            >
              {/* Teal top section */}
              <div
                className="px-5 pt-5 pb-4"
                style={{ background: 'linear-gradient(135deg, var(--teal-700) 0%, var(--teal-600) 100%)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <Wand2 size={18} className="text-white" />
                </div>
              </div>

              {/* White body */}
              <div className="flex flex-col gap-1.5 px-5 pt-4 pb-3 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-navy-900">Tone Improver</h3>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                    style={{ background: 'var(--teal-100)', color: 'var(--teal-700)' }}
                  >
                    Tool
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Polish informal text into proper diplomatic language instantly
                </p>
              </div>

              {/* Teal CTA footer */}
              <div
                className="flex items-center gap-1.5 px-5 py-3 border-t"
                style={{ borderColor: 'rgba(15,118,110,0.15)' }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--teal-600)' }}>
                  Open Tool
                </span>
                <ArrowRight size={12} style={{ color: 'var(--teal-500)' }} className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
