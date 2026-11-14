import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Kamus bengkel",
};

export default function KamusPage() {
  return (
    <ComingSoon
      title="Kamus bengkel"
      description="Istilah dan komponen motor akan dijelaskan dengan bahasa sederhana, dari busi hingga sistem CVT."
      stage="kamus bengkel"
    />
  );
}
