/**
 * ========================================================================================
 * @file Link.tsx - ui component for terminal-style navigation links
 * ========================================================================================
 * @description
 * - renders individual file links within the sidebar navigation tree
 * - dynamically sets indentation levels and icon colors based on file metadata
 * - uses useTransition to display a loading spinner while fetching the RSC payload
 * @see /src/modules/nav/Panel.tsx/
 */

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  name: string;
  level: number;
  icon: string;
  iconColor?: string;
};

export default function Link({ href, name, level, icon, iconColor }: LinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let external links or native modifier-clicks (cmd+click, etc.) pass through natively
    if (isExternal || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <NextLink 
      className={`nav__link nav__link--lvl${level}`} 
      href={href}
      onClick={handleClick}
      prefetch={!isExternal}
    >
      <span
        className="nav__icon"
        style={iconColor ? { color: iconColor } : undefined}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <div className="nav__text">{name}</div>
      {isPending && (
        <svg 
          className="nav__spinner" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
    </NextLink>
  );
}
