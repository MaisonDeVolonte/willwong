import { notFound } from "next/navigation";
import {
  personSchema,
  websiteSchema,
  profilePageSchema,
  buildArticle,
  buildBreadcrumbs,
  SchemaTags,
} from "@/core/services/schema";
import { getAllFileParams, getFile } from "@/modules/navigation/routes";
import Canvas from "@/modules/stage/Canvas";

export async function generateStaticParams() {
  return getAllFileParams();
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await getFile(slug);
  if (!resolved) notFound();

  const isAboutPage = slug.length === 1 && (slug[0] === "about.md" || slug[0] === "about");
  const isNotesPage = slug.length > 0 && slug[0] === "notes";

  const schemas: Record<string, unknown>[] = [websiteSchema, personSchema];

  // Add breadcrumbs for all dynamic pages
  schemas.push(buildBreadcrumbs(slug));

  if (isAboutPage) {
    schemas.push(profilePageSchema);
  } else if (isNotesPage) {
    schemas.push(profilePageSchema);

    // Build article schema dynamically from the resolved file content
    const file = resolved.page.files[resolved.fileIndex];
    const titleMatch = file.content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : file.name;

    const paragraphs = file.content
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith("#") && !p.startsWith("<!--") && !p.startsWith("//"));
    const description = paragraphs[0] ? paragraphs[0].slice(0, 160) : undefined;

    const articleSchema = buildArticle({
      title,
      description,
      slug,
      content: file.content,
    });
    schemas.push(articleSchema);
  }

  return (
    <>
      <SchemaTags data={schemas} />
      <Canvas page={resolved.page} activeIndex={resolved.fileIndex} />
    </>
  );
}
