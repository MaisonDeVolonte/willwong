// Metadata
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "William Wong",
  description: "Portfolio of William Wong",
};

// Providers
import { DevLinkProvider } from "@webflow/DevLinkProvider";

// Webflow
import "@webflow/css/normalize.css";
import "@webflow/css/fonts.css";
import "@webflow/css/variables.css";
import "@webflow/css/defaults.css";
import "@webflow/css/tags.css";
import "@webflow/css/classes.css";
import "@webflow/css/global.css";

// Overrides
import "./custom.css";

// Layout
import { Shell } from "@webflow/interface/Shell";

// Features
import Active from "@/features/active";
import Folders from "@/features/folders";
import Panels from "@/features/panels";
import "@/features/panels.css";

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
          <Shell slot={<main className="canvas">{children}</main>} />
          <Active />
          <Folders />
          <Panels />
        </body>
      </html>
    </DevLinkProvider>
  );
}
