/**
 * Parses file content for an @external directive.
 * Supports plain lines, double slashes, hash comments, block comments, and HTML comments.
 * Returns the parsed URL if found.
 */
export function processExternal(content: string): { externalUrl?: string; iconName?: string } {
  const urlMatch = content.match(/^\s*(?:\/\/|(?:\/\*)|(?:<!--)|#)?\s*@external\s+(\S+)/m);
  if (urlMatch) {
    const externalUrl = urlMatch[1].replace(/\*\/$/, "").replace(/-->$/, "").trim();
    const iconMatch = content.match(/^\s*(?:\/\/|(?:\/\*)|(?:<!--)|#)?\s*@icon\s+(\S+)/m);
    const iconName = iconMatch ? iconMatch[1].replace(/\*\/$/, "").replace(/-->$/, "").trim() : undefined;
    return { externalUrl, iconName };
  }
  return {};
}
