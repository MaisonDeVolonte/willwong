import { getAllPages, buildNavTree, readIcon, ICON_COLORS } from "@/utilities/navigation";
import type { NavNode, ContentFile } from "@/utilities/navigation";
import NavLink from "@/components/NavLink";
import NavFolder from "@/components/NavFolder";

function primaryExt(files: ContentFile[]): string {
  return files[0]?.name.split(".").pop()?.toLowerCase() ?? "";
}

async function renderNode(node: NavNode, depth: number, chevron: string): Promise<React.ReactNode> {
  if (node.kind === "folder") {
    const children = await Promise.all(
      node.children.map((child) => renderNode(child, depth + 1, chevron))
    );
    return (
      <NavFolder key={node.label} name={node.label} level={depth} chevron={chevron}>
        {children}
      </NavFolder>
    );
  }

  if (node.files.length === 1) {
    const ext = primaryExt(node.files);
    const icon = await readIcon(ext);
    return (
      <NavLink
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
        <NavLink
          key={file.name}
          href={node.href}
          name={file.name}
          level={depth + 1}
          icon={icon}
          iconColor={ICON_COLORS[ext]}
        />
      );
    })
  );

  return (
    <NavFolder key={node.label} name={node.label} level={depth} chevron={chevron}>
      {fileLinks}
    </NavFolder>
  );
}

export default async function NavLinks() {
  const [pages, chevron] = await Promise.all([getAllPages(), readIcon("chevron")]);
  const tree = buildNavTree(pages);
  const nodes = await Promise.all(tree.map((node) => renderNode(node, 1, chevron)));

  return <div className="nav__links">{nodes}</div>;
}
