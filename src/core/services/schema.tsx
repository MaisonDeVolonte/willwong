export const PERSON_ID = "https://willwong.me/#person";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  "name": "William Wong",
  "url": "https://willwong.me",
  "sameAs": [
    "https://github.com/MaisonDeVolonte",
    "https://www.linkedin.com/in/william-wong-tech/"
  ]
};

export const WEBSITE_ID = "https://willwong.me/#website";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "url": "https://willwong.me",
  "name": "William Wong",
  "description": "Personal website of William Wong",
  "publisher": {
    "@id": PERSON_ID
  }
};

export const PROFILE_PAGE_ID = "https://willwong.me/about#profilepage";

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": PROFILE_PAGE_ID,
  "url": "https://willwong.me/about",
  "mainEntity": {
    "@id": PERSON_ID
  }
};

export interface Note {
  title: string;
  description?: string;
  slug: string | string[];
  content?: string;
}

export function buildArticle(note: Note) {
  const slugPath = Array.isArray(note.slug) ? note.slug.join("/") : note.slug;
  const url = `https://willwong.me/${slugPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    "isPartOf": {
      "@type": "WebPage",
      "@id": url,
      "url": url,
      "name": note.title,
    },
    "headline": note.title,
    "description": note.description || "A note by William Wong",
    "inLanguage": "en-US",
    "mainEntityOfPage": url,
    "author": {
      "@id": PERSON_ID,
    },
    "publisher": {
      "@id": PERSON_ID,
    },
    "articleBody": note.content || "",
  };
}

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

export function SchemaTags({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
