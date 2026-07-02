/**
 * ========================================================================================
 * @file slugs.ts - router utility mapping url paths to cached file metadata
 * ========================================================================================
 * @description
 * - handles dynamic slug resolution without triggering heavy file reads
 * - formatting and sanitizing helper functions for consistent url generation
 * @see /src/app/[...slug]/page.tsx/, /src/cms/pages.ts/
 */

import { getAllPages } from "@/cms/pages";
import type { ContentPage } from "@/cms/pages";

export type ResolvedFile = {
  page: ContentPage;
  fileIndex: number;
};

export function slugify(name: string): string {
  const base = name.toLowerCase().endsWith(".md") ? name.slice(0, -3) : name;
  return base.replace(/^[@.]+/, "").replace(/[\s.]+/g, "-").toLowerCase();
}

// Resolves a slug to a page + file index using the cached, in-memory page list.
// No file bodies are read here — call populatePageContent on the resolved page
// only when the body is actually needed (e.g. to render it).
export async function getFile(slug: string[]): Promise<ResolvedFile | null> {
  const pages = await getAllPages();
  const targetUrl = slug.join("/");

  const direct = pages.find((p) => p.slug.map(slugify).join("/") === targetUrl);
  if (direct) {
    return { page: direct, fileIndex: 0 };
  }

  if (slug.length > 1) {
    const pageSlugs = slug.slice(0, -1);
    const filename = slug[slug.length - 1];
    const page = pages.find((p) => p.slug.map(slugify).join("/") === pageSlugs.join("/"));
    if (page) {
      const fileIndex = page.files.findIndex((f) => slugify(f.name) === filename);
      if (fileIndex !== -1) {
        return { page, fileIndex };
      }
    }
  }

  return null;
}

export async function getAllFileParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPages();
  return pages.flatMap((p) => {
    const urlSlugPath = p.slug.map(slugify);
    return p.files.length === 1
      ? [{ slug: urlSlugPath }]
      : p.files.map((f) => ({ slug: [...urlSlugPath, slugify(f.name)] }));
  });
}
