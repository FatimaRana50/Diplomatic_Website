import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import ConfidentialModeBar from '@/components/molecules/ConfidentialModeBar';

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString('utf8')
    );
    return typeof payload.exp === 'number' && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session || !isTokenValid(session)) redirect('/login');

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ConfidentialModeBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
