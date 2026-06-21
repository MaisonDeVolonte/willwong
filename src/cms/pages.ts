import { cache } from "react";
import { CONTENT, ICONS } from "@/cms/content.generated";
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

export const readIcon = cache(async (name: string): Promise<string> => {
  return ICONS[name] ?? ICONS["fallback"] ?? "";
});

// Directives (@title, @description, @external, @icon) live in the file header by
// convention, so we only read the head to build the tree.
const HEAD_BYTES = 8192;

function readHead(rel: string): string {
  return (CONTENT[rel] ?? "").slice(0, HEAD_BYTES);
}

type DirEntry = { name: string; isFile: boolean; isDirectory: boolean };

// Reconstructs an immediate directory listing from the flat CONTENT key set,
// replacing fs.readdir({ withFileTypes: true }). `rel` is "" for the root.
function listDir(rel: string): DirEntry[] {
  const prefix = rel ? `${rel}/` : "";
  const seen = new Map<string, boolean>(); // name -> isFile
  for (const key of Object.keys(CONTENT)) {
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

async function buildContentFile(dirRel: string, fileName: string): Promise<ContentFile> {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const rel = dirRel ? `${dirRel}/${fileName}` : fileName;
  const head = readHead(rel);
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

async function readContentFiles(dirRel: string): Promise<ContentFile[]> {
  const entries = listDir(dirRel);
  const files = await Promise.all(
    entries
      .filter((e) => e.isFile && !IGNORE.has(e.name))
      .map((e) => buildContentFile(dirRel, e.name))
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

async function walk(dirRel: string, slugPath: string[], pages: ContentPage[]) {
  const entries = listDir(dirRel);
  const fileEntries = entries.filter((e) => e.isFile && !IGNORE.has(e.name));
  const dirEntries = entries.filter((e) => e.isDirectory);

  if (slugPath.length === 0) {
    for (const file of fileEntries) {
      const contentFile = await buildContentFile(dirRel, file.name);
      pages.push({
        slug: [file.name],
        files: [contentFile],
        ...(contentFile.externalUrl ? { externalUrl: contentFile.externalUrl } : {}),
      });
    }
  } else if (fileEntries.length > 0) {
    const files = await readContentFiles(dirRel);
    const firstExternalUrl = files[0]?.externalUrl;
    pages.push({
      slug: slugPath,
      files,
      ...(firstExternalUrl ? { externalUrl: firstExternalUrl } : {}),
    });
  }

  for (const d of dirEntries) {
    await walk(dirRel ? `${dirRel}/${d.name}` : d.name, [...slugPath, d.name], pages);
  }
}

// Memoized per request (React cache): generateMetadata, the page, and the layout's
// Nav panel all share a single walk within one render.
export const getAllPages = cache(async (): Promise<ContentPage[]> => {
  const pages: ContentPage[] = [];
  await walk("", [], pages);
  return pages;
});

export async function populatePageContent(page: ContentPage): Promise<void> {
  for (const file of page.files) {
    if (file.filePath && !file.content) {
      file.content = processMirror(CONTENT[file.filePath] ?? "");
    }
  }
}

// Reads a single content file (with @mirror resolved) by its path relative to
// content/ — used by the home page for content/README.md.
export function getContent(rel: string): string {
  return processMirror(CONTENT[rel] ?? "");
}
