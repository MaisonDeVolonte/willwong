import type { ContentPage, ContentFile } from "@/cms/pages";
import { slugify } from "@/cms/slugs";

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

function isVisualFolder(node: NavNode): boolean {
  return node.kind === "folder" || node.files.length > 1;
}

function sortNavNodes(nodes: NavNode[]): NavNode[] {
  return [...nodes].sort((a, b) => {
    const aIsFolder = isVisualFolder(a);
    const bIsFolder = isVisualFolder(b);

    if (aIsFolder && !bIsFolder) return -1;
    if (!aIsFolder && bIsFolder) return 1;

    const aIsReadme = a.label.toUpperCase() === "README.MD";
    const bIsReadme = b.label.toUpperCase() === "README.MD";
    if (aIsReadme && !bIsReadme) return -1;
    if (!aIsReadme && bIsReadme) return 1;

    return a.label.localeCompare(b.label);
  });
}

export function buildNavTree(pages: ContentPage[], depth = 0): NavNode[] {
  const leaves: NavLeaf[] = [];
  const folders = new Map<string, ContentPage[]>();

  for (const page of pages) {
    const isLeaf = page.slug.length - 1 === depth;

    if (isLeaf) {
      const label = page.slug[depth];
      const file = page.files[0];
      const fileNameWithoutExt = file?.name.replace(/\.[^.]+$/, "");
      const shouldCollapse =
        !file ||
        label.toLowerCase() === fileNameWithoutExt.toLowerCase() ||
        label.toLowerCase() === file.name.toLowerCase();

      if (shouldCollapse) {
        const rawHref = `/${page.slug.map(slugify).join("/")}`;
        const href = rawHref === `/${slugify("README.md")}` ? "/" : rawHref;
        leaves.push({
          kind: "leaf",
          label,
          href,
          files: page.files,
        });
      } else {
        // Treat different-named nested files (like app/custom.css, app/layout.tsx) as a folder containing those files
        const key = label;
        if (!folders.has(key)) folders.set(key, []);
        for (const f of page.files) {
          folders.get(key)!.push({
            slug: [...page.slug, f.name],
            files: [f],
          });
        }
      }
    } else {
      const key = page.slug[depth];
      if (!folders.has(key)) folders.set(key, []);
      folders.get(key)!.push(page);
    }
  }

  const folderNodes: NavFolder[] = Array.from(folders.entries()).map(([label, childrenPages]) => {
    const childNodes = buildNavTree(childrenPages, depth + 1);

    // Check if there is a matching leaf for this folder (e.g. folder has direct files + subfolders)
    const leafIndex = leaves.findIndex((l) => l.label === label);
    if (leafIndex !== -1) {
      const matchingLeaf = leaves[leafIndex];
      // Remove the folder-level leaf from the parent tree list
      leaves.splice(leafIndex, 1);

      // Convert the leaf's files into individual child leaf nodes inside this folder
      const fileLeaves: NavLeaf[] = matchingLeaf.files.map((file) => ({
        kind: "leaf",
        label: file.name,
        href: matchingLeaf.files.length === 1 ? matchingLeaf.href : `${matchingLeaf.href}/${slugify(file.name)}`,
        files: [file],
      }));

      childNodes.push(...fileLeaves);
    }

    return {
      kind: "folder",
      label,
      children: sortNavNodes(childNodes),
    };
  });

  return sortNavNodes([...folderNodes, ...leaves]);
}
