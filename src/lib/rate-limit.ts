import { getEnv } from '@/lib/db';

type LimiterName = 'LOGIN_RATE_LIMITER' | 'CONTACT_RATE_LIMITER';

function requestKey(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
    'local-development'
  );
}

/**
 * Cloudflare's binding enforces limits globally at the edge. During plain
 * `next dev`, where the binding may not exist, requests remain usable locally.
 */
export async function isAllowed(request: Request, limiterName: LimiterName): Promise<boolean> {
  const env = await getEnv();
  const limiter = env[limiterName];
  if (!limiter) return process.env.NODE_ENV !== 'production';

  try {
    return (await limiter.limit({ key: requestKey(request) })).success;
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'rate_limit_failed',
        limiter: limiterName,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return process.env.NODE_ENV !== 'production';
  }
}
