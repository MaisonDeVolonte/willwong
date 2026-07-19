/**
 * ==========================================================
 * @file githubMeta.ts - cached repo metadata (age, size)
 * ==========================================================
 * @description
 * - one call covers both Age (`created_at`) and Size (`size`, KB) for the Project section
 * @see /src/modules/stats/aggregate.ts/
 */

import { unstable_cache } from "next/cache";
import { getGithubToken } from "@/utilities/githubToken";
import { REPO_OWNER, REPO_NAME } from "@/utilities/githubRepo";

export const GITHUB_META_TAG = "github-stats-meta";
const REVALIDATE_SECONDS = 3600;

export type RepoMeta = { createdAt: string; sizeKb: number };

export const getGithubMeta = unstable_cache(
  async (): Promise<RepoMeta> => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": `${REPO_NAME}-stats`,
    };
    const token = await getGithubToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub repo fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { created_at: string; size: number };
    return { createdAt: data.created_at, sizeKb: data.size };
  },
  ["github-meta"],
  { tags: [GITHUB_META_TAG], revalidate: REVALIDATE_SECONDS },
);
