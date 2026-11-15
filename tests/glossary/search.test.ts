import { describe, expect, it } from "vitest";
import { filterGlossaryTerms } from "@/lib/glossary/search";
import type { GlossaryTerm } from "@/types/glossary";

const sample: GlossaryTerm[] = [
  {
    id: "busi",
    term: "Busi",
    definition: "Komponen pemantik api di ruang bakar.",
    category: "mesin",
    related_components: ["Koil pengapian"],
  },
  {
    id: "aki",
    term: "Aki",
    definition: "Penyimpan daya listrik motor.",
    category: "kelistrikan",
    related_components: ["Terminal aki"],
  },
  {
    id: "kampas-rem",
    term: "Kampas rem",
    definition: "Bagian yang membantu menghentikan motor.",
    category: "pengereman",
    related_components: ["Cakram"],
  },
];

describe("filterGlossaryTerms", () => {
  it("mengembalikan semua istilah saat kueri kosong dan kategori semua", () => {
    expect(filterGlossaryTerms(sample)).toHaveLength(3);
    expect(filterGlossaryTerms(sample, { query: "  ", category: "semua" })).toHaveLength(3);
  });

  it("memfilter berdasarkan kategori", () => {
    const result = filterGlossaryTerms(sample, { category: "kelistrikan" });
    expect(result.map((t) => t.id)).toEqual(["aki"]);
  });

  it("mencari berdasarkan istilah, definisi, atau komponen terkait", () => {
    expect(filterGlossaryTerms(sample, { query: "busi" }).map((t) => t.id)).toEqual(["busi"]);
    expect(filterGlossaryTerms(sample, { query: "LISTRIK" }).map((t) => t.id)).toEqual(["aki"]);
    expect(filterGlossaryTerms(sample, { query: "cakram" }).map((t) => t.id)).toEqual(["kampas-rem"]);
  });

  it("menggabungkan pencarian dan kategori", () => {
    expect(
      filterGlossaryTerms(sample, { query: "aki", category: "kelistrikan" }).map((t) => t.id),
    ).toEqual(["aki"]);
    expect(filterGlossaryTerms(sample, { query: "aki", category: "mesin" })).toEqual([]);
  });

  it("mengembalikan kosong jika tidak ada yang cocok", () => {
    expect(filterGlossaryTerms(sample, { query: "karburator" })).toEqual([]);
  });
});
