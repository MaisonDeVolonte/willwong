/**
 * ===========================================================
 * @file githubFetch.ts - shared GitHub fetch: retry + headers
 * ===========================================================
 * @description
 * - retries transient GitHub failures (429/5xx/network) with linear backoff
 * - builds the Accept/User-Agent/Authorization header set every GitHub caller needs
 * - agent labels which caller is asking, so GitHub's request logs can tell them apart
 * @see /src/apis/githubGitTrees.ts/, /src/apis/githubRepos.ts/, /src/cms/source.ts/
 */

import { getGithubToken } from "@/utilities/githubToken";
import { REPO_NAME } from "@/utilities/githubRepo";

const MAX_ATTEMPTS = 3;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type GithubAgent = "tree" | "repo" | "cms";

// retry GitHub failures (429 / 5xx / network) with linear backoff
export async function githubFetch(url: string, init: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok || (res.status < 500 && res.status !== 429)) return res;
      lastError = new Error(`${res.status} ${res.statusText}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < MAX_ATTEMPTS) await sleep(250 * attempt);
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

export async function githubHeaders(agent: GithubAgent): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    // github rejects requests with no user-agent
    "User-Agent": `${REPO_NAME}-${agent}`,
  };
  // github token is optional, unauthenticated works with lower rate limit
  const token = await getGithubToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
