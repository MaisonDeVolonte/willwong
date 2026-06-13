import { readFile } from "fs/promises";
import path from "path";
import Tabs from "@/features/tabs";

export default async function Home() {
  const content = await readFile(
    path.join(process.cwd(), "src/content/home.md"),
    "utf-8"
  );
  return (
    <Tabs
      page={{
        slug: [],
        files: [{ name: "home.md", language: "markdown", content }],
      }}
    />
  );
}
