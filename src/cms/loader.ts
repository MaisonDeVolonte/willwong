import { readdir, readFile } from "fs/promises";
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
  title: string;
  description: string;
  externalUrl?: string;
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
};

export const readIcon = cache(async (name: string): Promise<string> => {
  try {
    return await readFile(path.join(ICONS_DIR, `${name}.svg`), "utf-8");
  } catch {
    return readFile(path.join(ICONS_DIR, "fallback.svg"), "utf-8");
  }
});

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
      .map(async (e) => {
        const ext = e.name.split(".").pop()?.toLowerCase() ?? "";
        const filePath = path.join(dir, e.name);
        const rawContent = await readFile(filePath, "utf-8");
        const content = await processMirror(filePath, rawContent);
        const { externalUrl } = processExternal(content);
        const { title, description } = getFileMetadata(e.name, content);
        
        const iconName = externalUrl ? "link" : ext;
        const icon = await readIcon(iconName);
        return {
          name: e.name,
          language: externalUrl ? "markdown" : (LANGUAGES[ext] ?? ext),
          content,
          icon,
          title,
          description,
          ...(externalUrl ? { externalUrl } : {}),
        };
      })
  );
  // .md first (explainer), then alphabetically
  files.sort((a, b) => {
    if (a.name.endsWith(".md") && !b.name.endsWith(".md")) return -1;
    if (!a.name.endsWith(".md") && b.name.endsWith(".md")) return 1;
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
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      const slug = [file.name];
      const filePath = path.join(dir, file.name);
      const rawContent = await readFile(filePath, "utf-8");
      const content = await processMirror(filePath, rawContent);
      const { externalUrl } = processExternal(content);
      const { title, description } = getFileMetadata(file.name, content);
      
      const iconName = externalUrl ? "link" : ext;
      const icon = await readIcon(iconName);
      pages.push({
        slug,
        files: [
          {
            name: file.name,
            language: externalUrl ? "markdown" : (LANGUAGES[ext] ?? ext),
            content,
            icon,
            title,
            description,
            ...(externalUrl ? { externalUrl } : {}),
          },
        ],
        ...(externalUrl ? { externalUrl } : {}),
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

export async function getAllPages(): Promise<ContentPage[]> {
  const pages: ContentPage[] = [];
  await walk(CONTENT_DIR, [], pages);
  return pages;
}
