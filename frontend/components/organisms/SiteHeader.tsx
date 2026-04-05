'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Wand2, User } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  const handleLogout = () => {
    document.cookie = 'session=; path=/; max-age=0';
    clearAuth();
    router.push('/login');
    toast.success('Logged out successfully');
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const navLink = (href: string, label: string, icon?: React.ReactNode, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={clsx(
          'relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-150 rounded-[var(--radius-sm)]',
          isActive
            ? 'text-white bg-white/10'
            : 'text-white/65 hover:text-white hover:bg-white/8'
        )}
      >
        {icon}
        {label}
        {isActive && (
          <span
            className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--gold-400), var(--gold-500))' }}
            aria-hidden="true"
          />
        )}
      </Link>
    );
  };

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        background: 'linear-gradient(180deg, var(--navy-900) 0%, var(--navy-800) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 16px rgba(13,27,42,0.4)',
      }}
    >
      {/* Thin gold accent line at very top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--gold-500) 25%, var(--gold-400) 50%, var(--gold-500) 75%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--gold-500) 0%, var(--gold-400) 100%)',
              boxShadow: '0 2px 8px rgba(212,160,23,0.4)',
            }}
          >
            {/* Star/seal icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.5L9.854 5.854H14.5L10.823 8.646L12.177 13L8 10.208L3.823 13L5.177 8.646L1.5 5.854H6.146L8 1.5Z"
                fill="var(--navy-900)"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <span
            className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
          >
            Diplomatic
          </span>
        </Link>

        {/* Authenticated nav */}
        {isAuthenticated && (
          <nav className="hidden sm:flex items-center gap-0.5">
            {navLink('/', 'Home', undefined, true)}
            {navLink('/tools/tone', 'Tone Improver', <Wand2 size={14} />)}
            {navLink('/dashboard', 'Dashboard', <LayoutDashboard size={14} />)}
          </nav>
        )}

        {/* Auth area */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'var(--navy-700)',
                    border: '1.5px solid var(--gold-500)',
                    boxShadow: '0 0 0 2px rgba(212,160,23,0.15)',
                  }}
                >
                  {initials ? (
                    <span className="text-xs font-bold" style={{ color: 'var(--gold-400)', letterSpacing: '0.03em' }}>{initials}</span>
                  ) : (
                    <User size={14} className="text-white/60" />
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-white/70">{user?.name}</span>
              </div>

              <div className="w-px h-5 bg-white/10" aria-hidden="true" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 rounded-[var(--radius-sm)] transition-all"
                aria-label="Logout"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-[var(--radius-md)] transition-all"
              style={{
                background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))',
                color: 'var(--navy-900)',
                boxShadow: '0 2px 8px rgba(212,160,23,0.35)',
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
