import DashboardTable from '@/components/organisms/DashboardTable';

export const metadata = {
  title: 'Dashboard — DiploDocs',
};

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h1
          className="text-3xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          My Documents
        </h1>
        <span className="gold-divider" aria-hidden="true" />
        <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
          All your generated diplomatic documents
        </p>
      </div>
      <DashboardTable />
    </div>
  );
}
