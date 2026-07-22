/**
 * ========================================================================================
 * @file route.ts - GitHub push webhook that revalidates caches on publish
 * ========================================================================================
 * @description
 * - verifies the GitHub HMAC signature, then busts CACHE_STATS_TAG on every push to main
 *   (repo-wide stats can change on any commit) and CACHE_CONTENT_TAG only when content/
 *   was touched
 * - every apis/ and modules/stats/ unstable_cache call shares CACHE_STATS_TAG, so one
 *   revalidateTag call busts both layers at once — no risk of busting the outer cache
 *   while an inner one stays stale
 * - only revalidates for pushes to main; any other ref is skipped entirely
 * @see /src/cms/source.ts/, /src/modules/stats/, /src/apis/, /src/utilities/githubRepo.ts/, /open-next.config.ts/
 */

import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CACHE_STATS_TAG, CACHE_CONTENT_TAG } from "@/utilities/githubRepo";

// Shared secret configured on both the GitHub webhook and Webflow Cloud (as a secret).
async function getWebhookSecret(): Promise<string | undefined> {
  try {
    const value = (getCloudflareContext().env as Record<string, unknown>).GITHUB_WEBHOOK_SECRET;
    if (typeof value === "string" && value) return value;
  } catch {
    // No request context — fall through to process.env.
  }
  return process.env.GITHUB_WEBHOOK_SECRET || undefined;
}

// Verifies GitHub's `X-Hub-Signature-256` (HMAC-SHA256 of the raw body) via Web Crypto.
async function isValidSignature(secret: string, body: string, header: string | null): Promise<boolean> {
  if (!header) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected =
    "sha256=" + [...new Uint8Array(signed)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return timingSafeEqual(expected, header);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export async function POST(request: Request): Promise<Response> {
  const secret = await getWebhookSecret();
  if (!secret) return NextResponse.json({ error: "webhook not configured" }, { status: 503 });

  // Raw body is required for signature verification — read it before parsing.
  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  if (!(await isValidSignature(secret, body, signature))) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  if (request.headers.get("x-github-event") === "ping") {
    return NextResponse.json({ ok: true, pong: true });
  }

  // Stats reflect the whole repo (file count, language bytes, size), so any push to main
  // can change them — those tags always bust. Content only refetches when a commit actually
  // touched content/ (best-effort; on parse failure, bust everything rather than risk stale data).
  let touchedContent = true;
  try {
    const payload = JSON.parse(body) as {
      ref?: string;
      commits?: { added?: string[]; modified?: string[]; removed?: string[] }[];
    };
    if (payload.ref && payload.ref !== "refs/heads/main") {
      return NextResponse.json({ ok: true, skipped: "non-main ref" });
    }
    const touched = (payload.commits ?? []).flatMap((c) => [
      ...(c.added ?? []),
      ...(c.modified ?? []),
      ...(c.removed ?? []),
    ]);
    touchedContent = touched.length === 0 || touched.some((f) => f.startsWith("content/"));
  } catch {
    // Unparseable payload — fall through and revalidate everything to be safe.
  }

  revalidateTag(CACHE_STATS_TAG);
  if (touchedContent) revalidateTag(CACHE_CONTENT_TAG);

  return NextResponse.json({
    ok: true,
    revalidated: touchedContent ? [CACHE_STATS_TAG, CACHE_CONTENT_TAG] : [CACHE_STATS_TAG],
  });
}
