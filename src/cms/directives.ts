import { MIRRORS } from "@/cms/content.generated";

/**
 * Directives are `@name value` tokens at the top of a content file. They may sit
 * on a bare line or inside a comment — double slashes, hash, block, or HTML
 * comments are all recognised.
 *
 *   @title / @description  → page metadata (value runs to end of line)
 *   @external / @icon      → mark a file as an outbound link (single-token value)
 *   @mirror                → swap the body for another file, resolved at build
 *
 * All parsers share one comment-prefix pattern, so it only lives in one place.
 */

// Optional leading comment marker (//, /*, <!--, or #), plus surrounding space.
const COMMENT_PREFIX = String.raw`\s*(?:\/\/|(?:\/\*)|(?:<!--)|#)?\s*`;

// A directive value may end with a comment closer; strip it and trim.
function stripValue(raw: string): string {
  return raw.replace(/\*\/$/, "").replace(/-->$/, "").trim();
}

// Finds `@name` in the head. `singleToken` captures up to the next whitespace
// (@external / @icon / @mirror); otherwise it captures the rest of the line
// (@title / @description).
function matchDirective(content: string, name: string, singleToken: boolean): string | undefined {
  const value = singleToken ? String.raw`(\S+)` : String.raw`([^\n]+)`;
  const re = new RegExp(`^${COMMENT_PREFIX}@${name}\\s+${value}`, "m");
  const match = content.match(re);
  return match ? stripValue(match[1]) : undefined;
}

/** Parses @title / @description metadata directives. */
export function parseMetadata(content: string): { title?: string; description?: string } {
  return {
    title: matchDirective(content, "title", false),
    description: matchDirective(content, "description", false),
  };
}

/** Parses an @external directive, with an optional @icon override. */
export function processExternal(content: string): { externalUrl?: string; iconName?: string } {
  const externalUrl = matchDirective(content, "external", true);
  if (externalUrl === undefined) return {};
  return { externalUrl, iconName: matchDirective(content, "icon", true) };
}

// @mirror must lead the file and sit inside a real comment, so it keeps a
// stricter pattern: required prefix, anchored to the start, no /m flag.
const MIRROR_RE = /^(?:\/\/|(?:\/\*)|(?:<!--)|#)\s*@mirror\s+(\S+)/;

/**
 * If the content begins with a @mirror directive, returns the mirrored file's
 * contents (resolved at build into the bundle). Otherwise returns it unchanged.
 */
export function processMirror(content: string): string {
  const match = content.match(MIRROR_RE);
  if (!match) return content;
  return MIRRORS[stripValue(match[1])] ?? content;
}
