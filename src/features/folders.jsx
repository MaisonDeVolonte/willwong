"use client";

import { useEffect } from "react";

// Behavior-only component: renders no DOM, wires folder/accordion toggling
// onto the DevLink-exported nav markup via document-level delegation.
// Mount once in layout.tsx, as a sibling of <Panels>.

export default function Folders() {
  useEffect(() => {
    // Server side render guard: no window object on server
    if (typeof window === "undefined") return;
    const currentPath = window.location.pathname;

    // ==============
    // FOLDER TOGGLING
    // ==============

    // the .nav__list sibling immediately following a .nav__link
    function getNavList(link) {
      return link.parentElement?.querySelector(".nav__list");
    }

    // the .nav__icon child within a .nav__link
    function getNavIcon(link) {
      return link.querySelector(".nav__icon");
    }

    // whether a folder is currently open
    function isFolderOpen(navList) {
      return navList.classList.contains("nav__list--open");
    }

    // open a folder: add open classes to list + icon
    function openFolder(navList, navIcon) {
      navList.classList.add("nav__list--open");
      if (navIcon) navIcon.classList.add("nav__icon--open");
    }

    // close a folder: remove open classes from list + icon
    function closeFolder(navList, navIcon) {
      navList.classList.remove("nav__list--open");
      if (navIcon) navIcon.classList.remove("nav__icon--open");
    }

    // delegated click handler: validates nav__link, toggles its folder
    function toggleFolder(event) {
      const link = event.target.closest(".nav__link");
      if (!link) return;

      const navList = getNavList(link);
      if (!navList) return;

      const navIcon = getNavIcon(link);

      if (isFolderOpen(navList)) {
        closeFolder(navList, navIcon);
      } else {
        openFolder(navList, navIcon);
      }
    }

    // ==============
    // ACTIVE STATES
    // ==============

    // mark the nav__link whose href matches the current path as active
    function updateActiveLinks() {
      const currentPath = window.location.pathname;

      document.querySelectorAll(".nav__link").forEach((link) => {
        const href = link.getAttribute("href");
        const isActive =
          href && (href === currentPath || href === currentPath + "/");

        link.classList.toggle("nav__link--active", isActive);

        // auto-open the parent folder if a child link is active
        if (isActive) {
          const parentList = link.closest(".nav__list");
          if (parentList) {
            const parentLink =
              parentList.previousElementSibling?.closest(".nav__link") ??
              parentList
                .closest(".nav__item")
                ?.querySelector(":scope > .nav__link");
            if (parentLink) {
              openFolder(parentList, getNavIcon(parentLink));
            }
          }
        }
      });
    }

    // ==============
    // INITIALIZATION
    // ==============

    updateActiveLinks();
    document.addEventListener("click", toggleFolder);

    // ==============
    // CLEANUP
    // ==============

    return () => {
      document.removeEventListener("click", toggleFolder);
    };
  }, []);

  return null;
}
