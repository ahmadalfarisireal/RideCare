import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Tutorial perawatan dasar",
};

export default function TutorialPage() {
  return (
    <ComingSoon
      title="Tutorial perawatan dasar"
      description="Sepuluh tutorial perawatan dasar akan tersedia di sini, lengkap dengan tingkat kesulitan, alat, dan peringatan keselamatan."
      stage="tutorial"
    />
  );
}
