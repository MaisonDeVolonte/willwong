import { ICON_COLORS, type ContentPage } from "@/cms/loader";

import Link from "next/link";
import Refractor from "@/modules/stage/Refractor";

import "@/modules/stage/Refractor.css";
import "@/modules/stage/Canvas.css";

type CanvasProps = {
  page: ContentPage;
  activeIndex?: number;
};

export default function Canvas({ page, activeIndex = 0 }: CanvasProps) {
  const active = page.files[activeIndex];
  const basePath = `/${page.slug.join("/")}`;

  function tabHref(filename: string) {
    return page.files.length === 1 ? basePath : `${basePath}/${filename}`;
  }

  return (
    <div className="canvas">
      <div className="canvas__bar">
        {page.files.map((file, i) => {
          const isActive = i === activeIndex;
          const ext = file.iconName;
          const iconColor = isActive ? ICON_COLORS[ext] : undefined;
          return (
            <Link
              key={file.name}
              href={tabHref(file.name)}
              className={`canvas__tab${isActive ? " canvas__tab--active" : ""}`}
            >
              <span
                className="canvas__tab-icon"
                style={iconColor ? { color: iconColor } : undefined}
                dangerouslySetInnerHTML={{ __html: file.icon }}
              />
              {file.name}
            </Link>
          );
        })}
      </div>
      <Refractor code={active.content} language={active.language} />
    </div>
  );
}
