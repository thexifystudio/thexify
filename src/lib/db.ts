import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';

/**
 * Bindings only exist inside a Workers request context, so this is async and
 * not a module-level singleton.
 */
export async function getEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env;
}

export async function getDb() {
  return drizzle((await getEnv()).DB, { schema });
}
