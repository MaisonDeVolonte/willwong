/**
 * ===================================
 * @file icons.ts - shared icon lookup
 * ===================================
 * @description
 * - reads from the build-time bundle in `cms/content.generated.ts`
 * - icons themselves are content-agnostic
 * - used in nav, tabs, and stats
 * @see /src/cms/content.generated.ts/, /scripts/content.mjs/
 */

import { cache } from "react";
import { ICONS } from "@/cms/content.generated";

export const ICON_COLORS: Record<string, string> = {
  css:    "var(--icon-css)",
  diff:   "var(--icon-diff)",
  eslint: "var(--icon-eslint)",
  html:   "var(--icon-html)",
  js:     "var(--icon-js)",
  json:   "var(--icon-json)",
  jsx:    "var(--icon-jsx)",
  link:   "var(--icon-link)",
  md:     "var(--icon-md)",
  mjs:    "var(--icon-mjs)",
  sh:     "var(--icon-sh)",
  site:   "var(--icon-site)",
  svg:    "var(--icon-svg)",
  ts:     "var(--icon-ts)",
  tsx:    "var(--icon-tsx)",
  url:    "var(--icon-link)",
  yml:    "var(--icon-yml)",
};

export const readIcon = cache(async (name: string): Promise<string> => {
  return ICONS[name] ?? ICONS["fallback"] ?? "";
});
