import type { Urgency } from "@/lib/complaint-engine";

export interface HomeSample {
  label: string;
  level: Urgency;
  teaser: string;
}

export const HOME_SAMPLES: HomeSample[] = [
  {
    label: "Susah hidup pagi",
    level: "perlu_segera_diperiksa",
    teaser:
      "Dugaan teratas: aki lemah atau pengisian aki bermasalah. Starter yang berbunyi lemah jadi petunjuk utamanya.",
  },
  {
    label: "Tarikan berat dan boros",
    level: "aman_ditunda",
    teaser:
      "Dugaan teratas: filter udara kotor atau busi aus. Keduanya perawatan rutin, jadi masih aman ditunda sebentar.",
  },
  {
    label: "Rem berbunyi cit",
    level: "perlu_segera_diperiksa",
    teaser:
      "Dugaan teratas: kampas rem tipis atau kotor. Rem selalu diserahkan ke bengkel, tanpa bongkar sendiri.",
  },
  {
    label: "Bunyi logam saat mengerem",
    level: "jangan_dikendarai",
    teaser:
      "Berhenti dulu. Bunyi logam bergesek bisa berarti kampas sudah habis, jadi motor sebaiknya tidak dikendarai.",
  },
];

export const HOME_TIPS = [
  "Aki yang baru diganti tapi cepat habis lagi sering kali bukan salah akinya, melainkan pengisiannya.",
  "Busi dan filter udara termasuk penyebab brebet yang paling sering, dan keduanya masuk perawatan rutin.",
  "Mati hanya saat berhenti biasanya berkaitan dengan putaran idle, bukan dengan tenaga saat berjalan.",
  "Bunyi cit tipis tidak selalu berarti rem rusak, tetapi bunyi logam kasar selalu perlu pemeriksaan segera.",
  "Pada motor matik, getar saat mulai jalan sering kali berasal dari area CVT.",
  "Lampu yang redup saat idle lalu terang saat gas ditarik bisa jadi tanda pengisian aki kurang baik.",
] as const;

function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

export function getHomeSample(index: number): HomeSample {
  return HOME_SAMPLES[wrapIndex(index, HOME_SAMPLES.length)];
}
