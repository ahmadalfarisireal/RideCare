import { describe, expect, it } from "vitest";

import {
  CHECKLIST_GROUPS,
  CHECKLIST_PHRASES,
  FALLBACK_CHECKLIST_GROUP,
  FALLBACK_CHECKLIST_REASON,
  getChecklistItemMeta,
  groupChecklistItems,
} from "@/data/ui/checklist-ui";
import { ANTI_RIPOFF_CHECKLIST } from "@/lib/complaint-engine/templates";

describe("checklist UI data", () => {
  it("mengelompokkan 11 item engine tanpa ada yang hilang", () => {
    const groups = groupChecklistItems(ANTI_RIPOFF_CHECKLIST);
    const flattened = groups.flatMap((group) => group.items);

    expect(ANTI_RIPOFF_CHECKLIST).toHaveLength(11);
    expect(groups.map((group) => group.title)).toEqual([...CHECKLIST_GROUPS]);
    expect(flattened).toHaveLength(ANTI_RIPOFF_CHECKLIST.length);
    expect([...flattened.map((item) => item.text)].sort()).toEqual(
      [...ANTI_RIPOFF_CHECKLIST].sort(),
    );
    expect(new Set(flattened.map((item) => item.index)).size).toBe(
      ANTI_RIPOFF_CHECKLIST.length,
    );
  });

  it("memakai alasan dari AG prototipe untuk item yang ada di AG", () => {
    const first = getChecklistItemMeta(ANTI_RIPOFF_CHECKLIST[0]);
    expect(first).toEqual({
      group: "Sebelum berangkat",
      reason:
        "Mekanik yang tahu kapan dan bagaimana gejala muncul bisa langsung mempersempit penyebabnya.",
    });

    const estimate = getChecklistItemMeta(ANTI_RIPOFF_CHECKLIST[3]);
    expect(estimate).toEqual({
      group: "Saat motor diperiksa",
      reason: "Angka tertulis jadi pegangan kalau ada perbedaan saat membayar.",
    });

    const receipt = getChecklistItemMeta(ANTI_RIPOFF_CHECKLIST[9]);
    expect(receipt).toEqual({
      group: "Setelah selesai",
      reason: "Nota rinci memudahkan kamu mencocokkan dengan estimasi di awal.",
    });
  });

  it("memakai kelompok dan alasan cadangan untuk item di luar AG", () => {
    const fallbackIndexes = [2, 7, 10];

    for (const index of fallbackIndexes) {
      expect(getChecklistItemMeta(ANTI_RIPOFF_CHECKLIST[index])).toEqual({
        group: FALLBACK_CHECKLIST_GROUP,
        reason: FALLBACK_CHECKLIST_REASON,
      });
    }
  });

  it("tetap memberi fallback untuk item yang tidak dikenal", () => {
    expect(getChecklistItemMeta("Item checklist baru")).toEqual({
      group: FALLBACK_CHECKLIST_GROUP,
      reason: FALLBACK_CHECKLIST_REASON,
    });
  });

  it("memuat tiga kalimat siap salin dari PHRASES prototipe", () => {
    expect([...CHECKLIST_PHRASES]).toEqual([
      "Boleh diperiksa dulu, lalu kabari saya sebelum ada komponen yang diganti?",
      "Boleh saya lihat komponen yang rusak, dan kenapa harus diganti?",
      "Tolong tuliskan estimasi biaya jasa dan sparepart-nya dulu ya.",
    ]);
  });
});
