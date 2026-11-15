import type { Metadata } from "next";

import { ComplaintWizard } from "@/components/forms/complaint-wizard";

export const metadata: Metadata = {
  title: "Ceritakan keluhan motormu",
};

export default function KeluhanPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ceritakan keluhan motormu
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          Jawab beberapa langkah singkat. Hasilnya berupa kemungkinan awal, bukan diagnosis pasti.
        </p>
      </div>
      <ComplaintWizard />
    </div>
  );
}
