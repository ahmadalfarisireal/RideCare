import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { GlossaryCard } from "@/components/glossary/glossary-card";
import { glossaryTerms } from "@/data/glossary";

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
    const sistemCharging = glossaryTerms.find((term) => term.id === "sistem-charging");
    expect(sistemCharging).toBeDefined();
    const html = renderToStaticMarkup(<GlossaryCard term={sistemCharging!} relatedTerms={[]} />);

    expect(html).toContain("Sistem charging");
    expect(html).toContain("Penjelasan");
    expect(html).toContain("Komponen terkait");
    expect(html).not.toContain("Bayangkan begini");
  });
});
