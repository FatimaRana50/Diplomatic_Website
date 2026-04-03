'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Input from '@/components/atoms/Input';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof schema>;

const benefits = [
  { label: 'Instant document generation', sub: 'Produce diplomatic docs in seconds' },
  { label: 'Confidential Mode', sub: 'Sensitive data stays on your device' },
  { label: 'AI-powered translation', sub: 'Multilingual output on demand' },
  { label: 'Full document history', sub: 'Access and re-edit all past documents' },
];

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Registration failed');
      document.cookie = `session=${json.token}; path=/; max-age=604800`;
      setAuth(json.user, json.token);
      toast.success('Account created. Welcome to Diplomatic.');
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[45%_55%]">

      {/* ── Left: Brand Panel ─────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'var(--navy-900)' }}
      >
        {/* Decorative background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, rgba(232,184,58,0.07) 0%, transparent 60%),
                              radial-gradient(circle at 10% 80%, rgba(232,184,58,0.05) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--gold-400), transparent)' }}
        />

        {/* Logo */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
              style={{ background: 'rgba(232,184,58,0.12)', border: '1px solid rgba(232,184,58,0.25)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
                  fill="var(--gold-400)" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-400)' }}>
              Diplomatic
            </span>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative flex flex-col gap-8">
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#FFFFFF',
              }}
            >
              Join the platform<br />
              <span style={{ color: 'var(--gold-400)' }}>built for diplomats.</span>
            </h1>
            <p style={{ color: 'var(--navy-200)', fontSize: '0.9rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Create your workspace and start generating<br />professional diplomatic documents today.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {benefits.map((b) => (
              <li key={b.label} className="flex items-start gap-3">
                <div
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(232,184,58,0.12)', border: '1px solid rgba(232,184,58,0.3)' }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="var(--gold-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 500 }}>{b.label}</p>
                  <p style={{ color: 'var(--navy-400)', fontSize: '0.8rem' }}>{b.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative">
          <p style={{ color: 'var(--navy-400)', fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} Diplomatic &mdash; by Markhor Systems
          </p>
        </div>
      </div>

      {/* ── Right: Signup Form ────────────────────────────── */}
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
        style={{ background: 'var(--surface)' }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            Diplomatic
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Diplomatic Document Platform
          </p>
        </div>

        <div
          className="w-full max-w-md"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            padding: '2.5rem',
          }}
        >
          {/* Heading */}
          <div className="mb-6">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              Create Account
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Set up your diplomatic workspace
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              {...register('name')}
              label="Full Name"
              placeholder="Your Name"
              error={errors.name?.message}
            />
            <Input
              {...register('email')}
              label="Email Address"
              type="email"
              placeholder="you@embassy.gov"
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              error={errors.password?.message}
            />
            <Input
              {...register('confirmPassword')}
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: isLoading ? 'var(--gold-500)' : 'var(--gold-400)',
                color: 'var(--navy-900)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
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
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <div
            className="mt-6 pt-5 text-center"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                style={{ color: 'var(--gold-600)', fontWeight: 500, textDecoration: 'none' }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
