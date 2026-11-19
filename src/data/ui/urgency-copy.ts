import type { Urgency } from "@/lib/complaint-engine";

export interface UrgencyCopy {
  label: string;
  explanation: string;
  tone: "good" | "warn" | "bad";
  needleAngle: number;
}

export const URGENCY_COPY: Record<Urgency, UrgencyCopy> = {
  aman_ditunda: {
    label: "Aman ditunda",
    explanation:
      "Masih aman dipakai. Catat dulu, lalu sampaikan ke mekanik saat servis berikutnya. Masalah kecil lebih mudah diselesaikan sebelum membesar.",
    tone: "good",
    needleAngle: 30,
  },
  perlu_segera_diperiksa: {
    label: "Perlu segera diperiksa",
    explanation:
      "Motor mungkin masih bisa dipakai, tetapi sebaiknya diperiksa dalam waktu dekat. Gejala seperti ini jarang membaik sendiri.",
    tone: "warn",
    needleAngle: 90,
  },
  jangan_dikendarai: {
    label: "Jangan dikendarai dulu",
    explanation:
      "Berhenti dulu. Ini menyangkut keselamatan, jadi bawa motor ke bengkel tanpa dikendarai lebih jauh kalau bisa.",
    tone: "bad",
    needleAngle: 150,
  },
};

export const INTRO_LINES = [
  "Dari ceritamu, ada beberapa hal yang layak dicek.",
  "Gejala yang kamu sebut cukup khas. Ini dugaan awalnya.",
  "Biar tidak bingung di bengkel, ini ringkasannya.",
] as const;

export function getUrgencyCopy(urgency: Urgency): UrgencyCopy {
  return URGENCY_COPY[urgency];
}

export function getIntroLine(seed: number): string {
  return INTRO_LINES[Math.abs(seed) % INTRO_LINES.length];
}
