import { readFile } from "fs/promises";
import path from "path";
import { readIcon } from "@/modules/navigation/content";
import Canvas from "@/modules/stage/Canvas";

export default async function Home() {
  const [content, icon] = await Promise.all([
    readFile(path.join(process.cwd(), "src/content/home.md"), "utf-8"),
    readIcon("md"),
  ]);
  return (
    <Canvas
      page={{
        slug: [],
        files: [{ name: "home.md", language: "markdown", content, icon }],
      }}
    />
  );
}
