import type { Metadata } from "next";

import { GlossaryView } from "@/components/glossary/glossary-view";

export const metadata: Metadata = {
  title: "Kamus bengkel",
};

export default function KamusPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Kamus bengkel</h1>
        <p className="text-sm leading-relaxed text-muted">
          Penjelasan istilah dan komponen motor dengan bahasa sederhana untuk membantu kamu lebih
          paham saat merawat atau servis motor.
        </p>
      </div>
      <GlossaryView />
    </div>
  );
}
