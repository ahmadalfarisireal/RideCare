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

  it("menampilkan lencana DIY pada kartu yang masih tertutup", () => {
    const busi = glossaryTerms.find((term) => term.id === "busi");
    const kampasRem = glossaryTerms.find((term) => term.id === "kampas-rem");
    expect(busi).toBeDefined();
    expect(kampasRem).toBeDefined();

    const busiHtml = renderToStaticMarkup(
      <GlossaryCard term={busi!} relatedTerms={[]} />,
    );
    const remHtml = renderToStaticMarkup(
      <GlossaryCard term={kampasRem!} relatedTerms={[]} />,
    );

    expect(busiHtml).toMatch(/bg-warning text-on-sem[^>]*>Hati-hati</);
    expect(remHtml).toMatch(/bg-danger text-on-sem[^>]*>Bengkel saja</);
    expect(remHtml).not.toMatch(/bg-safe text-on-sem[^>]*>Boleh dicek</);
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
    expect(html).not.toMatch(
      /bg-safe text-on-sem|bg-warning text-on-sem|bg-danger text-on-sem/,
    );
  });
});
