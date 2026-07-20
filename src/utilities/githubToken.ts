/**
 * ==============================================================
 * @file githubToken.ts - shared GitHub API auth token resolution
 * ==============================================================
 * @description
 * - optional read-only token
 * - raises unauthenticated GitHub API rate limits
 * - injected as a Webflow Cloud runtime secret
 * - absent at build where unauthenticated is fine
 * - used in `src/cms/source.ts`, `src/modules/stats/apis/githubMeta.ts`, and `src/modules/stats/apis/githubTree.ts`
 * - consumes `GITHUB_TOKEN` set as a CI secret in `deploy.yml`
 * @see /src/cms/source.ts/, /src/modules/stats/
 */

export async function getGithubToken(): Promise<string | undefined> {
  // only succeeds inside a live deployed Cloudflare Worker request
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const token = (getCloudflareContext().env as Record<string, unknown>).GITHUB_TOKEN;
    if (typeof token === "string" && token.length > 0) return token;
  } catch {}
  // fall back to plain env variable
  return process.env.GITHUB_TOKEN || undefined;
}
