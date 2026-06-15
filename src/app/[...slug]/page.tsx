import { notFound } from "next/navigation";
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
  return <Canvas page={resolved.page} activeIndex={resolved.fileIndex} />;
}
