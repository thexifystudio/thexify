import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Pages are prerendered, so per-request nonces are not possible: inline scripts
// stay allowed ('unsafe-inline'), but every external origin is blocked.
// The contact form falls back to mailto:, hence form-action allows it.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
  // English at the root, Spanish under /es/; every URL ends with a slash.
  trailingSlash: true,
  // Same WebP quality the Astro image pipeline used.
  images: { qualities: [80] },
  poweredByHeader: false,
  // Until October 2026 Spanish lived at the root and English under /en/.
  // Old links and indexed pages land on the same page at its new address.
  async redirects() {
    const moved: [string, string][] = [
      ['/en', '/'],
      ['/en/:path*', '/:path*/'],
      ['/contacto', '/es/contacto/'],
      ['/privacidad', '/es/privacidad/'],
      ['/webs', '/es/webs/'],
      ['/proyectos/:slug', '/es/proyectos/:slug/'],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/(admin|login|api)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare bindings (D1, R2, secrets from .dev.vars).
// Only in dev: it starts a local workerd, which builds do not need.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
if (isDev) void initOpenNextCloudflareForDev();
