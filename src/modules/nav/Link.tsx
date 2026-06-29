/**
 * ========================================================================================
 * @file Link.tsx - ui component for terminal-style navigation links
 * ========================================================================================
 * @description
 * - renders individual file links within the sidebar navigation tree
 * - dynamically sets indentation levels and icon colors based on file metadata
 * @see /src/modules/nav/Panel.tsx/
 */

import NextLink from "next/link";

type LinkProps = {
  href: string;
  name: string;
  level: number;
  icon: string;
  iconColor?: string;
};

export default function Link({ href, name, level, icon, iconColor }: LinkProps) {
  return (
    <NextLink className={`nav__link nav__link--lvl${level}`} href={href}>
      <span
        className="nav__icon"
        style={iconColor ? { color: iconColor } : undefined}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <div className="nav__text">{name}</div>
    </NextLink>
  );
}
