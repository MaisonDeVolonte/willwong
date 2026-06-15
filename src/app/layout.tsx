// Metadata
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "William Wong",
  description: "Portfolio of William Wong",
};

// Webflow Components
import { DevLinkProvider } from "@webflow/DevLinkProvider";
import { Header } from "@webflow/interface/Header";
import { Footer } from "@webflow/interface/Footer";
import { Nav } from "@webflow/panels/Nav";
import { Chat } from "@webflow/panels/Chat";
import { Test } from "@webflow/panels/Test";

// Navigation
import Panel from "@/modules/navigation/Panel";
import ActiveStates from "@/modules/navigation/activeStates";
import FolderStates from "@/modules/navigation/folderStates";

// Controllers
import Panels from "@/core/controllers/panels";

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
              <Nav slot={<Panel />} />
              <main className="canvas">{children}</main>
              <Test />
              <Chat />
            </div>
            <Footer />
          </div>
          <ActiveStates />
          <FolderStates />
          <Panels />
        </body>
      </html>
    </DevLinkProvider>
  );
}
