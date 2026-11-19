import type { GlossaryCategory, GlossaryTerm } from "@/types/glossary";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface GlossaryFilter {
  query?: string;
  category?: GlossaryCategory | "semua";
}

export function filterGlossaryTerms(
  terms: GlossaryTerm[],
  filter: GlossaryFilter = {},
): GlossaryTerm[] {
  const query = normalize(filter.query ?? "");
  const category = filter.category ?? "semua";

  return terms.filter((term) => {
    if (category !== "semua" && term.category !== category) {
      return false;
    }
    if (!query) return true;

    const haystack = normalize(
      [
        term.term,
        term.definition,
        term.related_components.join(" "),
        term.categoryLabel ?? "",
        term.short ?? "",
        term.analogy ?? "",
        term.how ?? "",
        (term.signs ?? []).join(" "),
        term.ignored ?? "",
        term.diyWhy ?? "",
        (term.ask ?? []).join(" "),
      ].join(" "),
    );
    return haystack.includes(query);
  });
}
