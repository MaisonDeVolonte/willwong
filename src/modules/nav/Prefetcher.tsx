/**
 * ========================================================================================
 * @file Prefetcher.tsx - client component for background route prefetching
 * ========================================================================================
 * @description
 * - silently fetches RSC payloads for all navigation routes into the Next.js router cache
 * - uses requestIdleCallback and sequential queueing to avoid blocking the main thread
 * - aborts if the user has data saver enabled or is on a slow connection
 * @see /src/modules/nav/Panel.tsx/
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Prefetcher({ urls }: { urls: string[] }) {
  const router = useRouter();

  useEffect(() => {
    // 1. Guards
    // If the browser doesn't support requestIdleCallback, degrade gracefully by doing nothing.
    if (typeof window === "undefined" || !("requestIdleCallback" in window)) return;

    // Respect user bandwidth constraints
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) return;
      if (["slow-2g", "2g", "3g"].includes(conn.effectiveType)) return;
    }

    // 2. Queue State
    let isCancelled = false;
    const queue = [...urls];

    // 3. Execution
    // Process exactly one URL per idle frame to avoid blocking rendering
    const processQueue = (deadline: IdleDeadline) => {
      if (isCancelled || queue.length === 0) return;

      // As long as we have idle time remaining, pop the next URL and prefetch it
      while (deadline.timeRemaining() > 0 && queue.length > 0) {
        const url = queue.shift();
        if (url) {
          router.prefetch(url);
        }
      }

      // If there are still items left, request the next idle frame
      if (queue.length > 0) {
        requestIdleCallback(processQueue);
      }
    };

    // Wait 3 seconds to let the initial page load settle before stealing bandwidth
    const timer = setTimeout(() => {
      if (!isCancelled) {
        requestIdleCallback(processQueue);
      }
    }, 3000);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [urls, router]);

  return null; // pure behavior, no UI
}
