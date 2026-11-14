import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Detail tutorial",
};

export default function TutorialDetailPage() {
  return (
    <ComingSoon
      title="Detail tutorial"
      description="Langkah bergambar, alat yang dibutuhkan, dan bagian 'berhenti dan ke bengkel' akan tampil di sini."
      stage="detail tutorial"
    />
  );
}
