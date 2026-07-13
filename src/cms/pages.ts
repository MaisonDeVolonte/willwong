/**
 * ========================================================================================
 * @file pages.ts - primary interface for fetching and parsing in-memory content
 * ========================================================================================
 * @description
 * - abstracts the raw typescript bundle and queries it as a simulated filesystem
 * - handles language matching, icon color mapping, and structural caching
 * @see /src/cms/content.generated.ts/, /scripts/content.mjs/
 */

import { cache } from "react";
import { ICONS } from "@/cms/content.generated";
import { getContentMap, type ContentMap } from "@/cms/source";
import { processMirror, processExternal, parseMetadata } from "@/cms/directives";

const LANGUAGES: Record<string, string> = {
  bash: "bash",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  css: "css",
  diff: "diff",
  go: "go",
  graphql: "graphql",
  html: "html",
  java: "java",
  js: "javascript",
  json: "json",
  jsx: "jsx",
  kt: "kotlin",
  md: "markdown",
  mjs: "javascript",
  php: "php",
  py: "python",
  r: "r",
  rb: "ruby",
  rs: "rust",
  sh: "bash",
  sql: "sql",
  svelte: "markup",
  swift: "swift",
  toml: "toml",
  ts: "typescript",
  tsx: "tsx",
  vue: "markup",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
};

const IGNORE = new Set(["home.md"]);

export type ContentFile = {
  name: string;
  language: string;
  content: string;
  icon: string;
  iconName: string;
  title: string;
  description: string;
  externalUrl?: string;
  filePath?: string;
};

export type ContentPage = {
  slug: string[];
  files: ContentFile[];
  externalUrl?: string;
};

export const ICON_COLORS: Record<string, string> = {
  css:    "var(--icon-css)",
  diff:   "var(--icon-diff)",
  eslint: "var(--icon-eslint)",
  html:   "var(--icon-html)",
  js:     "var(--icon-js)",
  json:   "var(--icon-json)",
  jsx:    "var(--icon-jsx)",
  link:   "var(--icon-link)",
  md:     "var(--icon-md)",
  mjs:    "var(--icon-mjs)",
  sh:     "var(--icon-sh)",
  site:   "var(--icon-site)",
  svg:    "var(--icon-svg)",
  ts:     "var(--icon-ts)",
  tsx:    "var(--icon-tsx)",
  url:    "var(--icon-link)",
  yml:    "var(--icon-yml)",
};

export const readIcon = cache(async (name: string): Promise<string> => {
  return ICONS[name] ?? ICONS["fallback"] ?? "";
});

// Directives (@title, @description, @external, @icon) live in the file header by
// convention, so we only read the head to build the tree.
const HEAD_BYTES = 8192;

function readHead(map: ContentMap, rel: string): string {
  return (map[rel] ?? "").slice(0, HEAD_BYTES);
}

type DirEntry = { name: string; isFile: boolean; isDirectory: boolean };

// Reconstructs an immediate directory listing from the flat content key set,
// replacing fs.readdir({ withFileTypes: true }). `rel` is "" for the root.
function listDir(map: ContentMap, rel: string): DirEntry[] {
  const prefix = rel ? `${rel}/` : "";
  const seen = new Map<string, boolean>(); // name -> isFile
  for (const key of Object.keys(map)) {
    if (prefix && !key.startsWith(prefix)) continue;
    const rest = key.slice(prefix.length);
    const slash = rest.indexOf("/");
    if (slash === -1) {
      seen.set(rest, true);
    } else {
      const name = rest.slice(0, slash);
      if (!seen.has(name)) seen.set(name, false);
    }
  }
  return [...seen].map(([name, isFile]) => ({ name, isFile, isDirectory: !isFile }));
}

async function buildContentFile(map: ContentMap, dirRel: string, fileName: string): Promise<ContentFile> {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const rel = dirRel ? `${dirRel}/${fileName}` : fileName;
  const head = readHead(map, rel);
  const { externalUrl, iconName: externalIcon } = processExternal(head);
  const { title, description } = getFileMetadata(fileName, head);

  const iconName = externalIcon ?? (externalUrl ? "link" : ext);
  const icon = await readIcon(iconName);
  return {
    name: fileName,
    language: externalUrl ? "markdown" : (LANGUAGES[ext] ?? ext),
    content: "",
    icon,
    iconName,
    title,
    description,
    filePath: rel,
    ...(externalUrl ? { externalUrl } : {}),
  };
}

function getFileMetadata(fileName: string, content: string) {
  const { title: customTitle, description: customDescription } = parseMetadata(content);

  // Default clean title from filename: e.g. "my-note.md" -> "My Note"
  const rawTitle = fileName.replace(/\.[^.]+$/, "");
  const formattedTitle = rawTitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: customTitle ?? formattedTitle,
    description: customDescription ?? `View ${customTitle ?? formattedTitle} on William Wong's portfolio.`,
  };
}

async function readContentFiles(map: ContentMap, dirRel: string): Promise<ContentFile[]> {
  const entries = listDir(map, dirRel);
  const files = await Promise.all(
    entries
      .filter((e) => e.isFile && !IGNORE.has(e.name))
      .map((e) => buildContentFile(map, dirRel, e.name))
  );
  // sort alphabetically
  files.sort((a, b) => a.name.localeCompare(b.name));
  return files;
}

async function walk(map: ContentMap, dirRel: string, slugPath: string[], pages: ContentPage[]) {
  const entries = listDir(map, dirRel);
  const fileEntries = entries.filter((e) => e.isFile && !IGNORE.has(e.name));
  const dirEntries = entries.filter((e) => e.isDirectory);

  if (slugPath.length === 0) {
    for (const file of fileEntries) {
      const contentFile = await buildContentFile(map, dirRel, file.name);
      pages.push({
        slug: [file.name],
        files: [contentFile],
        ...(contentFile.externalUrl ? { externalUrl: contentFile.externalUrl } : {}),
      });
    }
  } else if (fileEntries.length > 0) {
    const files = await readContentFiles(map, dirRel);
    const firstExternalUrl = files[0]?.externalUrl;
    pages.push({
      slug: slugPath,
      files,
      ...(firstExternalUrl ? { externalUrl: firstExternalUrl } : {}),
    });
  }

  for (const d of dirEntries) {
    await walk(map, dirRel ? `${dirRel}/${d.name}` : d.name, [...slugPath, d.name], pages);
  }
}

// Memoized per request (React cache): generateMetadata, the page, and the layout's
// Nav panel all share a single walk within one render.
export const getAllPages = cache(async (): Promise<ContentPage[]> => {
  const map = await getContentMap();
  const pages: ContentPage[] = [];
  await walk(map, "", [], pages);
  return pages;
});

export async function populatePageContent(page: ContentPage): Promise<void> {
  const map = await getContentMap();
  for (const file of page.files) {
    if (file.filePath && !file.content) {
      file.content = processMirror(map[file.filePath] ?? "");
    }
  }
}

// Reads a single content file (with @mirror resolved) by its path relative to
// content/ — used by the home page for content/README.md.
export async function getContent(rel: string): Promise<string> {
  const map = await getContentMap();
  return processMirror(map[rel] ?? "");
}
