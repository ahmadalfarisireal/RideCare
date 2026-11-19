"use client";

import { useEffect, useMemo, useState } from "react";

import { getGlossaryCategories, glossaryTerms } from "@/data/glossary";
import { filterGlossaryTerms } from "@/lib/glossary/search";
import { GlossaryCard } from "@/components/glossary/glossary-card";
import { Input } from "@/components/ui/input";
import { GLOSSARY_CATEGORY_LABELS, type GlossaryCategory, type GlossaryTerm } from "@/types/glossary";

type CategoryFilter = "semua" | GlossaryCategory;

function categoryLabel(category: CategoryFilter): string {
  if (category === "semua") return "Semua";
  return GLOSSARY_CATEGORY_LABELS[category];
}

export function GlossaryView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("semua");
  const [pendingOpen, setPendingOpen] = useState<{ id: string; nonce: number } | null>(null);

  const termsById = useMemo(
    () => new Map(glossaryTerms.map((term) => [term.id, term])),
    [],
  );

  const categories = useMemo<CategoryFilter[]>(
    () => ["semua", ...getGlossaryCategories()],
    [],
  );

  const results = useMemo(
    () => filterGlossaryTerms(glossaryTerms, { query, category }),
    [query, category],
  );

  useEffect(() => {
    if (!pendingOpen) return;
    const node = document.getElementById(`term-${pendingOpen.id}`);
    if (!(node instanceof HTMLDetailsElement)) return;

    node.open = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  }, [pendingOpen, results]);

  const openRelated = (id: string) => {
    setQuery("");
    setCategory("semua");
    setPendingOpen((current) => ({ id, nonce: (current?.nonce ?? 0) + 1 }));
  };

  const relatedTermsFor = (term: GlossaryTerm): GlossaryTerm[] =>
    (term.related ?? [])
      .map((id) => termsById.get(id))
      .filter((related): related is GlossaryTerm => related !== undefined);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="glossary-search" className="block text-sm font-medium text-foreground">
          Cari istilah
        </label>
        <Input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: busi, aki, rem, CVT"
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Kategori</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {categories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={selected}
                className={`inline-flex min-h-10 items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-surface text-foreground hover:border-accent/50 hover:bg-surface-2"
                }`}
              >
                {categoryLabel(item)}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted">
        Menampilkan {results.length} dari {glossaryTerms.length} istilah.
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">
            Istilah tidak ditemukan. Coba kata lain atau pilih kategori &quot;Semua&quot;.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {results.map((item) => (
            <GlossaryCard
              key={item.id}
              term={item}
              relatedTerms={relatedTermsFor(item)}
              onOpenRelated={openRelated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
