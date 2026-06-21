import type { Metadata } from "next";
import { siteConfig } from "@/meta/config/site";
import { personSchema, websiteSchema, Schema } from "@/meta/schema";

import { getContent, readIcon } from "@/cms/pages";

import Canvas from "@/modules/stage/Canvas";

// Metadata
export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
};

export default async function Home() {
  const content = getContent("README.md");
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
