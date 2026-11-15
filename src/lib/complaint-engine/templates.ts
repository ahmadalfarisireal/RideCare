import type { AnalysisInput, Urgency } from "./types";

export const DISCLAIMER =
  "RideCare membantu menyusun keluhan dan memberikan kemungkinan pemeriksaan awal. Hasil ini bukan diagnosis pasti. Untuk pemeriksaan, perbaikan, dan keputusan penggantian komponen, gunakan jasa teknisi atau bengkel yang kompeten. Jangan melakukan perbaikan yang berisiko jika kamu tidak yakin.";

export const DEFAULT_MECHANIC_QUESTIONS = [
  "Apa kemungkinan penyebab utama keluhan ini?",
  "Komponen apa saja yang perlu diperiksa lebih dulu?",
  "Apakah ada komponen yang harus diganti sekarang?",
  "Berapa estimasi biaya jasa dan sparepart sebelum pekerjaan dimulai?",
  "Berapa lama waktu pengerjaannya?",
  "Mohon konfirmasi terlebih dahulu sebelum ada penggantian komponen.",
];

export const ANTI_RIPOFF_CHECKLIST = [
  "Jelaskan gejala motor secara spesifik dan kapan mulai terjadi.",
  "Minta mekanik memeriksa penyebab sebelum mengganti komponen.",
  "Minta rincian komponen yang perlu diperbaiki atau diganti.",
  "Minta estimasi biaya jasa dan sparepart secara tertulis sebelum pekerjaan.",
  "Tanyakan apakah estimasi bisa berubah setelah pemeriksaan lanjutan.",
  "Minta konfirmasi dulu sebelum ada penggantian komponen tambahan.",
  "Tanyakan alasan komponen perlu diganti dan minta bukti jika memungkinkan.",
  "Tanyakan apakah ada pilihan perbaikan yang aman dan lebih hemat.",
  "Minta komponen lama dikembalikan bila memungkinkan.",
  "Minta nota rinci berisi jasa, sparepart, dan total biaya.",
  "Jangan setujui pekerjaan tambahan tanpa penjelasan yang jelas.",
];

export const URGENCY_LABELS: Record<Urgency, string> = {
  aman_ditunda: "Aman ditunda",
  perlu_segera_diperiksa: "Perlu segera diperiksa",
  jangan_dikendarai: "Jangan dikendarai dulu",
};

export const MOTOR_TYPE_LABELS: Record<AnalysisInput["motorcycleType"], string> = {
  bebek: "Bebek",
  matik: "Matik",
  sport: "Sport",
  listrik: "Listrik",
};

export function buildSummary(input: AnalysisInput, components: string[], urgency: Urgency): string {
  const complaint = input.complaint.trim() || "Keluhan belum dijelaskan.";
  const componentText = components.length > 0 ? components.join(", ") : "Periksa menyeluruh di bengkel";
  return [
    `Keluhan: ${complaint}`,
    `Jenis motor: ${MOTOR_TYPE_LABELS[input.motorcycleType]}`,
    `Hal yang perlu diperiksa: ${componentText}`,
    `Tingkat urgensi: ${URGENCY_LABELS[urgency]}`,
  ].join("\n");
}
