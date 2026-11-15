export type GlossaryCategory =
  | "mesin"
  | "kelistrikan"
  | "pengereman"
  | "roda_dan_rangka"
  | "bahan_bakar_dan_udara"
  | "transmisi_dan_penggerak"
  | "perawatan";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: GlossaryCategory;
  related_components: string[];
}

export const GLOSSARY_CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  mesin: "Mesin",
  kelistrikan: "Kelistrikan",
  pengereman: "Pengereman",
  roda_dan_rangka: "Roda & Rangka",
  bahan_bakar_dan_udara: "Bahan Bakar & Udara",
  transmisi_dan_penggerak: "Transmisi & Penggerak",
  perawatan: "Perawatan",
};
