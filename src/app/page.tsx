"use client";

import { Shell } from "@webflow/interface/Shell";
import { Main } from "@webflow/interface/Main";

export default function Home() {
  return (
    <Shell
      main={<Main />}
    />
  );
}
