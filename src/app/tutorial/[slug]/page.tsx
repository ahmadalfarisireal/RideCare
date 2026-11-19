import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllTutorials, getTutorialBySlug } from "@/data/tutorials";
import { TutorialDetail } from "@/components/tutorial/tutorial-detail";
import { ArrowLeftIcon } from "@/components/ui/icons";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTutorials().map((tutorial) => ({ slug: tutorial.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  return {
    title: tutorial ? tutorial.title : "Detail tutorial",
  };
}

export default async function TutorialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/tutorial"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeftIcon className="size-4" />
        Kembali ke daftar tutorial
      </Link>
      <TutorialDetail key={tutorial.slug} tutorial={tutorial} />
    </div>
  );
}
