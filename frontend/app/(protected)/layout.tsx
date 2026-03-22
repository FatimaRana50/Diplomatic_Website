import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import ConfidentialModeBar from '@/components/molecules/ConfidentialModeBar';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) redirect('/login');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ConfidentialModeBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
