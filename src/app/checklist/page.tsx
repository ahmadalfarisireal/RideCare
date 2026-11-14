import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Checklist anti getok harga",
};

export default function ChecklistPage() {
  return (
    <ComingSoon
      title="Checklist anti getok harga"
      description="Checklist pertanyaan sebelum ke bengkel akan tersedia di sini, mulai dari meminta estimasi hingga meminta nota rinci."
      stage="checklist"
    />
  );
}
