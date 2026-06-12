"use client";

import { useEffect } from "react";

// Behavior-only component: renders no DOM, wires panel toggling + resizing
// onto the DevLink-exported markup via document-level delegation.
// Mount once in layout.tsx, as a sibling of <DevLinkProvider>.

export default function Panels() {
  useEffect(() => {
    // desktop ↔ mobile threshold
    const desktopMediaQuery = window.matchMedia("(min-width: 480px)");

    // ==============
    // PANEL TOGGLING
    // ==============

    // panel's display is 'block' (no flex support) — boolean
    function isDisplayBlock(panel) {
      return getComputedStyle(panel).display === "block";
    }

    // panel's data-state, falling back to computed display when default/blank — boolean
    function isStateOpen(panel) {
      const panelState = panel.dataset.state;
      if (panelState === "open") return true;
      if (panelState === "closed") return false;
      return isDisplayBlock(panel);
    }

    // panel element matching a data-panel name
    function getPanelWithName(panelName) {
      return document.querySelector('[data-panel="' + panelName + '"]');
    }

    // sync every trigger's aria-expanded to its panel's rendered visibility
    function updateTriggerAriaAttributes() {
      document.querySelectorAll("[data-trigger]").forEach((trigger) => {
        const panel = getPanelWithName(trigger.dataset.trigger);
        if (panel) trigger.setAttribute("aria-expanded", isDisplayBlock(panel));
      });
    }

    // sibling behavior: desktop groups by data-group, mobile groups all panels
    function closeSiblingPanels(currentPanel) {
      const isDesktop = desktopMediaQuery.matches;
      const group = currentPanel.dataset.group;
      let siblingPanels;

      if (isDesktop && !group) return;
      if (isDesktop) {
        siblingPanels = document.querySelectorAll('[data-panel][data-group="' + group + '"]');
      } else {
        siblingPanels = document.querySelectorAll("[data-panel]");
      }

      siblingPanels.forEach((siblingPanel) => {
        if (siblingPanel === currentPanel) return;
        if (isDisplayBlock(siblingPanel)) siblingPanel.dataset.state = "closed";
      });
    }

    // delegated click handler: validates trigger, toggles its panel
    function togglePanels(event) {
      const trigger = event.target.closest("[data-trigger]");
      if (!trigger) return;
      const panel = getPanelWithName(trigger.dataset.trigger);
      if (!panel) return;

      if (isStateOpen(panel)) {
        panel.dataset.state = "closed";
      } else {
        panel.dataset.state = "open";
        closeSiblingPanels(panel);
      }

      updateTriggerAriaAttributes();
    }

    // reset all open/closed panels to default, then resync triggers
    function restorePanelDefaults() {
      document
        .querySelectorAll('[data-panel][data-state="open"], [data-panel][data-state="closed"]')
        .forEach((panel) => {
          panel.dataset.state = "default";
        });
      updateTriggerAriaAttributes();
    }

    // ==============
    // PANEL RESIZING
    // ==============

    let isDragging = false;
    let startX = 0;
    let startWidthPercent = 0;
    let activePanel = null;
    let directionMultiplier = 1; // 1 = left-anchored, -1 = right-anchored

    // begin tracking drag (desktop only)
    function startResize(event) {
      if (!desktopMediaQuery.matches) return;

      const handle = event.target.closest("[data-handle]");
      if (!handle) return;

      activePanel = getPanelWithName(handle.dataset.handle);
      if (!activePanel) return;

      isDragging = true;
      startX = event.clientX;
      directionMultiplier = activePanel.dataset.side === "right" ? -1 : 1;

      const panelPixels = activePanel.getBoundingClientRect().width;
      startWidthPercent = (panelPixels / window.innerWidth) * 100;

      document.body.style.userSelect = "none";

      window.addEventListener("mousemove", resizePanel);
      window.addEventListener("mouseup", stopResize);
    }

    // write the live width to a CSS variable, clamped to min/max
    function resizePanel(event) {
      if (!isDragging || !activePanel) return;

      const windowPixels = window.innerWidth;
      const pixelsMoved = event.clientX - startX;
      const percentageChange = ((pixelsMoved * directionMultiplier) / windowPixels) * 100;
      let newWidthPercent = startWidthPercent + percentageChange;

      const panelStyles = getComputedStyle(activePanel);

      function parseBoundary(styleValue, fallbackPercent) {
        if (
          !styleValue ||
          styleValue === "none" ||
          styleValue === "auto" ||
          parseFloat(styleValue) === 0
        ) {
          return fallbackPercent;
        }
        if (String(styleValue).includes("%")) return parseFloat(styleValue);
        return (parseFloat(styleValue) / windowPixels) * 100;
      }

      const minPercent = parseBoundary(panelStyles.minWidth, 15);
      const maxPercent = parseBoundary(panelStyles.maxWidth, 30);

      if (newWidthPercent < minPercent) newWidthPercent = minPercent;
      if (newWidthPercent > maxPercent) newWidthPercent = maxPercent;

      const cssVarName = `--${activePanel.dataset.panel}-width`;
      document.body.style.setProperty(cssVarName, newWidthPercent + "%");
    }

    // tear down drag tracking on release
    function stopResize() {
      isDragging = false;
      activePanel = null;

      document.body.style.removeProperty("user-select");

      window.removeEventListener("mousemove", resizePanel);
      window.removeEventListener("mouseup", stopResize);
    }

    // named (not anonymous) so cleanup can remove it
    function onMousedown(event) {
      if (event.target.closest("[data-handle]")) startResize(event);
    }

    // ==============
    // INITIALIZATION
    // ==============

    updateTriggerAriaAttributes();
    document.addEventListener("click", togglePanels);
    desktopMediaQuery.addEventListener("change", restorePanelDefaults);
    document.addEventListener("mousedown", onMousedown);

    // ==============
    // CLEANUP
    // ==============

    return () => {
      document.removeEventListener("click", togglePanels);
      desktopMediaQuery.removeEventListener("change", restorePanelDefaults);
      document.removeEventListener("mousedown", onMousedown);
      window.removeEventListener("mousemove", resizePanel);
      window.removeEventListener("mouseup", stopResize);
    };
  }, []);

  return null;
}
