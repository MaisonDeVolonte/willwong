import { getAllPages, populatePageContent } from "@/cms/loader";
import type { ContentPage } from "@/cms/loader";

export type ResolvedFile = {
  page: ContentPage;
  fileIndex: number;
};

export async function getFile(slug: string[]): Promise<ResolvedFile | null> {
  const pages = await getAllPages();

  const direct = pages.find((p) => p.slug.join("/") === slug.join("/"));
  if (direct) {
    await populatePageContent(direct);
    return { page: direct, fileIndex: 0 };
  }

  if (slug.length > 1) {
    const pageSlugs = slug.slice(0, -1);
    const filename = slug[slug.length - 1];
    const page = pages.find((p) => p.slug.join("/") === pageSlugs.join("/"));
    if (page) {
      const fileIndex = page.files.findIndex((f) => f.name === filename);
      if (fileIndex !== -1) {
        await populatePageContent(page);
        return { page, fileIndex };
      }
    }
  }

  return null;
}

export async function getAllFileParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPages();
  return pages.flatMap((p) =>
    p.files.length === 1
      ? [{ slug: p.slug }]
      : p.files.map((f) => ({ slug: [...p.slug, f.name] }))
  );
}
