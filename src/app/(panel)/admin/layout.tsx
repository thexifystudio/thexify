import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/session';
import { AdminShell } from './AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The middleware only saw a cookie; the JWT signature is verified here.
  const session = await getServerSession();
  if (!session) redirect('/login/?next=/admin/');

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
