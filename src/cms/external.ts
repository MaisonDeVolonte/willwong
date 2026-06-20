/**
 * Parses file content for an @external directive.
 * Supports plain lines, double slashes, hash comments, block comments, and HTML comments.
 * Returns the parsed URL if found.
 */
export function processExternal(content: string): { externalUrl?: string } {
  const match = content.match(/^\s*(?:\/\/|(?:\/\*)|(?:<!--)|#)?\s*@external\s+(\S+)/m);
  if (match) {
    const externalUrl = match[1].replace(/\*\/$/, "").replace(/-->$/, "").trim();
    return { externalUrl };
  }
  return {};
}
