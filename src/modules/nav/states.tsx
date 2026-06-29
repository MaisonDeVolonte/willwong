/**
 * ========================================================================================
 * @file states.tsx - client-side controller managing folder toggles and active styling
 * ========================================================================================
 * @description
 * - handles folder expand/collapse logic and persists state to local storage
 * - observes url changes and maps 'active' css classes to the current route's link
 * @see /src/utilities/localStorage.ts/, /src/app/layout.tsx/
 */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadOpenFolders, saveOpenFolders } from "@/utilities/localStorage";
import "@/modules/nav/states.css";

// ==============
// ACTIVE RULES
// ==============
const ACTIVE_RULES = [
  { selector: ".nav__title", href: "/", activeClass: "nav__title--active" },
];

const DEFAULT_ACTIVE_CLASS = "active";

// ==============
// HELPER FUNCTIONS
// ==============

function getFolderKey(navList: HTMLElement): string | null {
  return navList.getAttribute("data-folder-key");
}

function openFolder(navList: HTMLElement, navIcon: HTMLElement | null) {
  navList.classList.add("nav__list--open");
  if (navIcon) navIcon.classList.add("nav__icon--open");
}

function closeFolder(navList: HTMLElement, navIcon: HTMLElement | null) {
  navList.classList.remove("nav__list--open");
  if (navIcon) navIcon.classList.remove("nav__icon--open");
}

function getNavList(link: HTMLElement): HTMLElement | null {
  const next = link.nextElementSibling as HTMLElement | null;
  return next?.classList.contains("nav__list") ? next : null;
}

function isFolderOpen(navList: HTMLElement): boolean {
  return navList.classList.contains("nav__list--open");
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

function activateNavLinks(pathname: string) {
  // Map "/README.md" manually to "/" so that the sidebar README.md item is highlighted
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

export default function States() {
  const pathname = usePathname();

  // 1. One-time setup on mount: Restore persisted folders, add click listener for toggling folders
  useEffect(() => {
    if (typeof window === "undefined") return;

    const openFolders = loadOpenFolders();

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

    // Restore persisted folder states
    document.querySelectorAll<HTMLElement>(".nav__list").forEach((navList) => {
      const key = getFolderKey(navList);
      if (key && openFolders.has(key)) {
        const trigger = navList.previousElementSibling as HTMLElement | null;
        openFolder(navList, trigger ? trigger.querySelector<HTMLElement>(".nav__icon") : null);
      }
    });

    // Remove the blocking `<style>` tag injected by layout.tsx now that React has taken over
    document.getElementById("injected-folder-states")?.remove();

    document.addEventListener("click", toggleFolder);

    return () => {
      document.removeEventListener("click", toggleFolder);
    };
  }, []);

  // 2. Route transitions: update active link styles and auto-open ancestor folders of active link
  useEffect(() => {
    // Apply static active rules
    ACTIVE_RULES.forEach(({ selector, href, activeClass }) => {
      const cls = activeClass ?? DEFAULT_ACTIVE_CLASS;
      const isActive = pathname === href || pathname === href + "/";
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.toggle(cls, isActive);
      });
    });

    // Highlight active link
    activateNavLinks(pathname);

    // Expand ancestor folders for the currently active link
    const activeLink = document.querySelector<HTMLElement>(".nav__link--active");
    if (activeLink) {
      openAncestorFolders(activeLink);
    }
  }, [pathname]);

  return null;
}
