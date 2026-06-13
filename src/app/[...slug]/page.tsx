import { getAllPages, getPage } from "@/utilities/content";
import Tabs from "@/features/tabs";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return <Tabs page={page} />;
}
