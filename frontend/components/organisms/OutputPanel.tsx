'use client';

import { useState, Fragment } from 'react';
import { Copy, Edit3, Languages, Download, Mail, FileText, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useGeneratorStore } from '@/stores/generatorStore';
import { useExportMutation } from '@/hooks/useExport';
import { useSendEmailMutation } from '@/hooks/useDocuments';
import TranslationPanel from './TranslationPanel';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';

interface EmailModalProps {
  body: string;
  onClose: () => void;
}

function EmailModal({ body, onClose }: EmailModalProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState(body);
  const { mutateAsync, isPending } = useSendEmailMutation();

  const handleSend = async () => {
    if (!to) { toast.error('Please enter a recipient'); return; }
    try {
      await mutateAsync({ to, subject, body: emailBody });
      toast.success('Email sent');
      onClose();
    } catch {
      toast.error('Failed to send email');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[var(--radius-xl)] shadow-lg w-full max-w-lg mx-4 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-text-primary">Send via Email</h2>
        <input
          type="email"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="h-10 px-3 border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-10 px-3 border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
        />
        <textarea
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          rows={8}
          className="px-3 py-2 border border-border rounded-[var(--radius-md)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend} isLoading={isPending}>Send</Button>
        </div>
      </div>
    </div>
  );
}

/** Parse output string — wrap [PLACEHOLDER] tags in editable gold chips */
function renderWithChips(text: string) {
  const parts = text.split(/(\[[A-Z][A-Z\s]*\])/g);
  return parts.map((part, i) => {
    if (/^\[[A-Z][A-Z\s]*\]$/.test(part)) {
      return (
        <span
          key={i}
          contentEditable
          suppressContentEditableWarning
          className="placeholder-chip"
        >
          {part}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

interface OutputPanelProps {
  readOnly?: boolean;
  initialContent?: string;
  onSave?: (content: string) => void;
}

export default function OutputPanel({ readOnly = false, initialContent, onSave }: OutputPanelProps) {
  const { generatedOutput, isGenerating, editedOutput, setEditedOutput } =
    useGeneratorStore();

  const content = initialContent ?? (editedOutput ?? generatedOutput);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const { mutateAsync: exportDocx, isPending: exportingDocx } = useExportMutation('docx');
  const { mutateAsync: exportPdf, isPending: exportingPdf } = useExportMutation('pdf');

  const copy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const startEdit = () => {
    setEditValue(content);
    setIsEditing(true);
  };

  const saveEdit = () => {
    setEditedOutput(editValue);
    setIsEditing(false);
    onSave?.(editValue);
  };

  const cancelEdit = () => setIsEditing(false);

  // ── Empty state ──────────────────────────────────────────────────────
  if (!isGenerating && !content) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-5 h-80 text-center p-8 rounded-[var(--radius-xl)]"
        style={{ background: 'white', border: '1.5px dashed var(--border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, var(--navy-800), var(--navy-700))',
            boxShadow: '0 4px 12px rgba(13,27,42,0.2)',
          }}
        >
          <FileText size={26} style={{ color: 'var(--gold-400)' }} />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-base font-semibold text-navy-800">Ready to Generate</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Complete the form and click{' '}
            <span className="font-semibold" style={{ color: 'var(--gold-600)' }}>Generate Document</span>
          </p>
        </div>
      </div>
    );
  }

  // ── Streaming state ──────────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="bg-white border border-border rounded-[var(--radius-xl)] p-6 min-h-80 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Spinner size="sm" />
          Generating document...
        </div>
        <div className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed blink-cursor">
          {generatedOutput}
        </div>
      </div>
    );
  }

  // ── Complete state ───────────────────────────────────────────────────
  return (
    <>
      <div className="bg-white border border-border rounded-[var(--radius-xl)] flex flex-col shadow-sm">
        {/* Action bar */}
        {!readOnly && (
          <div
            className="flex items-center gap-2 px-4 py-3 border-b flex-wrap"
            style={{ borderColor: 'var(--border-light)', background: 'var(--surface)' }}
          >
            {[
              { label: 'Copy', icon: <Copy size={12} />, onClick: copy, ariaLabel: 'Copy document' },
              { label: 'Translate', icon: <Languages size={12} />, onClick: () => setShowTranslation(!showTranslation), ariaLabel: 'Translate document' },
              { label: 'Email', icon: <Mail size={12} />, onClick: () => setShowEmailModal(true), ariaLabel: 'Send via email' },
            ].map(({ label, icon, onClick, ariaLabel }) => (
              <button
                key={label}
                onClick={onClick}
                aria-label={ariaLabel}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-all duration-150"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--navy-800)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy-200)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                }}
              >
                {icon} {label}
              </button>
            ))}

            {!isEditing ? (
              <button
                onClick={startEdit}
                aria-label="Edit document"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-all duration-150"
                style={{ color: 'var(--text-secondary)', background: 'white', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--navy-800)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy-200)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <Edit3 size={12} /> Edit
              </button>
            ) : (
              <>
                <Button size="sm" variant="primary" onClick={saveEdit}>Save edits</Button>
                <Button size="sm" variant="ghost" onClick={cancelEdit}>Cancel</Button>
              </>
            )}

            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                aria-label="Download document"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-all duration-150"
                style={{ color: 'var(--text-secondary)', background: 'white', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--navy-800)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy-200)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <Download size={12} /> Download <ChevronDown size={10} />
              </button>
              {showDownloadMenu && (
                <div
                  className="absolute top-full mt-1.5 left-0 bg-white z-20 w-36 overflow-hidden"
                  style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}
                >
                  <button
                    onClick={async () => { await exportDocx(content); setShowDownloadMenu(false); }}
                    disabled={exportingDocx}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-surface transition-colors disabled:opacity-50"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {exportingDocx ? 'Exporting...' : '.docx'}
                  </button>
                  <button
                    onClick={async () => { await exportPdf(content); setShowDownloadMenu(false); }}
                    disabled={exportingPdf}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-surface transition-colors disabled:opacity-50"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {exportingPdf ? 'Exporting...' : '.pdf'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1">
          {isEditing ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full min-h-96 text-sm text-text-primary leading-relaxed whitespace-pre-wrap resize-none border-none focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
              {renderWithChips(content)}
            </div>
          )}
        </div>

        {showTranslation && !readOnly && (
          <div className="px-6 pb-6">
            <TranslationPanel sourceText={content} />
          </div>
        )}
      </div>

      {showEmailModal && (
        <EmailModal body={content} onClose={() => setShowEmailModal(false)} />
      )}
    </>
  );
}
