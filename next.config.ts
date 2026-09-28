import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Same public URLs as the Astro build: /contacto/, /en/work/<slug>/, ...
  trailingSlash: true,
  // Same WebP quality the Astro image pipeline used.
  images: { qualities: [80] },
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare bindings (D1, R2, secrets from .dev.vars).
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
void initOpenNextCloudflareForDev();
