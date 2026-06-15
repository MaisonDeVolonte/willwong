"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadOpenFolders, saveOpenFolders } from "@/utilities/localstorage";

// Behavior-only component: renders no DOM, owns all folder logic:
// toggle, persistence, and opening ancestors on navigation.
// Mount once in layout.tsx.

function getFolderKey(navList: HTMLElement): string | null {
  const trigger = navList.previousElementSibling as HTMLElement | null;
  return trigger?.querySelector(".nav__text")?.textContent ?? null;
}

function openFolder(navList: HTMLElement, navIcon: HTMLElement | null) {
  navList.classList.add("nav__list--open");
  if (navIcon) navIcon.classList.add("nav__icon--open");
}

function closeFolder(navList: HTMLElement, navIcon: HTMLElement | null) {
  navList.classList.remove("nav__list--open");
  if (navIcon) navIcon.classList.remove("nav__icon--open");
}

function openAncestorFolders(link: HTMLElement) {
  const openFolders = loadOpenFolders();
  let current: HTMLElement = link;

  while (true) {
    const parentList = current.closest<HTMLElement>(".nav__list");
    if (!parentList) break;
    const folderLink = parentList.previousElementSibling as HTMLElement | null;
    if (folderLink?.classList.contains("nav__link")) {
      openFolder(parentList, folderLink.querySelector<HTMLElement>(".nav__icon"));
      const key = getFolderKey(parentList);
      if (key) openFolders.add(key);
    }
    current = parentList.parentElement as HTMLElement;
    if (!current) break;
  }

  saveOpenFolders(openFolders);
}

export default function Folders() {
  const pathname = usePathname();

  // toggle + persistence
  useEffect(() => {
    if (typeof window === "undefined") return;

    const openFolders = loadOpenFolders();

    function getNavList(link: HTMLElement) {
      const next = link.nextElementSibling as HTMLElement | null;
      return next?.classList.contains("nav__list") ? next : null;
    }

    function isFolderOpen(navList: HTMLElement) {
      return navList.classList.contains("nav__list--open");
    }

    function toggleFolder(event: MouseEvent) {
      const link = (event.target as HTMLElement).closest<HTMLElement>(".nav__link");
      if (!link) return;

      const navList = getNavList(link);
      if (!navList) return;

      event.preventDefault();
      const navIcon = link.querySelector<HTMLElement>(".nav__icon");
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

    // restore persisted folder state on mount
    document.querySelectorAll<HTMLElement>(".nav__list").forEach((navList) => {
      const key = getFolderKey(navList);
      if (key && openFolders.has(key)) {
        const trigger = navList.previousElementSibling as HTMLElement | null;
        openFolder(navList, trigger ? trigger.querySelector<HTMLElement>(".nav__icon") : null);
      }
    });

    document.addEventListener("click", toggleFolder);

    return () => {
      document.removeEventListener("click", toggleFolder);
    };
  }, []);

  // open ancestor folders on navigation
  useEffect(() => {
    const activeLink = document.querySelector<HTMLElement>(".nav__link--active");
    if (activeLink) openAncestorFolders(activeLink);
  }, [pathname]);

  return null;
}
