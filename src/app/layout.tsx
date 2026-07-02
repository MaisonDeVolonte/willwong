/**
 * ========================================================================================
 * @file layout.tsx - root next.js layout wrapper for the entire application
 * ========================================================================================
 * @description
 * - injects devlink providers, global css cascade, and top-level ui components
 * - mounts global behavior controllers (e.g. links, panels) outside the dom tree
 * @see /src/app/page.tsx/, /webflow/
 */

// Metadata
import type { Metadata } from "next";
import { siteConfig } from "@/meta/config/site";
import { versionText, versionLink, hashText, hashLink } from "@/meta/config/version";

// Webflow Components
import { DevLinkProvider } from "@webflow/DevLinkProvider";
import { Header } from "@webflow/interface/Header";
import { Footer } from "@webflow/interface/Footer";
import { Nav } from "@webflow/panels/Nav";
import { Chat } from "@webflow/panels/Chat";
import { Test } from "@webflow/panels/Test";

// Navigation
import Panel from "@/modules/nav/Panel";
import States from "@/modules/nav/states";

// Controllers
import Panels from "@/core/controllers/panels";
import Links from "@/core/controllers/links";

// Webflow styles
import "@webflow/css/normalize.css";
import "@webflow/css/fonts.css";
import "@webflow/css/variables.css";
import "@webflow/css/defaults.css";
import "@webflow/css/tags.css";
import "@webflow/css/classes.css";
import "@webflow/css/global.css";

// Overrides
import "@/app/custom.css";
import "@/core/controllers/panels.css";
import "@/modules/stage/Chat.css";

// Metadata
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
};

// Render
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DevLinkProvider>
      <html lang="en">
        <body suppressHydrationWarning>
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const state = JSON.parse(localStorage.getItem('app-state') || '{}');

                  // Panel widths
                  if (state.panelWidths) {
                    for (const [panel, width] of Object.entries(state.panelWidths)) {
                      document.body.style.setProperty('--' + panel + '-width', width);
                    }
                  }

                  // Initial styling (Folders & Active Links)
                  let css = '';

                  // 1. Active Link State
                  const currentPath = window.location.pathname;
                  const activePath = currentPath === "/README.md" ? "/" : currentPath;
                  css += '.nav__link[href="' + activePath + '"], .nav__link[href="' + activePath + '/"] { color: var(--text-active) !important; } ';

                  // 2. Folder states
                  if (state.openFolders && state.openFolders.length > 0) {
                    for (const key of state.openFolders) {
                      css += '.nav__list[data-folder-key="' + key + '"] { height: auto !important; max-height: none !important; } ';
                      css += '.nav__link:has(+ .nav__list[data-folder-key="' + key + '"]) .nav__icon { transform: rotate(90deg) !important; } ';
                    }
                  }

                  if (css) {
                    const style = document.createElement('style');
                    style.id = 'injected-folder-states';
                    style.textContent = css;
                    document.head.appendChild(style);
                  }
                } catch (e) {}
              `,
            }}
          />
          <div id="Shell" className="shell">
            <Header
              versionText={versionText}
              versionLink={versionLink}
              hashText={hashText}
              hashLink={hashLink}
            />
            <div id="Stage" className="stage">
              <Nav slot={<Panel />} />
              <main id="Canvas" className="canvas">{children}</main>
              <Test />
              <Chat />
            </div>
            <Footer />
          </div>
          <States />
          <Panels />
          <Links />
        </body>
      </html>
    </DevLinkProvider>
  );
}
