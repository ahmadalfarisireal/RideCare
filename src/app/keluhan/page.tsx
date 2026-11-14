import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Ceritakan keluhan motormu",
};

export default function KeluhanPage() {
  return (
    <ComingSoon
      title="Ceritakan keluhan motormu"
      description="Form keluhan, pertanyaan pendamping, dan pilihan jenis motor akan tersedia di sini. Mesin analisis memakai aturan lokal, bukan AI berbayar."
      stage="form keluhan dan mesin analisis"
    />
  );
}
