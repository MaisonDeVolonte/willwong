"use client";

import { useEffect } from "react";

// Behavior-only component: renders no DOM, marks elements as active
// based on the current page path. Mount once in layout.tsx.
//
// ACTIVE_RULES:
// { selector: ".css__selector", href: "/path/to/match", activeClass: "class__name--modifier" }

const ACTIVE_RULES = [
  { selector: ".nav__title", href: "/", activeClass: "nav__title--active" },
];

const DEFAULT_ACTIVE_CLASS = "active";

export default function Active() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    function updateActiveStates() {
      const currentPath = window.location.pathname;

      ACTIVE_RULES.forEach(({ selector, href, activeClass }) => {
        const cls = activeClass ?? DEFAULT_ACTIVE_CLASS;
        const isActive = currentPath === href || currentPath === href + "/";

        document.querySelectorAll(selector).forEach((el) => {
          el.classList.toggle(cls, isActive);
        });
      });
    }

    updateActiveStates();
  }, []);

  return null;
}
