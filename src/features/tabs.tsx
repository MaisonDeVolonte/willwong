"use client";

import { useState } from "react";
import Refractor from "@/features/refractor";
import "@/features/refractor.css";
import "@/features/tabs.css";
import type { ContentPage } from "@/utilities/navigation";

type TabsProps = {
  page: ContentPage;
};

export default function Tabs({ page }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = page.files[activeIndex];

  return (
    <div className="tabs">
      <div className="tabs__bar">
        {page.files.map((file, i) => (
          <button
            key={file.name}
            className={`tabs__tab${i === activeIndex ? " tabs__tab--active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            {file.name}
          </button>
        ))}
      </div>
      <Refractor code={active.content} language={active.language} />
    </div>
  );
}
