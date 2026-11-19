export const CHECKLIST_GROUPS = [
  "Sebelum berangkat",
  "Saat motor diperiksa",
  "Setelah selesai",
] as const;

export type ChecklistGroupTitle = (typeof CHECKLIST_GROUPS)[number];

export const FALLBACK_CHECKLIST_GROUP: ChecklistGroupTitle = "Saat motor diperiksa";

export const FALLBACK_CHECKLIST_REASON =
  "Keputusan tetap di tanganmu, bukan di tangan bengkel.";

export const CHECKLIST_PHRASES = [
  "Boleh diperiksa dulu, lalu kabari saya sebelum ada komponen yang diganti?",
  "Boleh saya lihat komponen yang rusak, dan kenapa harus diganti?",
  "Tolong tuliskan estimasi biaya jasa dan sparepart-nya dulu ya.",
] as const;

type ChecklistItemMetaInput = {
  group?: ChecklistGroupTitle;
  reason?: string;
};

export type ChecklistItemMeta = {
  group: ChecklistGroupTitle;
  reason: string;
};

export type GroupedChecklistItem = {
  index: number;
  text: string;
  reason: string;
};

export type GroupedChecklist = {
  title: ChecklistGroupTitle;
  items: GroupedChecklistItem[];
};

export const CHECKLIST_ITEM_META: Record<string, ChecklistItemMetaInput> = {
  "Jelaskan gejala motor secara spesifik dan kapan mulai terjadi.": {
    group: "Sebelum berangkat",
    reason:
      "Mekanik yang tahu kapan dan bagaimana gejala muncul bisa langsung mempersempit penyebabnya.",
  },
  "Minta mekanik memeriksa penyebab sebelum mengganti komponen.": {
    group: "Sebelum berangkat",
    reason:
      "Pemeriksaan awal sering sudah menunjukkan masalahnya tanpa membongkar apa pun.",
  },
  "Minta estimasi biaya jasa dan sparepart secara tertulis sebelum pekerjaan.": {
    group: "Saat motor diperiksa",
    reason: "Angka tertulis jadi pegangan kalau ada perbedaan saat membayar.",
  },
  "Tanyakan apakah estimasi bisa berubah setelah pemeriksaan lanjutan.": {
    group: "Saat motor diperiksa",
    reason:
      "Biaya bisa bertambah kalau ada temuan baru. Pastikan kamu tahu alasannya sebelum setuju.",
  },
  "Minta konfirmasi dulu sebelum ada penggantian komponen tambahan.": {
    group: "Saat motor diperiksa",
    reason: "Keputusan tetap di tanganmu, bukan di tangan bengkel.",
  },
  "Tanyakan alasan komponen perlu diganti dan minta bukti jika memungkinkan.": {
    group: "Saat motor diperiksa",
    reason: "Komponen yang benar-benar rusak mudah ditunjukkan.",
  },
  "Minta komponen lama dikembalikan bila memungkinkan.": {
    group: "Setelah selesai",
    reason: "Kamu bisa melihat sendiri bahwa komponen itu memang diganti.",
  },
  "Minta nota rinci berisi jasa, sparepart, dan total biaya.": {
    group: "Setelah selesai",
    reason: "Nota rinci memudahkan kamu mencocokkan dengan estimasi di awal.",
  },
};

export function getChecklistItemMeta(text: string): ChecklistItemMeta {
  const meta = CHECKLIST_ITEM_META[text];

  return {
    group: meta?.group ?? FALLBACK_CHECKLIST_GROUP,
    reason: meta?.reason ?? FALLBACK_CHECKLIST_REASON,
  };
}

export function groupChecklistItems(items: string[]): GroupedChecklist[] {
  const groups: GroupedChecklist[] = CHECKLIST_GROUPS.map((title) => ({
    title,
    items: [],
  }));

  items.forEach((text, index) => {
    const meta = getChecklistItemMeta(text);
    const target =
      groups.find((group) => group.title === meta.group) ??
      groups.find((group) => group.title === FALLBACK_CHECKLIST_GROUP)!;

    target.items.push({ index, text, reason: meta.reason });
  });

  return groups;
}
