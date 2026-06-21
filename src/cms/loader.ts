import { open, readdir, readFile } from "fs/promises";
import path from "path";
import { cache } from "react";
import { processMirror } from "./mirror";
import { processExternal } from "./external";
import { parseMetadata } from "./metadata";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ICONS_DIR = path.join(process.cwd(), "src/assets/icons");

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
  css: "var(--icon-css)",
  md:  "var(--icon-md)",
  ts:  "var(--icon-ts)",
  tsx: "var(--icon-tsx)",
  html: "var(--icon-html)",
  js: "var(--icon-js)",
  jsx: "var(--icon-jsx)",
  json: "var(--icon-json)",
  svg: "var(--icon-svg)",
  diff: "var(--icon-diff)",
  link: "var(--icon-link)",
  url: "var(--icon-link)",
  site: "var(--icon-site)",
};

const iconCache = new Map<string, string>();
let iconsLoaded = false;

async function preloadIcons() {
  if (iconsLoaded) return;
  try {
    const entries = await readdir(ICONS_DIR, { withFileTypes: true });
    await Promise.all(
      entries
        .filter((e) => e.isFile() && e.name.endsWith(".svg"))
        .map(async (e) => {
          const name = e.name.replace(/\.svg$/i, "");
          const content = await readFile(path.join(ICONS_DIR, e.name), "utf-8");
          iconCache.set(name, content);
        })
    );
    iconsLoaded = true;
  } catch (err) {
    console.error("Failed to preload icons:", err);
  }
}

export const readIcon = cache(async (name: string): Promise<string> => {
  await preloadIcons();
  return iconCache.get(name) ?? iconCache.get("fallback") ?? "";
});

// Directives (@title, @description, @external, @icon) live in the file header by
// convention, so we only read the head — never the full body — to build the tree.
// This keeps the walk cost flat as individual files grow.
const HEAD_BYTES = 8192;

async function readFileHead(filePath: string): Promise<string> {
  const fd = await open(filePath, "r");
  try {
    const buf = Buffer.alloc(HEAD_BYTES);
    const { bytesRead } = await fd.read(buf, 0, HEAD_BYTES, 0);
    return buf.toString("utf-8", 0, bytesRead);
  } finally {
    await fd.close();
  }
}

async function buildContentFile(dir: string, fileName: string): Promise<ContentFile> {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const filePath = path.join(dir, fileName);
  const head = await readFileHead(filePath);
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
    filePath,
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

async function readContentFiles(dir: string): Promise<ContentFile[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((e) => e.isFile() && !IGNORE.has(e.name))
      .map((e) => buildContentFile(dir, e.name))
  );
  // README.md first, then alphabetically
  files.sort((a, b) => {
    const aIsReadme = a.name.toUpperCase() === "README.MD";
    const bIsReadme = b.name.toUpperCase() === "README.MD";
    if (aIsReadme && !bIsReadme) return -1;
    if (!aIsReadme && bIsReadme) return 1;
    return a.name.localeCompare(b.name);
  });
  return files;
}

async function walk(dir: string, slugPath: string[], pages: ContentPage[]) {
  const entries = await readdir(dir, { withFileTypes: true });
  const fileEntries = entries.filter((e) => e.isFile() && !IGNORE.has(e.name));
  const dirEntries = entries.filter((e) => e.isDirectory());

  if (slugPath.length === 0) {
    for (const file of fileEntries) {
      const contentFile = await buildContentFile(dir, file.name);
      pages.push({
        slug: [file.name],
        files: [contentFile],
        ...(contentFile.externalUrl ? { externalUrl: contentFile.externalUrl } : {}),
      });
    }
  } else if (fileEntries.length > 0) {
    const files = await readContentFiles(dir);
    const firstExternalUrl = files[0]?.externalUrl;
    pages.push({
      slug: slugPath,
      files,
      ...(firstExternalUrl ? { externalUrl: firstExternalUrl } : {}),
    });
  }

  for (const d of dirEntries) {
    await walk(path.join(dir, d.name), [...slugPath, d.name], pages);
  }
}

// Memoized per request (React cache): generateMetadata, the page, and the layout's
// Nav panel all share a single walk within one render. Not persisted across requests,
// so content edits in dev are reflected immediately on the next navigation.
export const getAllPages = cache(async (): Promise<ContentPage[]> => {
  const pages: ContentPage[] = [];
  await walk(CONTENT_DIR, [], pages);
  return pages;
});

export async function populatePageContent(page: ContentPage): Promise<void> {
  await Promise.all(
    page.files.map(async (file) => {
      if (file.filePath && !file.content) {
        const rawContent = await readFile(file.filePath, "utf-8");
        file.content = await processMirror(file.filePath, rawContent);
      }
    })
  );
}
