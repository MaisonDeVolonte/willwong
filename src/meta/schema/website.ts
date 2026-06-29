/**
 * ========================================================================================
 * @file website.ts - schema.org structured data template for the root website
 * ========================================================================================
 * @description
 * - defines the global website entity for seo
 * - links publisher metadata to the root person entity
 * @see /src/meta/schema/Schema.tsx/, /src/meta/schema/person.ts/
 */

import { PERSON_ID } from "./person";

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
