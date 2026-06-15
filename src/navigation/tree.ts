import type { ContentPage, ContentFile } from "@/navigation/content";

export type NavLeaf = {
  kind: "leaf";
  label: string;
  href: string;
  files: ContentFile[];
};

export type NavFolder = {
  kind: "folder";
  label: string;
  children: NavNode[];
};

export type NavNode = NavLeaf | NavFolder;

export function buildNavTree(pages: ContentPage[], depth = 0): NavNode[] {
  const leaves: NavLeaf[] = [];
  const folders = new Map<string, ContentPage[]>();

  for (const page of pages) {
    if (page.slug.length - 1 === depth) {
      leaves.push({
        kind: "leaf",
        label: page.slug[depth],
        href: `/${page.slug.join("/")}`,
        files: page.files,
      });
    } else {
      const key = page.slug[depth];
      if (!folders.has(key)) folders.set(key, []);
      folders.get(key)!.push(page);
    }
  }

  const folderNodes: NavFolder[] = Array.from(folders.entries()).map(([label, children]) => ({
    kind: "folder",
    label,
    children: buildNavTree(children, depth + 1),
  }));

  return [...folderNodes, ...leaves];
}
