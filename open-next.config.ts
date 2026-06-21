import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Prerendered pages are served from R2 (binding NEXT_INC_CACHE_R2_BUCKET) so the
// worker never re-renders them at runtime — workerd has no filesystem for the
// content reads the render performs.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
