import { readdir, readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

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

// Files that are never treated as content pages
const IGNORE = new Set(["README.md", "home.md"]);

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

async function readContentFiles(dir: string): Promise<ContentFile[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((e) => e.isFile() && !IGNORE.has(e.name))
      .map(async (e) => {
        const ext = e.name.split(".").pop()?.toLowerCase() ?? "";
        const content = await readFile(path.join(dir, e.name), "utf-8");
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
    // Root level: each file becomes its own single-page route
    for (const file of fileEntries) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      const slug = [file.name.replace(/\.[^.]+$/, "")];
      const content = await readFile(path.join(dir, file.name), "utf-8");
      const icon = await readIcon(ext);
      pages.push({
        slug,
        files: [{ name: file.name, language: LANGUAGES[ext] ?? ext, content, icon }],
      });
    }
  } else if (fileEntries.length > 0) {
    // Leaf folder: all files become tabs on one page
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

export async function getPage(slug: string[]): Promise<ContentPage | null> {
  const pages = await getAllPages();
  const key = slug.join("/");
  return pages.find((p) => p.slug.join("/") === key) ?? null;
}

// === Nav Tree ===

const ICONS_DIR = path.join(process.cwd(), "src/icons");

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

export type NavLeaf = {
  kind: "leaf";
  label: string;
  href: string;
  files: ContentFile[];
};

export type NavFolder = {
  kind: "folder";
  label: string;
  children: NavNode[];
};

export type NavNode = NavLeaf | NavFolder;

export function buildNavTree(pages: ContentPage[], depth = 0): NavNode[] {
  const leaves: NavLeaf[] = [];
  const folders = new Map<string, ContentPage[]>();

  for (const page of pages) {
    if (page.slug.length - 1 === depth) {
      leaves.push({
        kind: "leaf",
        label: page.slug[depth],
        href: `/${page.slug.join("/")}`,
        files: page.files,
      });
    } else {
      const key = page.slug[depth];
      if (!folders.has(key)) folders.set(key, []);
      folders.get(key)!.push(page);
    }
  }

  const folderNodes: NavFolder[] = Array.from(folders.entries()).map(([label, children]) => ({
    kind: "folder",
    label,
    children: buildNavTree(children, depth + 1),
  }));

  return [...folderNodes, ...leaves];
}
