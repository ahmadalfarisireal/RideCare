import type { Metadata } from "next";

import { ResultView } from "@/components/result/result-view";

export const metadata: Metadata = {
  title: "Hasil analisis awal",
};

export default function HasilPage() {
  return <ResultView />;
}
