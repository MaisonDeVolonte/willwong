/**
 * ========================================================================================
 * @file open-next.config.ts - open-next deployment config for cloudflare environments
 * ========================================================================================
 * @description
 * - configures the incremental cache to use cloudflare r2 buckets
 * - enables fast edge serving of pre-rendered pages with fallback to runtime rendering
 * @see /next.config.ts/, /cloudflare-env.d.ts/
 */

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import kvTagCache from "@opennextjs/cloudflare/overrides/tag-cache/kv-next-tag-cache";

// - incrementalCache: bulk-upload cache to NEXT_INC_CACHE_R2_BUCKET for fast edge serving;
//   cache-misses re-render at runtime (content fetched from main — see src/cms/source.ts)
// - tagCache: KV-backed, lets the /api/revalidate webhook bust the `content` tag on publish
//   (KV avoids D1/Durable Objects; eventually consistent, up to ~60s — matches our timer)
// - queue "direct": revalidate synchronously in-request, so no Durable Object queue is needed
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  tagCache: kvTagCache,
  queue: "direct",
});
