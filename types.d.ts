/**
 * ========================================================================================
 * @file types.d.ts - global typescript ambient declarations
 * ========================================================================================
 * @description
 * - provides typescript types for raw asset imports (e.g. .md files)
 * - ensures importing markdown files as strings does not throw typescript errors
 * @see /next.config.ts/, /tsconfig.json/
 */

declare module "*.md" {
  const content: string;
  export default content;
}
