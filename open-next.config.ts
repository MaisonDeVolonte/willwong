import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Deploys bulk-upload cache to NEXT_INC_CACHE_R2_BUCKET for fast edge serving
// Cache-misses trigger runtime re-rendering using the in-memory content bundle
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
