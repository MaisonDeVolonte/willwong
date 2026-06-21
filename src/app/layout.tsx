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
import { isHmrRefresh } from "next/dist/server/app-render/work-unit-async-storage.external";

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
        <body>
          <div className="shell">
            <Header
              versionText={versionText}
              versionLink={versionLink}
              hashText={hashText}
              hashLink={hashLink}
            />
            <div className="stage">
              <Nav slot={<Panel />} />
              <main className="canvas">{children}</main>
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
