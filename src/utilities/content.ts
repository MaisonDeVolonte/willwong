import { readdir, readFile } from "fs/promises";
import path from "path";

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
        return { name: e.name, language: LANGUAGES[ext] ?? ext, content };
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
      pages.push({
        slug,
        files: [{ name: file.name, language: LANGUAGES[ext] ?? ext, content }],
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
