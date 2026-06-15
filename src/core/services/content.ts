import { readdir, readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ICONS_DIR = path.join(process.cwd(), "src/assets/icons");

const LANGUAGES: Record<string, string> = {
  bash: "bash",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  css: "css",
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
};

export type ContentPage = {
  slug: string[];
  files: ContentFile[];
};

export const ICON_COLORS: Record<string, string> = {
  css: "var(--icon-css)",
  md:  "var(--icon-md)",
  ts:  "var(--icon-ts)",
  tsx: "var(--icon-tsx)",
};

export const readIcon = cache(async (name: string): Promise<string> => {
  try {
    return await readFile(path.join(ICONS_DIR, `${name}.svg`), "utf-8");
  } catch {
    return readFile(path.join(ICONS_DIR, "fallback.svg"), "utf-8");
  }
});

async function readFileWithMirror(filePath: string): Promise<string> {
  const content = await readFile(filePath, "utf-8");
  const match = content.match(/^(?:\/\/|(?:\/\*)|(?:<!--)|#)\s*@mirror\s+(\S+)/);
  if (match) {
    const target = match[1].replace(/\*\/$/, "").replace(/-->$/, "").trim();
    
    // Determine project root dynamically from the content file's path
    let projectRoot = process.cwd();
    const contentSegment = `${path.sep}content${path.sep}`;
    const contentIndex = filePath.indexOf(contentSegment);
    if (contentIndex !== -1) {
      projectRoot = filePath.substring(0, contentIndex);
    }

    const resolvedPath = path.resolve(projectRoot, target);
    return readFile(resolvedPath, "utf-8");
  }
  return content;
}

async function readContentFiles(dir: string): Promise<ContentFile[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((e) => e.isFile() && !IGNORE.has(e.name))
      .map(async (e) => {
        const ext = e.name.split(".").pop()?.toLowerCase() ?? "";
        const content = await readFileWithMirror(path.join(dir, e.name));
        const icon = await readIcon(ext);
        return { name: e.name, language: LANGUAGES[ext] ?? ext, content, icon };
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
      const content = await readFileWithMirror(path.join(dir, file.name));
      const icon = await readIcon(ext);
      pages.push({
        slug,
        files: [{ name: file.name, language: LANGUAGES[ext] ?? ext, content, icon }],
      });
    }
  } else if (fileEntries.length > 0) {
    pages.push({ slug: slugPath, files: await readContentFiles(dir) });
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
