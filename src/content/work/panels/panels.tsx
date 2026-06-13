"use client";

import { useEffect } from "react";

export default function Panels() {
  useEffect(() => {
    function handleResize(event: MouseEvent) {
      const handle = (event.target as HTMLElement).closest("[data-handle]");
      if (!handle) return;
      // gibberish resize logic placeholder
      console.log("resize", handle);
    }

    document.addEventListener("mousedown", handleResize);
    return () => document.removeEventListener("mousedown", handleResize);
  }, []);

  return null;
}
