/**
 * ========================================================================================
 * @file page.tsx - root route handler for the application homepage
 * ========================================================================================
 * @description
 * - renders the primary canvas container with hardcoded homepage metadata
 * - pulls raw content for the index view directly from the bundled cms
 * @see /src/app/[...slug]/page.tsx/, /src/app/layout.tsx/
 */

import type { Metadata } from "next";
import { siteConfig } from "@/meta/config/site";
import { personSchema, websiteSchema, Schema } from "@/meta/schema";

import { getContent } from "@/cms/pages";
import { readIcon } from "@/utilities/icons";

import Canvas from "@/modules/stage/Canvas";

// Metadata
export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
};

export default async function Home() {
  const content = await getContent("README.md");
  const icon = await readIcon("md");
  return (
    <>
      <Schema data={[websiteSchema, personSchema]} />
      <Canvas
        page={{
          slug: [],
          files: [
            {
              name: "README.md",
              language: "markdown",
              content,
              icon,
              iconName: "md",
              title: siteConfig.name,
              description: siteConfig.description,
            },
          ],
        }}
      />
    </>
  );
}
