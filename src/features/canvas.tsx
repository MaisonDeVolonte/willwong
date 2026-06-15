import Link from "next/link";
import type { ContentPage } from "@/navigation/content";
import Refractor from "@/features/refractor";
import "@/features/refractor.css";
import "@/features/canvas.css";

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
        {page.files.map((file, i) => (
          <Link
            key={file.name}
            href={tabHref(file.name)}
            className={`canvas__tab${i === activeIndex ? " canvas__tab--active" : ""}`}
          >
            <span
              className="canvas__tab-icon"
              dangerouslySetInnerHTML={{ __html: file.icon }}
            />
            {file.name}
          </Link>
        ))}
      </div>
      <Refractor code={active.content} language={active.language} />
    </div>
  );
}
