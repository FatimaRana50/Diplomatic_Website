'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export default function FormSection({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
}: FormSectionProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div
      className="overflow-hidden rounded-[var(--radius-lg)]"
      style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Navy header */}
      <div
        className={`flex items-center justify-between px-5 py-3.5 ${collapsible ? 'cursor-pointer' : ''}`}
        style={{
          background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
          borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.06)',
        }}
        onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-[3px] h-4 rounded-full shrink-0"
            style={{ background: 'linear-gradient(to bottom, var(--gold-400), var(--gold-600))' }}
            aria-hidden="true"
          />
          <h3
            className="text-sm font-semibold text-white"
            style={{ letterSpacing: '0.02em' }}
          >
            {title}
          </h3>
        </div>
        {collapsible && (
          <ChevronDown
            size={16}
            className={`text-white/50 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
          />
        )}
      </div>

      {!collapsed && (
        <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
