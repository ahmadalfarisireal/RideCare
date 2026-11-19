export type GlossaryCategory =
  | "mesin"
  | "kelistrikan"
  | "pengereman"
  | "roda_dan_rangka"
  | "bahan_bakar_dan_udara"
  | "transmisi_dan_penggerak"
  | "perawatan";

export type GlossaryDiy = "boleh" | "hati" | "bengkel";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: GlossaryCategory;
  related_components: string[];
  categoryLabel?: string;
  short?: string;
  analogy?: string;
  how?: string;
  signs?: string[];
  ignored?: string;
  diy?: GlossaryDiy;
  diyWhy?: string;
  ask?: string[];
  related?: string[];
}

export const GLOSSARY_DIY_LABELS: Record<GlossaryDiy, string> = {
  boleh: "Boleh",
  hati: "Hati-hati",
  bengkel: "Bengkel saja",
};

export const GLOSSARY_CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  mesin: "Mesin",
  kelistrikan: "Kelistrikan",
  pengereman: "Pengereman",
  roda_dan_rangka: "Roda & Rangka",
  bahan_bakar_dan_udara: "Bahan Bakar & Udara",
  transmisi_dan_penggerak: "Transmisi & Penggerak",
  perawatan: "Perawatan",
};
