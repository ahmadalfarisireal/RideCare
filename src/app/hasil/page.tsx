import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Hasil analisis awal",
};

export default function HasilPage() {
  return (
    <ComingSoon
      title="Hasil analisis awal"
      description="Ringkasan keluhan, kemungkinan penyebab, komponen yang perlu diperiksa, dan tingkat urgensi akan tampil di sini."
      stage="hasil analisis"
    />
  );
}
