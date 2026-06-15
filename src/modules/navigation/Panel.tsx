import { getAllPages, readIcon, ICON_COLORS } from "@/modules/navigation/content";
import Link from "@/modules/navigation/Link";
import Folder from "@/modules/navigation/Folder";
import { buildNavTree } from "@/modules/navigation/tree";
import type { ContentFile } from "@/modules/navigation/content";
import type { NavNode } from "@/modules/navigation/tree";

function primaryExt(files: ContentFile[]): string {
  return files[0]?.name.split(".").pop()?.toLowerCase() ?? "";
}

async function renderNode(node: NavNode, depth: number, chevron: string): Promise<React.ReactNode> {
  if (node.kind === "folder") {
    const children = await Promise.all(
      node.children.map((child) => renderNode(child, depth + 1, chevron))
    );
    return (
      <Folder key={node.label} name={node.label} level={depth} chevron={chevron}>
        {children}
      </Folder>
    );
  }

  if (node.files.length === 1) {
    const ext = primaryExt(node.files);
    const icon = await readIcon(ext);
    return (
      <Link
        key={node.label}
        href={node.href}
        name={node.label}
        level={depth}
        icon={icon}
        iconColor={ICON_COLORS[ext]}
      />
    );
  }

  const fileLinks = await Promise.all(
    node.files.map(async (file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      const icon = await readIcon(ext);
      return (
        <Link
          key={file.name}
          href={`${node.href}/${file.name}`}
          name={file.name}
          level={depth + 1}
          icon={icon}
          iconColor={ICON_COLORS[ext]}
        />
      );
    })
  );

  return (
    <Folder key={node.label} name={node.label} level={depth} chevron={chevron}>
      {fileLinks}
    </Folder>
  );
}

export default async function Panel() {
  const [pages, chevron] = await Promise.all([getAllPages(), readIcon("chevron")]);
  const tree = buildNavTree(pages);
  const nodes = await Promise.all(tree.map((node) => renderNode(node, 1, chevron)));

  return <div className="nav__links">{nodes}</div>;
}
