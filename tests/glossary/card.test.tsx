import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { GlossaryCard } from "@/components/glossary/glossary-card";
import { glossaryTerms } from "@/data/glossary";
import type { GlossaryTerm } from "@/types/glossary";

describe("GlossaryCard", () => {
  it("menampilkan detail dan meter untuk istilah dengan konten baru", () => {
    const busi = glossaryTerms.find((term) => term.id === "busi");
    expect(busi).toBeDefined();
    const html = renderToStaticMarkup(<GlossaryCard term={busi!} relatedTerms={[]} />);

    expect(html).toContain("Busi");
    expect(html).toContain("Bayangkan begini");
    expect(html).toContain("Tanda-tanda bermasalah");
    expect(html).toContain('aria-label="Boleh dicek sendiri: Hati-hati"');
    expect(html).toContain("Kondisi busi saya seperti apa? Boleh saya lihat?");
  });

  it("tetap menampilkan istilah lama tanpa field baru", () => {
    const legacyTerm: GlossaryTerm = {
      id: "legacy-term",
      term: "Istilah lama",
      definition: "Definisi lama tanpa field tambahan.",
      category: "perawatan",
      related_components: ["Komponen lama"],
    };
    const html = renderToStaticMarkup(<GlossaryCard term={legacyTerm} relatedTerms={[]} />);

    expect(html).toContain("Istilah lama");
    expect(html).toContain("Penjelasan");
    expect(html).toContain("Komponen terkait");
    expect(html).toContain("Komponen lama");
    expect(html).not.toContain("Bayangkan begini");
  });
});
