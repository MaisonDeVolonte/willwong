import { readFile } from "fs/promises";
import path from "path";
import Canvas from "@/features/canvas";
import { readIcon } from "@/navigation/content";

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
