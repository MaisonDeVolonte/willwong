/**
 * ========================================================================================
 * @file profile.ts - schema.org structured data template for the about page
 * ========================================================================================
 * @description
 * - defines the profile entity for the user's about page
 * - references the root person entity to establish identity
 * @see /src/meta/schema/Schema.tsx/, /src/meta/schema/person.ts/
 */

import { PERSON_ID } from "./person";

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
