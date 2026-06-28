import type { Metadata } from "next";
import * as schema from "@/meta/schema";

import { notFound, redirect } from "next/navigation";
import { getAllFileParams, getFile } from "@/cms/slugs";
import { populatePageContent } from "@/cms/pages";

import Canvas from "@/modules/stage/Canvas";

type Props = {
  params: Promise<{ slug: string[] }>;
};

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await getFile(slug);
  if (!resolved) return {};

  const file = resolved.page.files[resolved.fileIndex];
  return {
    title: file.title,
    description: file.description,
  };
}

export async function generateStaticParams() {
  return getAllFileParams();
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await getFile(slug);
  if (!resolved) notFound();

  const file = resolved.page.files[resolved.fileIndex];
  if (file.externalUrl) {
    redirect(file.externalUrl);
  }

  // Read the body for this page only (other pages never touch disk here)
  await populatePageContent(resolved.page);

  const isAboutPage = slug.length === 1 && (slug[0] === "about-md" || slug[0] === "about");
  const isNotesPage = slug.length > 0 && slug[0] === "notes";

  const schemas: Record<string, unknown>[] = [schema.websiteSchema, schema.personSchema];

  // Add breadcrumbs for all dynamic pages
  schemas.push(schema.buildBreadcrumbs(slug));

  if (isAboutPage) {
    schemas.push(schema.profilePageSchema);
  } else if (isNotesPage) {
    schemas.push(schema.profilePageSchema);

    // Build article schema dynamically from the preloaded file metadata
    const file = resolved.page.files[resolved.fileIndex];

    const articleSchema = schema.buildArticle({
      title: file.title,
      description: file.description,
      slug,
      content: file.content,
    });
    schemas.push(articleSchema);
  }

  return (
    <>
      <schema.Schema data={schemas} />
      <Canvas page={resolved.page} activeIndex={resolved.fileIndex} />
    </>
  );
}
