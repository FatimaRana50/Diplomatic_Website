'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight, Shield, Wand2, Languages, Download, FileText,
  Mic, Mail, Calendar, MessageSquare, BookOpen, Send,
  ChevronDown, Lock, Zap, Clock, CheckCircle, Globe, Users, TrendingUp, Star,
} from 'lucide-react';

/* ─── Place these images in the same directory or public/images/ ─── */
import heroImage from './hero-diplomatic.jpg';
import documentsImage from './documents-flatlay.jpg';
import conferenceImage from './conference-room.jpg';

/* ─── Animation helpers ─────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────── */
const generators = [
  { icon: FileText,      title: 'Note Verbale',      desc: 'Formal inter-governmental correspondence' },
  { icon: BookOpen,      title: 'Meeting Brief',     desc: 'Pre-meeting context & talking points' },
  { icon: MessageSquare, title: 'Meeting Summary',   desc: 'Structured post-meeting outcomes' },
  { icon: Mic,           title: 'Diplomatic Speech',  desc: 'Full speeches with VIP salutations' },
  { icon: Mail,          title: 'Diplomatic Letter',  desc: 'Formal letters with protocol formatting' },
  { icon: Send,          title: 'Talking Points',     desc: 'Strategic discussion frameworks' },
  { icon: Calendar,      title: 'Invitation Letter',  desc: 'Formal event invitations with RSVP' },
  { icon: Wand2,         title: 'Tone Improver',      desc: 'Polish text into diplomatic language' },
];

const steps = [
  { n: '01', title: 'Select a document type', desc: 'Choose from 8 specialized diplomatic generators, each tailored to protocol standards.' },
  { n: '02', title: 'Fill the structured form', desc: 'Enter your details — parties involved, purpose, tone, and context. No writing required.' },
  { n: '03', title: 'Generate & export', desc: 'AI drafts your document in seconds. Edit inline, translate, download as .docx or .pdf.' },
];

const features = [
  { icon: Zap,       title: 'Seconds, not hours',    desc: 'Generate a complete Note Verbale or diplomatic speech in under 30 seconds.' },
  { icon: Shield,    title: 'Protocol-accurate',     desc: 'Every generator enforces proper diplomatic language, structure, and formatting.' },
  { icon: Languages, title: 'Multilingual output',   desc: 'Translate any generated document into any language with one click.' },
  { icon: Clock,     title: 'Full document history',  desc: 'Access, re-edit, and re-download every document you have ever generated.' },
  { icon: Download,  title: '.docx & .pdf export',   desc: 'Download production-ready files formatted for official use.' },
  { icon: Lock,      title: 'Confidential Mode',     desc: 'Sensitive data is replaced with editable placeholders — never sent to the server.' },
];

const stats = [
  { value: '50K+', label: 'Documents Generated', icon: FileText },
  { value: '180+', label: 'Countries Served', icon: Globe },
  { value: '1,200+', label: 'Diplomatic Missions', icon: Users },
  { value: '99.8%', label: 'Protocol Accuracy', icon: TrendingUp },
];

const testimonials = [
  {
    quote: 'Diplomatic has transformed how our mission handles correspondence. What used to take our team hours now takes minutes — with zero compromise on protocol.',
    name: 'Ambassador R. Okafor',
    title: 'Permanent Representative, UN Mission',
    stars: 5,
  },
  {
    quote: 'The Note Verbale generator alone saved us three drafting cycles on a sensitive bilateral issue. The confidential mode is indispensable for our work.',
    name: 'Deputy Minister H. Lindqvist',
    title: 'Ministry of Foreign Affairs',
    stars: 5,
  },
  {
    quote: 'Impeccable formatting, correct salutations, proper register. This is exactly what front-line diplomats need in the field.',
    name: 'Counsellor A. Petrov',
    title: 'Embassy Political Section',
    stars: 5,
  },
];

const faqs = [
  { q: 'What document types does the platform support?', a: 'The platform includes 8 generators: Note Verbale, Meeting Brief, Meeting Summary, Diplomatic Speech, Diplomatic Letter, Talking Points, Invitation Letter, and a standalone Tone Improver tool.' },
  { q: 'How does Confidential Mode work?', a: 'When enabled, sensitive fields such as recipient names, classified details, and sensitive topics are replaced with placeholder tags (e.g. [RECIPIENT NAME]) in the generated document. You fill those in manually after generation — the raw data never leaves your browser.' },
  { q: 'Can I edit the generated document?', a: 'Yes. Every generated document can be edited inline directly in the platform before downloading or sending.' },
  { q: 'What languages are supported for translation?', a: 'The translation feature is powered by GPT-4 and supports all major world languages, including Arabic, French, Spanish, Russian, Chinese, and more.' },
  { q: 'What export formats are available?', a: 'Documents can be exported as .docx (Microsoft Word) or .pdf. You can also send the document directly via email from within the platform.' },
];

/* ─── Inline SVG Visuals ──────────────────────────────────────────── */

/** Globe SVG — decorative world grid sphere */
function GlobeSVG() {
  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0d1b2a" />
        </radialGradient>
        <radialGradient id="globeShine" cx="30%" cy="25%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx="160" cy="160" r="148" />
        </clipPath>
      </defs>
      {/* Base sphere */}
      <circle cx="160" cy="160" r="148" fill="url(#globeGrad)" />
      {/* Grid lines clipped to sphere */}
      <g clipPath="url(#globeClip)" stroke="rgba(212,160,23,0.18)" strokeWidth="0.8">
        {/* Latitude lines */}
        {[-100,-70,-40,-10,20,50,80,110,140].map((y,i)=>(
          <line key={`lat${i}`} x1="12" y1={160+y} x2="308" y2={160+y} />
        ))}
        {/* Longitude lines as ellipses */}
        {[20,45,70,95,120,145,170,195,220,245,270,295].map((rx,i)=>(
          <ellipse key={`lon${i}`} cx="160" cy="160" rx={rx} ry="148" />
        ))}
        {/* Equator bolder */}
        <line x1="12" y1="160" x2="308" y2="160" stroke="rgba(212,160,23,0.35)" strokeWidth="1.4"/>
      </g>
      {/* Continent blobs (simplified) */}
      <g clipPath="url(#globeClip)" fill="rgba(212,160,23,0.13)" stroke="rgba(212,160,23,0.3)" strokeWidth="0.6">
        {/* Europe/Africa */}
        <path d="M148 100 Q158 92 170 98 Q182 105 178 118 Q185 128 178 138 Q172 160 168 178 Q160 195 152 180 Q140 165 138 148 Q132 130 140 115 Z"/>
        {/* Americas */}
        <path d="M68 105 Q80 98 90 108 Q98 122 94 138 Q88 158 78 172 Q68 190 60 178 Q50 162 52 142 Q52 122 62 110 Z"/>
        {/* Asia */}
        <path d="M195 90 Q220 85 240 95 Q258 108 255 128 Q250 148 235 155 Q215 162 198 150 Q182 138 185 118 Q186 100 195 90 Z"/>
        {/* Oceania */}
        <path d="M222 188 Q235 182 245 190 Q252 200 246 212 Q238 222 226 218 Q215 212 216 200 Z"/>
      </g>
      {/* Shine overlay */}
      <circle cx="160" cy="160" r="148" fill="url(#globeShine)" />
      {/* Glowing dots on "capitals" */}
      {[[160,120],[100,140],[220,130],[80,100],[230,175]].map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="4" fill="rgba(212,160,23,0.9)" />
          <circle cx={cx} cy={cy} r="8" fill="rgba(212,160,23,0.2)" />
        </g>
      ))}
      {/* Outer glow ring */}
      <circle cx="160" cy="160" r="148" stroke="rgba(212,160,23,0.25)" strokeWidth="2" fill="none"/>
      <circle cx="160" cy="160" r="155" stroke="rgba(212,160,23,0.08)" strokeWidth="6" fill="none"/>
    </svg>
  );
}

/** Document preview SVG card */
function DocumentPreviewSVG() {
  return (
    <svg viewBox="0 0 280 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="docShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="rgba(13,27,42,0.5)" />
        </filter>
      </defs>
      {/* Paper background */}
      <rect x="10" y="10" width="260" height="320" rx="8" fill="#fefcf7" filter="url(#docShadow)" />
      <rect x="10" y="10" width="260" height="320" rx="8" fill="white" stroke="#e8e0d0" strokeWidth="1" />
      {/* Navy header bar */}
      <rect x="10" y="10" width="260" height="56" rx="8" fill="#0d1b2a"/>
      <rect x="10" y="46" width="260" height="20" fill="#0d1b2a"/>
      {/* Gold emblem */}
      <circle cx="140" cy="33" r="14" fill="rgba(212,160,23,0.15)" stroke="rgba(212,160,23,0.5)" strokeWidth="1"/>
      <polygon points="140,22 142.5,29.5 150.5,29.5 144.3,34.5 146.8,42 140,37 133.2,42 135.7,34.5 129.5,29.5 137.5,29.5" fill="rgba(212,160,23,0.8)"/>
      {/* Header label */}
      <rect x="90" y="52" width="100" height="5" rx="2.5" fill="rgba(255,255,255,0.15)"/>
      {/* Gold divider line */}
      <line x1="30" y1="76" x2="250" y2="76" stroke="rgba(212,160,23,0.4)" strokeWidth="1"/>
      {/* "NOTE VERBALE" title */}
      <rect x="80" y="84" width="120" height="8" rx="4" fill="#0d1b2a" opacity="0.8"/>
      {/* Body text lines */}
      {[104,116,128,140,152,164,176].map((y, i) => (
        <rect key={y} x={i === 3 ? 36 : 30} y={y} width={i === 6 ? 100 : i === 4 ? 180 : 220} height="5" rx="2.5" fill="#c8bfa8" opacity="0.7"/>
      ))}
      {/* Separator */}
      <line x1="30" y1="196" x2="250" y2="196" stroke="#e8e0d0" strokeWidth="1" strokeDasharray="4 4"/>
      {/* Placeholder tags */}
      <rect x="30" y="208" width="110" height="20" rx="4" fill="rgba(212,160,23,0.12)" stroke="rgba(212,160,23,0.35)" strokeWidth="1"/>
      <rect x="34" y="214" width="70" height="7" rx="3.5" fill="rgba(212,160,23,0.5)"/>
      <rect x="30" y="236" width="90" height="20" rx="4" fill="rgba(212,160,23,0.12)" stroke="rgba(212,160,23,0.35)" strokeWidth="1"/>
      <rect x="34" y="242" width="55" height="7" rx="3.5" fill="rgba(212,160,23,0.5)"/>
      {/* Signature line */}
      <line x1="150" y1="290" x2="250" y2="290" stroke="#c8bfa8" strokeWidth="1"/>
      <rect x="170" y="294" width="60" height="4" rx="2" fill="#c8bfa8" opacity="0.5"/>
      {/* Wax seal */}
      <circle cx="55" cy="290" r="18" fill="rgba(160,30,30,0.85)"/>
      <circle cx="55" cy="290" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <polygon points="55,280 56.5,284.8 61.5,284.8 57.5,287.8 59,292.5 55,289.5 51,292.5 52.5,287.8 48.5,284.8 53.5,284.8" fill="rgba(255,255,255,0.4)"/>
    </svg>
  );
}

/** Timeline/Workflow illustration */
function WorkflowSVG() {
  return (
    <svg viewBox="0 0 600 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212,160,23,0)" />
          <stop offset="20%" stopColor="rgba(212,160,23,0.6)" />
          <stop offset="80%" stopColor="rgba(212,160,23,0.6)" />
          <stop offset="100%" stopColor="rgba(212,160,23,0)" />
        </linearGradient>
      </defs>
      {/* Connecting line */}
      <line x1="80" y1="60" x2="520" y2="60" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="6 4"/>
      {/* Step nodes */}
      {[
        { x: 80, label: 'Select Type', sub: 'Choose generator' },
        { x: 220, label: 'Input Details', sub: 'Fill the form' },
        { x: 360, label: 'AI Drafts', sub: 'In seconds' },
        { x: 500, label: 'Export', sub: '.docx / .pdf' },
      ].map(({ x, label, sub }, i) => (
        <g key={x}>
          {/* Outer ring */}
          <circle cx={x} cy="60" r="28" fill="rgba(13,27,42,0.9)" stroke="rgba(212,160,23,0.4)" strokeWidth="1.5"/>
          {/* Inner circle */}
          <circle cx={x} cy="60" r="18" fill="rgba(212,160,23,0.12)"/>
          {/* Number */}
          <text x={x} y="65" textAnchor="middle" fill="rgba(212,160,23,0.9)" fontSize="13" fontWeight="700" fontFamily="monospace">
            0{i + 1}
          </text>
          {/* Label below */}
          <text x={x} y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600">
            {label}
          </text>
          <text x={x} y="118" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
            {sub}
          </text>
          {/* Arrow between nodes */}
          {i < 3 && (
            <polygon points={`${x+36},57 ${x+44},60 ${x+36},63`} fill="rgba(212,160,23,0.5)"/>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Stats bar chart SVG */
function StatsBadgeSVG({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-6 rounded-2xl text-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(212,160,23,0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div aria-hidden="true" className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)' }} />
      <span
        className="text-3xl sm:text-4xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)', letterSpacing: '-0.02em' }}
      >
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-[var(--radius-lg)] overflow-hidden" style={{ border: '1px solid var(--border)', background: 'white' }}>
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none gap-4" style={{ color: 'var(--navy-900)' }}>
        <span className="text-sm font-semibold leading-snug">{q}</span>
        <ChevronDown size={16} className="shrink-0 transition-transform duration-200 group-open:rotate-180" style={{ color: 'var(--gold-600)' }} />
      </summary>
      <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)' }}>
        <div className="pt-4">{a}</div>
      </div>
    </details>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface)' }}>

      {/* ══════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-40 w-full"
        style={{
          background: 'rgba(13,27,42,0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 2px 16px rgba(13,27,42,0.4)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--gold-500) 30%, var(--gold-400) 50%, var(--gold-500) 70%, transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', boxShadow: '0 2px 8px rgba(212,160,23,0.4)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5L9.854 5.854H14.5L10.823 8.646L12.177 13L8 10.208L3.823 13L5.177 8.646L1.5 5.854H6.146L8 1.5Z" fill="var(--navy-900)" fillOpacity="0.9"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold-400)', letterSpacing: '-0.01em' }}>
              Diplomatic
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {['Features', 'How It Works', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="px-3.5 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors"
              style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-[var(--radius-md)] transition-all"
              style={{
                background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))',
                color: 'var(--navy-900)',
                boxShadow: '0 2px 10px rgba(212,160,23,0.4)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(212,160,23,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(212,160,23,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Get Started <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO — full bleed background image
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'rgba(13,27,42,0.78)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,27,42,0.5) 0%, rgba(13,27,42,0.65) 50%, rgba(13,27,42,0.95) 100%)' }} />
          {/* Decorative grid overlay */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pt-32 sm:pb-40 gap-16">
          {/* Left: text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mb-8">
              <span
                className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2"
                style={{ color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
              >
                Diplomatic Document Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] lg:leading-[1.15] font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
            >
              Official correspondence,{' '}
              <br className="hidden sm:block" />
              drafted with{' '}
              <span style={{ color: 'var(--gold-400)' }}>precision.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 w-12 h-px"
              style={{ background: 'var(--gold-500)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Generate Note Verbales, diplomatic speeches, meeting briefs, and formal letters — structured to protocol standards for embassies, ministries, and international organisations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/signup"
                className="flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] transition-all"
                style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', color: 'var(--navy-900)', boxShadow: '0 4px 20px rgba(212,160,23,0.4)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(212,160,23,0.55)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,160,23,0.4)'; }}
              >
                Start Generating <ArrowRight size={14} />
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-[var(--radius-md)] transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
              >
                Explore Tools
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {[
                { icon: Lock, label: 'Confidential Mode' },
                { icon: Shield, label: 'Protocol-Accurate' },
                { icon: Languages, label: 'Multilingual Output' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <Icon size={13} />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Globe SVG visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block shrink-0"
            style={{ width: 320, height: 320 }}
          >
            <GlobeSVG />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-4"
        style={{ background: 'linear-gradient(160deg, var(--navy-900), var(--navy-800))' }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <StatsBadgeSVG key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DOCUMENT CATEGORIES
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" id="features" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold-600)' }}>
              Document Generators
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>
              Everything a diplomat needs
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              8 specialized generators, each designed around the specific format and language standards of that document type.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generators.map((gen, i) => {
              const Icon = gen.icon;
              const isTool = gen.title === 'Tone Improver';
              return (
                <FadeUp key={gen.title} delay={i * 0.05}>
                  <div
                    className="flex flex-col h-full rounded-xl overflow-hidden"
                    style={{
                      background: 'white',
                      border: isTool ? '1px solid rgba(15,118,110,0.35)' : '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(13,27,42,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    <div
                      className="h-1"
                      style={{ background: isTool ? 'linear-gradient(90deg, #0f766e, #14b8a6)' : 'linear-gradient(90deg, var(--gold-600), var(--gold-400))' }}
                    />
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      <div
                        className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                        style={{ background: isTool ? 'rgba(15,118,110,0.08)' : 'rgba(13,27,42,0.06)' }}
                      >
                        <Icon size={18} style={{ color: isTool ? '#0f766e' : 'var(--navy-800)' }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold" style={{ color: 'var(--navy-900)' }}>{gen.title}</h3>
                          {isTool && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(15,118,110,0.1)', color: '#0f766e' }}>
                              Tool
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{gen.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW VISUAL SECTION — new conference image
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden" id="how-it-works"
        style={{ background: 'linear-gradient(160deg, var(--navy-900), var(--navy-800))' }}
      >
        <div className="absolute inset-0">
          <Image src={conferenceImage} alt="" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,27,42,0.85), rgba(13,27,42,0.97))' }} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold-500)' }}>
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Three steps to a finished document
            </h2>
          </FadeUp>

          {/* Inline workflow SVG */}
          <FadeUp delay={0.1} className="mb-16">
            <WorkflowSVG />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.12}>
                <div
                  className="relative flex flex-col gap-5 p-7 rounded-xl h-full"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{
                        background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))',
                        color: 'var(--navy-900)',
                        boxShadow: '0 4px 14px rgba(212,160,23,0.35)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {step.n}
                    </div>
                    <h3 className="text-base font-semibold text-white leading-snug">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          KEY FEATURES
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold-600)' }}>
              Platform Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>
              Built for real diplomatic work
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeUp key={feat.title} delay={i * 0.07}>
                  <div
                    className="flex flex-col gap-4 p-6 rounded-xl h-full"
                    style={{ background: 'white', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
                  >
                    <div
                      className="w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, var(--navy-800), var(--navy-700))',
                        boxShadow: '0 4px 12px rgba(13,27,42,0.2)',
                      }}
                    >
                      <Icon size={18} style={{ color: 'var(--gold-400)' }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--navy-900)' }}>{feat.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONFIDENTIAL MODE — documents image + SVG doc preview
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl p-10 sm:p-14"
            style={{ border: '1px solid rgba(232,184,58,0.2)', background: 'rgba(232,184,58,0.04)' }}
          >
            <div aria-hidden="true" className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 60%)' }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(232,184,58,0.12)', border: '1px solid rgba(232,184,58,0.3)' }}
                  >
                    <Lock size={20} style={{ color: 'var(--gold-400)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--gold-500)' }}>Privacy-First</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Confidential Mode
                    </h2>
                  </div>
                </div>
                <p className="text-base leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Diplomatic information is sensitive. With Confidential Mode enabled, fields like recipient names, classified details, and sensitive topics are replaced with editable placeholder tags in the generated document.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Raw sensitive data never reaches our servers',
                    'Placeholders like [RECIPIENT NAME] are inserted instead',
                    'You fill in the real details after generation, locally',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold-400)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SVG Document Preview */}
              <div className="hidden lg:block" style={{ width: 240 }}>
                <DocumentPreviewSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS — new section with documents image bg
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold-600)' }}>
              Trusted by Professionals
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>
              What diplomats are saying
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 p-7 rounded-2xl h-full"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 24px rgba(13,27,42,0.07)',
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={13} fill="var(--gold-500)" style={{ color: 'var(--gold-500)' }} />
                    ))}
                  </div>
                  {/* Quote mark */}
                  <div style={{ fontSize: '3rem', lineHeight: 1, color: 'var(--gold-300)', fontFamily: 'Georgia, serif', marginTop: -8 }}>"</div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)', marginTop: -16 }}>
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--navy-800), var(--navy-700))', color: 'var(--gold-400)' }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: 'var(--navy-900)' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.title}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DOCUMENTS FEATURE SHOWCASE — image + text split
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f5f0, var(--surface))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 420, border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(13,27,42,0.15)' }}>
                <Image
                  src={documentsImage}
                  alt="Diplomatic documents with official seals"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.7) 0%, transparent 50%)' }} />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                  {['[RECIPIENT NAME]', '[CLASSIFIED SUBJECT]', '[MISSION CODE]'].map((tag) => (
                    <div
                      key={tag}
                      className="px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-sm"
                      style={{
                        background: 'rgba(232,184,58,0.15)',
                        border: '1px solid rgba(232,184,58,0.3)',
                        color: 'var(--gold-400)',
                        fontFamily: 'var(--font-mono)',
                        width: 'fit-content',
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Text side */}
            <FadeUp delay={0.15}>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold-600)' }}>
                    Protocol-Ready Output
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>
                    Documents that meet the highest diplomatic standards
                  </h2>
                  <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Every generator is trained on real diplomatic language conventions. The output doesn't just look official — it follows the exact structural and linguistic rules expected in formal inter-governmental communication.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { title: 'Correct salutations', desc: 'Titles and forms of address are automatically calibrated to rank.' },
                    { title: 'Third-person register', desc: 'Note Verbales and formal letters default to proper diplomatic register.' },
                    { title: 'Structured body sections', desc: 'Opening, substance, courtesies, and closing all follow protocol.' },
                  ].map((point) => (
                    <div key={point.title} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))' }}>
                        <CheckCircle size={12} style={{ color: 'var(--navy-900)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>{point.title}</p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-[var(--radius-md)] transition-all w-fit"
                  style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', color: 'var(--navy-900)', boxShadow: '0 4px 20px rgba(212,160,23,0.35)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  See It In Action <ArrowRight size={14} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-4" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold-600)' }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>
              Common questions
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--navy-900), var(--navy-800))' }}
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 60%)' }} />
        {/* Decorative globe lines in bg */}
        <div aria-hidden="true" className="absolute right-8 top-8 opacity-10 hidden lg:block" style={{ width: 200, height: 200 }}>
          <GlobeSVG />
        </div>

        <FadeUp className="relative max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2"
            style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5L9.854 5.854H14.5L10.823 8.646L12.177 13L8 10.208L3.823 13L5.177 8.646L1.5 5.854H6.146L8 1.5Z" fill="rgba(212,160,23,0.9)"/>
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to draft with precision?
          </h2>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Join diplomatic professionals who generate formal documents in seconds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signup"
              className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[var(--radius-md)] transition-all"
              style={{
                background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))',
                color: 'var(--navy-900)',
                boxShadow: '0 4px 20px rgba(212,160,23,0.4)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(212,160,23,0.55)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,160,23,0.4)'; }}
            >
              Get Started <ArrowRight size={15} />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-[var(--radius-md)] transition-all"
              style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              Sign In
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="relative" style={{ background: 'var(--navy-900)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--gold-600) 30%, var(--gold-400) 50%, var(--gold-600) 70%, transparent)', opacity: 0.4 }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-[5px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))' }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5L9.854 5.854H14.5L10.823 8.646L12.177 13L8 10.208L3.823 13L5.177 8.646L1.5 5.854H6.146L8 1.5Z" fill="var(--navy-900)" fillOpacity="0.9"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--gold-400)' }}>
                Diplomatic
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>by Markhor Systems</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >Sign In</Link>
              <Link href="/signup" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >Get Started</Link>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}