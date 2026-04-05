export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-auto relative"
      style={{
        background: 'linear-gradient(180deg, var(--navy-800) 0%, var(--navy-900) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Thin gold accent at top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--gold-500) 25%, var(--gold-400) 50%, var(--gold-500) 75%, transparent 100%)', opacity: 0.5 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-[5px] flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))' }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5L9.854 5.854H14.5L10.823 8.646L12.177 13L8 10.208L3.823 13L5.177 8.646L1.5 5.854H6.146L8 1.5Z" fill="var(--navy-900)" fillOpacity="0.9"/>
            </svg>
          </div>
          <span
            className="text-base font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
          >
            Diplomatic
          </span>
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
          &copy; {year} Markhor Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
