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
import "@/app/custom.css";
import "@/features/panels.css";

// Webflow panels + interface
import { Header } from "@webflow/interface/Header";
import { Footer } from "@webflow/interface/Footer";
import { Nav } from "@webflow/panels/Nav";
import { Chat } from "@webflow/panels/Chat";
import { Test } from "@webflow/panels/Test";

// Navigation
import NavLinks from "@/navigation/Panel";
import Active from "@/navigation/activeStates";
import Folders from "@/navigation/folderStates";

// Features
import Panels from "@/features/panels";

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
            <Header />
            <div className="stage">
              <Nav slot={<NavLinks />} />
              <main className="canvas">{children}</main>
              <Test />
              <Chat />
            </div>
            <Footer />
          </div>
          <Active />
          <Folders />
          <Panels />
        </body>
      </html>
    </DevLinkProvider>
  );
}
