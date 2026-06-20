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
