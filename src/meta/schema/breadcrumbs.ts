/**
 * ========================================================================================
 * @file breadcrumbs.ts - schema.org structured data builder for breadcrumb lists
 * ========================================================================================
 * @description
 * - dynamically builds breadcrumb trails based on internal next.js path segments
 * - serializes data into ld+json for seo optimization
 * @see /src/meta/schema/Schema.tsx/
 */

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function buildBreadcrumbs(path: string | string[]) {
  const segments = Array.isArray(path)
    ? path
    : path.split("/").filter(Boolean);

  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://willwong.me",
    },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    // Capitalize and format name (e.g. "my-post" -> "My Post")
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `https://willwong.me${currentPath}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement,
  };
}
