import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// No R2 incremental cache: the public pages are static and nothing uses ISR.
// Same criterion as the rest of Thexify's projects (see the vault).
export default defineCloudflareConfig({});
