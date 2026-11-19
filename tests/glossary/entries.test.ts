import { describe, expect, it } from "vitest";

import { glossaryTerms } from "@/data/glossary";
import { filterGlossaryTerms } from "@/lib/glossary/search";

const ENRICHED_IDS = [
  "busi",
  "aki",
  "cvt",
  "kampas-rem",
  "filter-udara",
  "oli-mesin",
];

describe("konten kamus baru", () => {
  it("hanya memperkaya enam istilah yang ditentukan", () => {
    const enriched = glossaryTerms.filter((term) => term.short !== undefined);

    expect([...enriched.map((term) => term.id)].sort()).toEqual([...ENRICHED_IDS].sort());
    for (const term of glossaryTerms) {
      expect(term.definition.length).toBeGreaterThan(0);
      expect(term.related_components.length).toBeGreaterThan(0);
      if (!ENRICHED_IDS.includes(term.id)) {
        expect(term.analogy).toBeUndefined();
        expect(term.diy).toBeUndefined();
      }
    }
  });

  it("memakai teks prototipe untuk field baru", () => {
    const busi = glossaryTerms.find((term) => term.id === "busi");
    const aki = glossaryTerms.find((term) => term.id === "aki");
    const cvt = glossaryTerms.find((term) => term.id === "cvt");

    expect(busi?.term).toBe("Busi");
    expect(busi?.short).toBe(
      "Komponen kecil yang memercikkan api di dalam mesin supaya bensin bisa terbakar.",
    );
    expect(busi?.analogy).toBe(
      "Busi itu seperti korek api untuk mesin. Tanpa percikan yang kuat, campuran bensin dan udara tidak menyala dengan baik.",
    );
    expect(aki?.term).toBe("Aki dan sistem pengisian");
    expect(aki?.diyWhy).toBe(
      "Kamu boleh melihat apakah terminal aki berkarat atau longgar. Mengukur dan memperbaiki sistem pengisian adalah bagian kelistrikan utama, jadi serahkan ke bengkel.",
    );
    expect(cvt?.term).toBe("CVT (motor matik)");
    expect(cvt?.signs).toContain("Mesin meraung tetapi laju tidak ikut naik");
  });

  it("menjaga meter tetap aman dan memakaiOverride Oli yang disetujui", () => {
    const levelById = new Map(
      ENRICHED_IDS.map((id) => [
        id,
        glossaryTerms.find((term) => term.id === id)?.diy,
      ]),
    );

    expect(levelById.get("busi")).toBe("hati");
    expect(levelById.get("aki")).toBe("hati");
    expect(levelById.get("filter-udara")).toBe("hati");
    expect(levelById.get("cvt")).toBe("bengkel");
    expect(levelById.get("kampas-rem")).toBe("bengkel");
    expect(levelById.get("oli-mesin")).toBe("hati");

    const oli = glossaryTerms.find((term) => term.id === "oli-mesin");
    expect(oli?.diyWhy).toBe(
      "Mengecek level oli lewat jendela atau batang celup boleh kamu lakukan. Mengganti oli perlu jenis oli yang sesuai buku manual, mesin yang tidak panas, dan pembuangan oli bekas yang benar. Kalau belum terbiasa, serahkan ke bengkel.",
    );
  });

  it("mencari istilah lewat field baru tanpa angka harga", () => {
    expect(filterGlossaryTerms(glossaryTerms, { query: "dompet" }).map((t) => t.id)).toEqual([
      "aki",
    ]);
    expect(
      filterGlossaryTerms(glossaryTerms, { query: "karet penghapus" }).map((t) => t.id),
    ).toEqual(["kampas-rem"]);
    for (const term of glossaryTerms.filter((item) => ENRICHED_IDS.includes(item.id))) {
      expect(JSON.stringify(term)).not.toMatch(/\bRp\b|\d+\s?ribu|\d+\s?juta/);
    }
  });
});
