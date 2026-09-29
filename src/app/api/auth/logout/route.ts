import { clearedSessionCookie } from '@/lib/auth';
import { isTrustedMutation } from '@/lib/request';

export async function POST(request: Request) {
  if (!isTrustedMutation(request)) {
    return Response.json(
      { error: 'Origen no permitido' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  return Response.json(
    { ok: true },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': clearedSessionCookie(new URL(request.url).protocol === 'https:'),
      },
    },
  );
}
