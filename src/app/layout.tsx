import type { Metadata } from "next";

import "@webflow/css/normalize.css";
import "@webflow/css/fonts.css";
import "@webflow/css/variables.css";
import "@webflow/css/defaults.css";
import "@webflow/css/tags.css";
import "@webflow/css/classes.css";
import "@webflow/css/global.css";

import "@/css/body.css";
import "@/css/globals.css";
import "@/css/turnerandwolf.css";

import Folders from "@/features/folders";
import Panels from "@/features/panels";
import Active from "@/features/active";

import "@/features/panels.css";

import { DevLinkProvider } from "@webflow/DevLinkProvider";

export const metadata: Metadata = {
  title: "William Wong",
  description: "Portfolio of William Wong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DevLinkProvider>
      <html lang="en">
        <body>
          {children}
          <Active />
          <Panels />
          <Folders />
        </body>
      </html>
    </DevLinkProvider>
  );
}
