import { readFile } from "fs/promises";
import path from "path";

/**
 * Checks if the file contains a @mirror directive, and if so,
 * resolves and returns the contents of the mirrored file. Otherwise, returns the original content.
 */
export async function processMirror(filePath: string, content: string): Promise<string> {
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
