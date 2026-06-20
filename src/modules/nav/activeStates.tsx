"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/modules/nav/activeStates.css";

// ==============
// ACTIVE RULES
// Static elements: active = exact path match, nothing else.
// ==============

const ACTIVE_RULES = [
  { selector: ".nav__title", href: "/", activeClass: "nav__title--active" },
];

const DEFAULT_ACTIVE_CLASS = "active";

// ==============
// ACTIVE FUNCTIONS
// Dynamic cases that require logic beyond a simple path match.
// ==============

function activateNavLinks(pathname: string) {
  // If we type "/README.md" manually, map it to "/" so that the sidebar README.md item (which has href="/") is highlighted
  const activePath = pathname === "/README.md" ? "/" : pathname;
  document.querySelectorAll<HTMLElement>(".nav__link").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = !!href && (href === activePath || href === activePath + "/");
    link.classList.toggle("nav__link--active", isActive);
  });
}

// ==============
// COMPONENT
// ==============

export default function ActiveStates() {
  const pathname = usePathname();

  useEffect(() => {
    ACTIVE_RULES.forEach(({ selector, href, activeClass }) => {
      const cls = activeClass ?? DEFAULT_ACTIVE_CLASS;
      const isActive = pathname === href || pathname === href + "/";
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.toggle(cls, isActive);
      });
    });

    activateNavLinks(pathname);
  }, [pathname]);

  return null;
}
