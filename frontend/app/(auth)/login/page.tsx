'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { MOCK_USER, MOCK_TOKEN } from '@/lib/mockData';
import Input from '@/components/atoms/Input';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Passphrase is required'),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof schema>;

const features = [
  { label: '8 document generators', sub: 'Note Verbale, Speech, Briefings & more' },
  { label: 'Confidential Mode', sub: 'Sensitive data never leaves your device' },
  { label: 'AI-powered translation', sub: 'Instant multilingual output' },
  { label: 'Document history', sub: 'Access and re-edit all past documents' },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('from') || '/';
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: LoginForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    document.cookie = 'session=mock; path=/; max-age=86400';
    setAuth(MOCK_USER, MOCK_TOKEN);
    toast.success('Welcome back, Ambassador.');
    router.push(returnTo);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        {...register('email')}
        label="Email Address"
        type="email"
        placeholder="you@embassy.gov"
        error={errors.email?.message}
      />
      <div>
        <Input
          {...register('password')}
          label="Passphrase"
          type="password"
          placeholder="••••••••••••"
          error={errors.password?.message}
        />
        <div className="flex justify-end mt-1.5">
          <button
            type="button"
            style={{ fontSize: '0.8rem', color: 'var(--gold-600)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Forgot passphrase?
          </button>
        </div>
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          {...register('remember')}
          type="checkbox"
          style={{ width: '16px', height: '16px', accentColor: 'var(--gold-500)', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Keep me signed in</span>
      </label>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          padding: '0.75rem 1.5rem',
          background: 'var(--gold-400)',
          color: 'var(--navy-900)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.8 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {isLoading ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Accessing...
          </>
        ) : 'Access Platform'}
      </motion.button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-[45%_55%]">

      {/* ── Left: Brand Panel ─────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'var(--navy-900)' }}
      >
        {/* Animated background orbs */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 400, height: 400, borderRadius: '50%', top: '-100px', right: '-100px',
            background: 'radial-gradient(circle, rgba(232,184,58,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 300, height: 300, borderRadius: '50%', bottom: '80px', left: '-80px',
            background: 'radial-gradient(circle, rgba(232,184,58,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Vertical separator line */}
        <div className="absolute top-0 right-0 w-px h-full"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,184,58,0.15), transparent)' }} />

        {/* Logo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
              style={{ background: 'rgba(232,184,58,0.12)', border: '1px solid rgba(232,184,58,0.25)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="var(--gold-400)" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-400)' }}>
              Diplomatic
            </span>
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative flex flex-col gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
              fontWeight: 700, lineHeight: 1.2, color: '#FFFFFF' }}>
              Draft with the<br />
              <span style={{ color: 'var(--gold-400)' }}>precision of protocol.</span>
            </h1>
            <p style={{ color: 'var(--navy-200)', fontSize: '0.9rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              AI-powered diplomatic document generation<br />trusted by embassies and foreign ministries.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {features.map((f, i) => (
              <motion.li
                key={f.label}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(232,184,58,0.12)', border: '1px solid rgba(232,184,58,0.3)' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="var(--gold-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 500 }}>{f.label}</p>
                  <p style={{ color: 'var(--navy-400)', fontSize: '0.8rem' }}>{f.sub}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p style={{ color: 'var(--navy-400)', fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} Diplomatic &mdash; by Markhor Systems
          </p>
        </motion.div>
      </div>

      {/* ── Right: Login Card ─────────────────────────────── */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
        style={{ background: 'var(--surface)' }}>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            Diplomatic
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Diplomatic Document Platform</p>
        </div>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            padding: '2.5rem',
          }}
        >
          <div className="mb-6">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              Access Platform
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Sign in to your diplomatic workspace
            </p>
          </div>

          <div className="mb-5 px-4 py-3 rounded-[var(--radius-md)] text-sm"
            style={{ background: 'var(--gold-100)', border: '1px solid var(--gold-400)', color: 'var(--gold-700)' }}>
            <strong>Demo mode:</strong> any email &amp; password works
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Need access?{' '}
              <Link href="/signup" style={{ color: 'var(--gold-600)', fontWeight: 500, textDecoration: 'none' }}>
                Create an account
              </Link>
              {' '}&mdash; or contact your administrator
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
