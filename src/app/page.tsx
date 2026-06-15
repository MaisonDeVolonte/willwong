import { readFile } from "fs/promises";
import path from "path";
import { readIcon } from "@/core/services/content";
import Canvas from "@/modules/stage/Canvas";

export default async function Home() {
  const [content, icon] = await Promise.all([
    readFile(path.join(process.cwd(), "content/README.md"), "utf-8"),
    readIcon("md"),
  ]);
  return (
    <Canvas
      page={{
        slug: [],
        files: [{ name: "README.md", language: "markdown", content, icon }],
      }}
    />
  );
}
