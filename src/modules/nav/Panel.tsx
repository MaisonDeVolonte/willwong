import { getAllPages, readIcon, ICON_COLORS } from "@/cms/pages";
import Link from "@/modules/nav/Link";
import Folder from "@/modules/nav/Folder";
import { buildNavTree } from "@/cms/folders";
import type { NavNode } from "@/cms/folders";



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
    const file = node.files[0];
    const externalUrl = file.externalUrl;
    const ext = file.iconName;
    const displayName = externalUrl
      ? file.name.replace(/\.(link|url|md|txt)$/i, "")
      : file.name;
    return (
      <Link
        key={node.label}
        href={externalUrl ?? node.href}
        name={displayName}
        level={depth}
        icon={file.icon}
        iconColor={ICON_COLORS[ext]}
      />
    );
  }

  const fileLinks = await Promise.all(
    node.files.map(async (file) => {
      const externalUrl = file.externalUrl;
      const ext = file.iconName;
      const displayName = externalUrl
        ? file.name.replace(/\.(link|url|md|txt)$/i, "")
        : file.name;
      return (
        <Link
          key={file.name}
          href={externalUrl ?? `${node.href}/${file.name}`}
          name={displayName}
          level={depth + 1}
          icon={file.icon}
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
