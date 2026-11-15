import type { Metadata } from "next";

import { ChecklistPageView } from "@/components/result/checklist-page-view";

export const metadata: Metadata = {
  title: "Checklist anti getok harga",
};

export default function ChecklistPage() {
  return <ChecklistPageView />;
}
