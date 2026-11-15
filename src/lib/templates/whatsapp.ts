import type { AnalysisResult, MotorType, Urgency } from "@/lib/complaint-engine";

export interface MechanicMessageInput {
  motorcycleType: MotorType;
  complaint: string;
  summary?: string;
  componentsToCheck: string[];
  mechanicQuestions?: string[];
  urgency?: Urgency;
  safetyLocked?: boolean;
  shortHistory?: string;
}

const MOTOR_LABELS: Record<MotorType, string> = {
  bebek: "motor bebek",
  matik: "motor matik",
  sport: "motor sport",
  listrik: "motor listrik",
};

export function buildMechanicMessage(input: MechanicMessageInput): string {
  const lines: string[] = [];
  const complaint = input.complaint.trim() || (input.summary ?? "Keluhan belum dijelaskan.");
  const components =
    input.componentsToCheck.length > 0
      ? input.componentsToCheck
      : ["Periksa menyeluruh sesuai keluhan"];
  const isDanger = input.safetyLocked || input.urgency === "jangan_dikendarai";

  lines.push(`Halo, saya ingin servis ${MOTOR_LABELS[input.motorcycleType]}.`);
  lines.push("");
  lines.push("Keluhan:");
  lines.push(`- ${complaint}`);

  if (input.shortHistory && input.shortHistory.trim()) {
    lines.push("");
    lines.push("Riwayat singkat:");
    lines.push(`- ${input.shortHistory.trim()}`);
  }

  lines.push("");
  lines.push("Mohon periksa:");
  for (const component of components) {
    lines.push(`- ${component}`);
  }

  lines.push("");
  lines.push("Sebelum perbaikan, mohon informasikan:");
  lines.push("- Penyebab kerusakan.");
  lines.push("- Komponen yang perlu diganti.");
  lines.push("- Estimasi biaya jasa dan sparepart.");
  lines.push("- Waktu pengerjaan.");
  lines.push("");
  lines.push("Mohon konfirmasi terlebih dahulu sebelum penggantian komponen.");

  if (isDanger) {
    lines.push("");
    lines.push(
      "Catatan: kendaraan tidak disarankan dikendarai sampai diperiksa teknisi/bengkel yang kompeten.",
    );
  }

  lines.push("");
  lines.push("Terima kasih.");

  return lines.join("\n");
}

export function buildMechanicMessageFromResult(
  motorcycleType: MotorType,
  complaint: string,
  result: AnalysisResult,
): string {
  return buildMechanicMessage({
    motorcycleType,
    complaint,
    summary: result.summary,
    componentsToCheck: result.componentsToCheck,
    mechanicQuestions: result.mechanicQuestions,
    urgency: result.urgency,
    safetyLocked: result.safetyLocked,
  });
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
