/**
 * Parses file content for @title and @description metadata directives.
 * Supports plain lines, double slashes, hash comments, block comments, and HTML comments.
 * Returns the parsed values if found.
 */
export function parseMetadata(content: string): { title?: string; description?: string } {
  const titleMatch = content.match(/^\s*(?:\/\/|(?:\/\*)|(?:<!--)|#)?\s*@title\s+([^\n]+)/m);
  const descMatch = content.match(/^\s*(?:\/\/|(?:\/\*)|(?:<!--)|#)?\s*@description\s+([^\n]+)/m);

  return {
    title: titleMatch ? titleMatch[1].replace(/\*\/$/, "").replace(/-->$/, "").trim() : undefined,
    description: descMatch ? descMatch[1].replace(/\*\/$/, "").replace(/-->$/, "").trim() : undefined,
  };
}
