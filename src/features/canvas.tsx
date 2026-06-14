"use client";

import { useState } from "react";
import Refractor from "@/features/refractor";
import "@/features/refractor.css";
import "@/features/canvas.css";
import type { ContentPage } from "@/utilities/navigation";

type CanvasProps = {
  page: ContentPage;
};

export default function Canvas({ page }: CanvasProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = page.files[activeIndex];

  return (
    <div className="canvas">
      <div className="canvas__bar">
        {page.files.map((file, i) => (
          <button
            key={file.name}
            className={`canvas__tab${i === activeIndex ? " canvas__tab--active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <span
              className="canvas__tab-icon"
              dangerouslySetInnerHTML={{ __html: file.icon }}
            />
            {file.name}
          </button>
        ))}
      </div>
      <Refractor code={active.content} language={active.language} />
    </div>
  );
}
