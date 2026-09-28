// Resource bindings are generated from wrangler.jsonc in worker-configuration.d.ts.
// Secrets are not present in Wrangler configuration, so declare them separately.
declare global {
  interface CloudflareEnv {
    /** Secret: .dev.vars locally, `wrangler secret put AUTH_SECRET` in production. */
    AUTH_SECRET: string;
  }
}

export {};
