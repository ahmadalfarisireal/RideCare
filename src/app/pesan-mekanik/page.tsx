import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Pesan untuk mekanik",
};

export default function PesanMekanikPage() {
  return (
    <ComingSoon
      title="Pesan untuk mekanik"
      description="Pesan siap salin ke WhatsApp akan tersedia di sini, lengkap dengan keluhan dan komponen yang perlu diperiksa."
      stage="pesan mekanik"
    />
  );
}
