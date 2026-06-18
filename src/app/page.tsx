import { readFile } from "fs/promises";
import path from "path";
import { readIcon } from "@/core/services/content";
import { personSchema, websiteSchema, SchemaTags } from "@/core/services/schema";
import Canvas from "@/modules/stage/Canvas";

export default async function Home() {
  const [content, icon] = await Promise.all([
    readFile(path.join(process.cwd(), "content/README.md"), "utf-8"),
    readIcon("md"),
  ]);
  return (
    <>
      <SchemaTags data={[websiteSchema, personSchema]} />
      <Canvas
        page={{
          slug: [],
          files: [{ name: "README.md", language: "markdown", content, icon }],
        }}
      />
    </>
  );
}
