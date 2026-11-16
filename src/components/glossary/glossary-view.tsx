"use client";

import { useMemo, useState } from "react";

import { glossaryTerms } from "@/data/glossary";
import { filterGlossaryTerms } from "@/lib/glossary/search";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GLOSSARY_CATEGORY_LABELS, type GlossaryCategory } from "@/types/glossary";

type CategoryFilter = "semua" | GlossaryCategory;

const CATEGORIES: CategoryFilter[] = [
  "semua",
  "mesin",
  "kelistrikan",
  "pengereman",
  "roda_dan_rangka",
  "bahan_bakar_dan_udara",
  "transmisi_dan_penggerak",
  "perawatan",
];

function categoryLabel(category: CategoryFilter): string {
  if (category === "semua") return "Semua";
  return GLOSSARY_CATEGORY_LABELS[category];
}

export function GlossaryView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("semua");

  const results = useMemo(
    () => filterGlossaryTerms(glossaryTerms, { query, category }),
    [query, category],
  );

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
          placeholder="Contoh: busi, aki, CVT"
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Kategori</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {CATEGORIES.map((item) => {
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
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted">
              Istilah tidak ditemukan. Coba kata lain atau pilih kategori &quot;Semua&quot;.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {results.map((item) => (
            <Card key={item.id} id={`term-${item.id}`} className="scroll-mt-24">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle>{item.term}</CardTitle>
                  <Badge variant="outline">{GLOSSARY_CATEGORY_LABELS[item.category]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-foreground">{item.definition}</p>
                {item.related_components.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      Komponen terkait
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.related_components.map((component) => (
                        <Badge key={component} variant="default">
                          {component}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
