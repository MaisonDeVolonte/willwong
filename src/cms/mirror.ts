import { MIRRORS } from "@/cms/content.generated";

const MIRROR_RE = /^(?:\/\/|(?:\/\*)|(?:<!--)|#)\s*@mirror\s+(\S+)/;

/**
 * If the content begins with a @mirror directive, returns the mirrored file's
 * contents (resolved at build into the bundle). Otherwise returns the content
 * unchanged.
 */
export function processMirror(content: string): string {
  const match = content.match(MIRROR_RE);
  if (match) {
    const target = match[1].replace(/\*\/$/, "").replace(/-->$/, "").trim();
    return MIRRORS[target] ?? content;
  }
  return content;
}
