import { readdir, readFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Bundles all of content/ (with @mirror targets and icons resolved) into a TS
// module the app imports. The Cloudflare worker has no filesystem, so the CMS
// reads from this bundle at runtime instead of fs.readFile/readdir.

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CONTENT_DIR = path.join(ROOT, "content");
const ICONS_DIR = path.join(ROOT, "src/assets/icons");

const MIRROR_RE = /^(?:\/\/|(?:\/\*)|(?:<!--)|#)\s*@mirror\s+(\S+)/;

async function walkFiles(dir, base = "") {
  const out = {};
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      Object.assign(out, await walkFiles(path.join(dir, e.name), rel));
    } else if (e.isFile()) {
      out[rel] = await readFile(path.join(dir, e.name), "utf-8");
    }
  }
  return out;
}

const CONTENT = await walkFiles(CONTENT_DIR);

// Resolve every @mirror target (paths are relative to the project root).
const MIRRORS = {};
for (const text of Object.values(CONTENT)) {
  const m = text.match(MIRROR_RE);
  if (!m) continue;
  const target = m[1].replace(/\*\/$/, "").replace(/-->$/, "").trim();
  if (target in MIRRORS) continue;
  try {
    MIRRORS[target] = await readFile(path.join(ROOT, target), "utf-8");
  } catch {
    MIRRORS[target] = `// @mirror target not found: ${target}`;
  }
}

const ICONS = {};
try {
  for (const e of await readdir(ICONS_DIR, { withFileTypes: true })) {
    if (e.isFile() && e.name.endsWith(".svg")) {
      ICONS[e.name.replace(/\.svg$/i, "")] = await readFile(path.join(ICONS_DIR, e.name), "utf-8");
    }
  }
} catch {}

const out =
  `// generated at build by scripts/content.mjs — do not edit, do not commit\n` +
  `export const CONTENT: Record<string, string> = ${JSON.stringify(CONTENT)};\n` +
  `export const MIRRORS: Record<string, string> = ${JSON.stringify(MIRRORS)};\n` +
  `export const ICONS: Record<string, string> = ${JSON.stringify(ICONS)};\n`;

writeFileSync(path.join(ROOT, "src/cms/content.generated.ts"), out);
console.log(
  `content.generated.ts -> ${Object.keys(CONTENT).length} files, ` +
    `${Object.keys(MIRRORS).length} mirrors, ${Object.keys(ICONS).length} icons`,
);
