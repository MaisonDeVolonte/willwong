/**
 * ========================================================================================
 * @file site.ts - static metadata and branding configuration
 * ========================================================================================
 * @description
 * - provides centralized string constants for seo, titles, and basic structured data
 * - ensures consistency across metadata rendering
 * @see /src/app/layout.tsx/
 */

export const siteConfig = {
  name: "William Wong",
  description: "Portfolio of William Wong",
  url: "https://willwong.me",
  ogImage: "https://willwong.me/og.png",
  links: {
    github: "https://github.com/MaisonDeVolonte",
    linkedin: "https://www.linkedin.com/in/william-wong-tech/",
  },
};

export type SiteConfig = typeof siteConfig;
