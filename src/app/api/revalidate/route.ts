/**
 * ========================================================================================
 * @file route.ts - GitHub push webhook that revalidates cached content on publish
 * ========================================================================================
 * @description
 * - verifies the GitHub HMAC signature, then busts the `content` cache tag so a push to
 *   main goes live immediately instead of waiting for the revalidate timer
 * - only revalidates for pushes to main that actually touch content/
 * @see /src/cms/source.ts/, /open-next.config.ts/
 */

import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CONTENT_TAG } from "@/cms/source";

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

  // Skip pushes that aren't to main or don't touch content/ (best-effort; on parse
  // failure we revalidate rather than risk serving stale content).
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
    if (touched.length > 0 && !touched.some((f) => f.startsWith("content/"))) {
      return NextResponse.json({ ok: true, skipped: "no content changes" });
    }
  } catch {
    // Unparseable payload — fall through and revalidate to be safe.
  }

  revalidateTag(CONTENT_TAG);
  return NextResponse.json({ ok: true, revalidated: CONTENT_TAG });
}
