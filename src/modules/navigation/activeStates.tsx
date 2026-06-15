"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/modules/navigation/activeStates.css";

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
  document.querySelectorAll<HTMLElement>(".nav__link").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = !!href && (href === pathname || href === pathname + "/");
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
