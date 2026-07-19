/**
 * ==============================================================
 * @file githubToken.ts - shared GitHub API auth token resolution
 * ==============================================================
 * @description
 * - optional read-only token raises unauthenticated GitHub API rate limits (varies by endpoint)
 * - injected as a Webflow Cloud runtime secret
 * - absent at build (static prerender), where unauthenticated is fine
 * @see /src/cms/source.ts/, /src/modules/stats/
 */

export async function getGithubToken(): Promise<string | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const value = (getCloudflareContext().env as Record<string, unknown>).GITHUB_TOKEN;
    if (typeof value === "string" && value) return value;
  } catch {
    // No request context (e.g. build-time prerender) — fall through to process.env.
  }
  return process.env.GITHUB_TOKEN || undefined;
}
