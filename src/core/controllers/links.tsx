"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Behavior-only component: renders no DOM, intercepts standard clicks on <a> tags
// and routes them via Next.js router to prevent page refreshes.
// Mount once in layout.tsx, as a sibling of <DevLinkProvider>.

export default function Links() {
  const router = useRouter();

  useEffect(() => {
    function handleLinkClick(event: MouseEvent) {
      // Find the nearest ancestor <a> element
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Check if it is a standard internal link click
      const isInternal = href.startsWith("/") || href.startsWith(window.location.origin);
      const isNormalClick = !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0;
      const isStandardTarget = !link.getAttribute("target") || link.getAttribute("target") === "_self";
      const isDownload = link.hasAttribute("download");

      if (isInternal && isNormalClick && isStandardTarget && !isDownload) {
        // Strip origin if full URL is passed
        const path = href.replace(window.location.origin, "");

        // Ignore hash anchor links (e.g. scroll triggers)
        if (!path.startsWith("/#") && path !== "#") {
          event.preventDefault();
          router.push(path);
        }
      }
    }

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [router]);

  return null;
}
