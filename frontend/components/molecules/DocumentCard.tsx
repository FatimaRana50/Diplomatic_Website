import Link from 'next/link';
import { FileText, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Badge from '@/components/atoms/Badge';
import type { DocumentListItem } from '@/types/document.types';

const typeLabels: Record<string, string> = {
  'note-verbale': 'Note Verbale',
  'meeting-brief': 'Meeting Brief',
  'meeting-summary': 'Meeting Summary',
  speech: 'Speech',
  'diplomatic-letter': 'Diplomatic Letter',
  'talking-points': 'Talking Points',
  invitation: 'Invitation',
};

interface DocumentCardProps {
  document: DocumentListItem;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const label = typeLabels[document.type] || document.type;

  return (
    <div
      className="group flex items-center gap-4 px-5 py-4 bg-white border-b transition-colors"
      style={{ borderColor: 'var(--border-light)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
    >
      <div
        className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--navy-800), var(--navy-700))',
        }}
      >
        <FileText size={14} style={{ color: 'var(--gold-400)' }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{document.subject}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {format(new Date(document.createdAt), 'dd MMM yyyy')}
        </p>
      </div>

      <Badge variant="default">{label}</Badge>

      <Link
        href={`/dashboard/${document.id}`}
        className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] transition-all"
        style={{ color: 'var(--text-muted)', background: 'var(--surface)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--navy-700)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
        aria-label="View document"
      >
        <Eye size={15} />
      </Link>
    </div>
  );
}
