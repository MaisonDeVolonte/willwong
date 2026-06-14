"use client";

import { useEffect } from "react";

// Behavior-only component: renders no DOM, wires folder/accordion toggling
// onto the DevLink-exported nav markup via document-level delegation.
// Mount once in layout.tsx, as a sibling of <Panels>.

const STORAGE_KEY = "nav-open-folders";

export default function Folders() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ==============
    // FOLDER TOGGLING
    // ==============

    function getNavList(link: HTMLElement) {
      const next = link.nextElementSibling as HTMLElement | null;
      return next?.classList.contains("nav__list") ? next : null;
    }

    function getNavIcon(link: HTMLElement) {
      return link.querySelector<HTMLElement>(".nav__icon");
    }

    function isFolderOpen(navList: HTMLElement) {
      return navList.classList.contains("nav__list--open");
    }

    function openFolder(navList: HTMLElement, navIcon: HTMLElement | null) {
      navList.classList.add("nav__list--open");
      if (navIcon) navIcon.classList.add("nav__icon--open");
    }

    function closeFolder(navList: HTMLElement, navIcon: HTMLElement | null) {
      navList.classList.remove("nav__list--open");
      if (navIcon) navIcon.classList.remove("nav__icon--open");
    }

    // ==============
    // PERSISTENCE
    // ==============

    // folder key: the label text of its trigger link
    function getFolderKey(navList: HTMLElement): string | null {
      const trigger = navList.previousElementSibling as HTMLElement | null;
      return trigger?.querySelector(".nav__text")?.textContent ?? null;
    }

    function loadOpenFolders(): Set<string> {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return new Set(saved ? JSON.parse(saved) : []);
      } catch {
        return new Set();
      }
    }

    function saveOpenFolders(open: Set<string>) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...open]));
      } catch {}
    }

    // in-memory mirror of localStorage so we don't read on every click
    const openFolders = loadOpenFolders();

    function toggleFolder(event: MouseEvent) {
      const link = (event.target as HTMLElement).closest<HTMLElement>(".nav__link");
      if (!link) return;

      const navList = getNavList(link);
      if (!navList) return;

      event.preventDefault();
      const navIcon = getNavIcon(link);
      const key = getFolderKey(navList);

      if (isFolderOpen(navList)) {
        closeFolder(navList, navIcon);
        if (key) openFolders.delete(key);
      } else {
        openFolder(navList, navIcon);
        if (key) openFolders.add(key);
      }

      saveOpenFolders(openFolders);
    }

    // ==============
    // ACTIVE STATES
    // ==============

    function updateActiveLinks() {
      const currentPath = window.location.pathname;

      document.querySelectorAll<HTMLElement>(".nav__link").forEach((link) => {
        const href = link.getAttribute("href");
        const isActive = !!href && (href === currentPath || href === currentPath + "/");

        link.classList.toggle("nav__link--active", isActive);

        // auto-open all ancestor folders if a child link is active,
        // and persist them so they survive refresh
        if (isActive) {
          let current: HTMLElement = link;
          while (true) {
            const parentList = current.closest<HTMLElement>(".nav__list");
            if (!parentList) break;
            const folderLink = parentList.previousElementSibling as HTMLElement | null;
            if (folderLink?.classList.contains("nav__link")) {
              openFolder(parentList, getNavIcon(folderLink));
              const key = getFolderKey(parentList);
              if (key) openFolders.add(key);
            }
            current = parentList.parentElement as HTMLElement;
            if (!current) break;
          }
          saveOpenFolders(openFolders);
        }
      });
    }

    // ==============
    // INITIALIZATION
    // ==============

    // restore persisted folder state before applying active links
    document.querySelectorAll<HTMLElement>(".nav__list").forEach((navList) => {
      const key = getFolderKey(navList);
      if (key && openFolders.has(key)) {
        const trigger = navList.previousElementSibling as HTMLElement | null;
        openFolder(navList, trigger ? getNavIcon(trigger) : null);
      }
    });

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
