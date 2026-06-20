import type { Metadata } from "next";
import { siteConfig } from "@/meta/config/site";
import { personSchema, websiteSchema, Schema } from "@/meta/schema";

import path from "path";
import { readFile } from "fs/promises";
import { readIcon } from "@/cms/loader";

import Canvas from "@/modules/stage/Canvas";

// Metadata
export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
};

export default async function Home() {
  const [content, icon] = await Promise.all([
    readFile(path.join(process.cwd(), "content/README.md"), "utf-8"),
    readIcon("md"),
  ]);
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
