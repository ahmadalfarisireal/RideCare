import type { Metadata } from "next";

import { getAllTutorials } from "@/data/tutorials";
import { TutorialCard } from "@/components/tutorial/tutorial-card";

export const metadata: Metadata = {
  title: "Tutorial perawatan dasar",
};

export default function TutorialPage() {
  const tutorials = getAllTutorials();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Tutorial perawatan dasar</h1>
        <p className="text-sm leading-relaxed text-muted">
          Panduan perawatan dan pengecekan dasar yang aman. Ikuti langkah dengan tenang, perhatikan
          peringatan keselamatan, dan berhenti jika menemukan tanda yang perlu ditangani bengkel.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.slug} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
}
