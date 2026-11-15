import type { Metadata } from "next";

import { MechanicMessageView } from "@/components/result/mechanic-message-view";

export const metadata: Metadata = {
  title: "Pesan untuk mekanik",
};

export default function PesanMekanikPage() {
  return <MechanicMessageView />;
}
