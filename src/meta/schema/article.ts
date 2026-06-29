/**
 * ========================================================================================
 * @file article.ts - schema.org structured data builder for individual articles
 * ========================================================================================
 * @description
 * - formats page metadata and body content into a valid ld+json article schema
 * - references the root person entity to establish authorship
 * @see /src/meta/schema/Schema.tsx/, /src/meta/schema/person.ts/
 */

import { PERSON_ID } from "./person";

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
