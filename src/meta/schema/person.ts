/**
 * ========================================================================================
 * @file person.ts - schema.org structured data template for the root identity
 * ========================================================================================
 * @description
 * - serves as the master source of truth for the author's identity and social links
 * - all other schemas (website, article, profile) reference this entity's id
 * @see /src/meta/schema/Schema.tsx/
 */

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
