import { getSession, unauthorized } from '@/lib/session';

export async function GET(request: Request) {
  const session = await getSession(request);
  if (!session) return unauthorized();
  return Response.json({ user: session }, { headers: { 'Cache-Control': 'no-store' } });
}
