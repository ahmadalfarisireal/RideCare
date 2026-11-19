import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { GlossaryView } from "@/components/glossary/glossary-view";
import { getGlossaryCategories, glossaryTerms } from "@/data/glossary";
import { filterGlossaryTerms } from "@/lib/glossary/search";
import { GLOSSARY_CATEGORY_LABELS } from "@/types/glossary";

const ORIGINAL_ENRICHED_IDS = [
  "busi",
  "aki",
  "cvt",
  "kampas-rem",
  "filter-udara",
  "oli-mesin",
];

const BATCH_1_IDS = [
  "rantai",
  "ban-dan-tekanan-angin",
  "knalpot",
  "injector",
  "karburator",
];

const ENRICHED_IDS = [...ORIGINAL_ENRICHED_IDS, ...BATCH_1_IDS];

const EXISTING_RELATED: Record<string, string[]> = {
  busi: ["filter-udara", "aki"],
  aki: ["busi"],
  cvt: ["oli-mesin"],
  "kampas-rem": [],
  "filter-udara": ["busi", "oli-mesin"],
  "oli-mesin": ["filter-udara"],
};

type BatchContent = {
  term: string;
  categoryLabel: string;
  short: string;
  analogy: string;
  how: string;
  signs: string[];
  ignored: string;
  diy: "boleh" | "hati" | "bengkel";
  diyWhy: string;
  ask: string[];
  related: string[];
};

const BATCH_1_CONTENT: Record<string, BatchContent> = {
  rantai: {
    term: "Rantai",
    categoryLabel: "Penggerak",
    short: "Rantai logam yang menyalurkan tenaga dari mesin ke roda belakang lewat gir (roda bergerigi) di depan dan belakang.",
    analogy: "Seperti rantai sepeda, hanya bekerja lebih keras. Kalau kering dan kendor, bunyinya berisik dan komponennya cepat aus.",
    how: "Mesin memutar gir depan, rantai menarik gir belakang, lalu roda ikut berputar. Rantai butuh pelumas dan kekencangan yang pas. Terlalu kendor membuat motor menghentak, terlalu kencang membuat rantai dan gir cepat aus. Motor matik tidak memakainya, penggantinya adalah CVT.",
    signs: [
      "Bunyi gemerincing atau berderak dari sisi roda belakang",
      "Rantai tampak kering, berkarat, atau kendor",
      "Motor menghentak saat gas dibuka lalu ditutup",
      "Gerigi gir tampak runcing atau tipis",
    ],
    ignored: "Rantai dan gir aus makin cepat, dan tenaga tersalur kurang halus. Dalam kasus terburuk rantai bisa lepas atau putus saat berkendara, dan itu berbahaya.",
    diy: "hati",
    diyWhy: "Kamu boleh melihat kondisi rantai dan memberinya pelumas sesuai buku manual. Menyetel kekencangan dan mengganti rantai atau gir sebaiknya di bengkel kalau belum terbiasa, dan lakukan saat motor mati dan dingin.",
    ask: [
      "Rantai dan gir diganti sepasang atau salah satu saja? Alasannya apa?",
      "Kekencangan rantai saya sudah sesuai anjuran buku manual?",
      "Apa tanda yang menunjukkan rantai saya memang sudah harus diganti?",
    ],
    related: ["cvt", "ban-dan-tekanan-angin"],
  },
  "ban-dan-tekanan-angin": {
    term: "Ban dan tekanan angin",
    categoryLabel: "Roda",
    short: "Satu-satunya bagian motor yang menyentuh jalan. Tekanan angin menentukan seberapa stabil dan aman motormu.",
    analogy: "Seperti sepatu yang kamu pakai berjalan. Terlalu longgar atau terlalu keras sama-sama membuat langkah tidak nyaman, dan solnya cepat habis.",
    how: "Ban menopang berat motor dan menyalurkan tenaga, pengereman, dan belokan ke aspal. Tekanan yang tepat membuat telapak ban menempel merata. Kurang angin membuat ban melar, tepinya cepat aus, dan motor terasa berat. Terlalu keras membuat bagian tengah cepat aus dan cengkeraman berkurang.",
    signs: [
      "Motor terasa berat atau oleng, terutama saat menikung",
      "Setang bergetar",
      "Telapak ban aus tidak merata",
      "Tekanan turun lagi dalam waktu singkat setelah diisi",
      "Ada retakan, benjolan, atau benda tajam menancap",
    ],
    ignored: "Ban lebih cepat aus, jarak berhenti lebih panjang, dan ban bisa bocor atau pecah mendadak.",
    diy: "boleh",
    diyWhy: "Mengecek tekanan dan melihat kondisi permukaan ban boleh dan dianjurkan, ikuti tutorial \"Mengecek tekanan ban\". Angka tekanan ada di stiker pada motor atau buku manual. Menambal, melepas, atau mengganti ban sebaiknya di bengkel.",
    ask: [
      "Ban saya masih layak dipakai? Boleh saya lihat tanda ausnya?",
      "Tekanan yang turun terus itu bocor di pentil, pelek, atau ban?",
      "Ban yang dipasang sesuai ukuran yang dianjurkan untuk motor saya?",
    ],
    related: ["kampas-rem"],
  },
  knalpot: {
    term: "Knalpot",
    categoryLabel: "Mesin",
    short: "Saluran buang yang mengalirkan gas sisa pembakaran keluar dan meredam suara mesin.",
    analogy: "Seperti cerobong asap sekaligus peredam suara. Kalau tersumbat atau bocor, mesin terasa tercekik atau suaranya jadi kasar.",
    how: "Gas panas hasil pembakaran keluar dari mesin lewat pipa knalpot menuju peredam, yang menurunkan bunyinya sebelum keluar. Di sebagian motor ada sensor atau komponen penyaring gas di jalur ini.",
    signs: [
      "Suara berubah jadi lebih keras atau pecah",
      "Bau gas buang menyengat di sekitar kaki",
      "Ada karat tembus atau lubang",
      "Bunyi kerincing dari dalam knalpot",
      "Asap pekat yang tidak biasa (misalnya putih tebal terus-menerus, kebiruan, atau hitam pekat), bisa jadi petunjuk masalah di mesin",
    ],
    ignored: "Tenaga turun, dan kebocoran gas buang tidak sehat dihirup. Asap yang tidak biasa bisa jadi petunjuk masalah yang lebih besar di mesin.",
    diy: "hati",
    diyWhy: "Kamu boleh melihat kondisi knalpot saat mesin sudah dingin. Jangan menyentuhnya saat mesin masih panas. Mengganti atau mengubah knalpot sebaiknya di bengkel, karena harus sesuai spesifikasi motor.",
    ask: [
      "Dari mana asal bunyi atau asapnya, knalpot atau mesin?",
      "Kalau knalpot diganti, apakah sesuai spesifikasi motor saya?",
      "Apakah ada komponen lain di jalur knalpot yang ikut perlu dicek?",
    ],
    related: ["busi", "oli-mesin"],
  },
  injector: {
    term: "Injector",
    categoryLabel: "Mesin",
    short: "Penyemprot kecil yang mengabutkan bensin ke dalam mesin pada motor injeksi, diatur oleh komputer motor.",
    analogy: "Seperti semprotan parfum yang diatur otomatis. Jumlah dan waktunya dihitung komputer, bukan dituang sembarangan.",
    how: "Pompa bensin mengalirkan bensin bertekanan ke injector. Komputer motor (ECU) membuka injector sesaat dengan lama berbeda sesuai tarikan gas dan data sensor. Kalau injector kotor atau tersumbat, kabut bensinnya tidak rata dan pembakaran jadi kurang baik.",
    signs: [
      "Brebet atau tersendat saat digas",
      "Susah hidup atau putaran idle tidak stabil",
      "Tarikan terasa berat dan bensin terasa lebih boros",
    ],
    ignored: "Mesin bekerja tidak efisien dan kondisinya bisa membebani komponen lain. Gejalanya mirip masalah busi atau filter udara, jadi penyebabnya perlu dipastikan.",
    diy: "bengkel",
    diyWhy: "Sistem bensin bertekanan dan mudah terbakar. Jangan dibongkar sendiri.",
    ask: [
      "Apa bukti bahwa injector yang bermasalah, bukan busi atau filter udara?",
      "Injector sudah dites atau dibersihkan dulu, atau langsung diganti?",
      "Kalau sudah ditangani dan belum membaik, langkah berikutnya apa?",
    ],
    related: ["filter-udara", "karburator", "busi"],
  },
  karburator: {
    term: "Karburator",
    categoryLabel: "Mesin",
    short: "Komponen di motor lama yang mencampur bensin dan udara secara mekanis sebelum masuk ke mesin.",
    analogy: "Seperti pencampur minuman manual. Takarannya diatur lewat setelan, tidak ada komputer yang menyesuaikannya otomatis.",
    how: "Aliran udara yang masuk menyedot bensin lewat lubang-lubang kecil (jet) lalu mencampurnya. Lubang kecil itu mudah tersumbat kotoran, dan setelan campuran memengaruhi napas mesin.",
    signs: [
      "Susah hidup, terutama saat mesin dingin",
      "Brebet atau tersendat saat digas",
      "Mesin mati sendiri saat idle",
      "Bensin merembes atau menetes dari area karburator, perlu ditangani segera",
    ],
    ignored: "Mesin tidak nyaman dan boros. Bensin yang merembes berisiko terbakar.",
    diy: "bengkel",
    diyWhy: "Karburator berhubungan langsung dengan bensin dan setelannya halus. Bongkar sendiri berisiko merusak setelan dan menimbulkan kebocoran.",
    ask: [
      "Karburator saya dibersihkan atau diganti? Apa buktinya kotor?",
      "Setelan idle dan campuran sudah disesuaikan?",
      "Ada tanda bensin merembes yang perlu diperbaiki sekalian?",
    ],
    related: ["injector", "filter-udara", "busi"],
  },
};

describe("konten kamus baru", () => {
  it("hanya memperkaya sebelas istilah yang ditentukan", () => {
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

  it("memakai teks persis dari kamus batch 1", () => {
    for (const [id, expected] of Object.entries(BATCH_1_CONTENT)) {
      const term = glossaryTerms.find((item) => item.id === id);
      expect(term, `istilah tidak ditemukan: ${id}`).toBeDefined();

      expect(term?.term, `term: ${id}`).toBe(expected.term);
      expect(term?.categoryLabel, `categoryLabel: ${id}`).toBe(expected.categoryLabel);
      expect(term?.short, `short: ${id}`).toBe(expected.short);
      expect(term?.analogy, `analogy: ${id}`).toBe(expected.analogy);
      expect(term?.how, `how: ${id}`).toBe(expected.how);
      expect(term?.signs, `signs: ${id}`).toEqual(expected.signs);
      expect(term?.ignored, `ignored: ${id}`).toBe(expected.ignored);
      expect(term?.diy, `diy: ${id}`).toBe(expected.diy);
      expect(term?.diyWhy, `diyWhy: ${id}`).toBe(expected.diyWhy);
      expect(term?.ask, `ask: ${id}`).toEqual(expected.ask);
      expect(term?.related, `related: ${id}`).toEqual(expected.related);
    }
  });

  it("mempertahankan id dan related enam istilah sebelumnya", () => {
    for (const [id, related] of Object.entries(EXISTING_RELATED)) {
      expect(glossaryTerms.find((term) => term.id === id)?.related, `related: ${id}`).toEqual(
        related,
      );
    }
  });

  it("semua id related merujuk ke istilah yang ada", () => {
    const ids = new Set(glossaryTerms.map((term) => term.id));

    for (const term of glossaryTerms) {
      for (const relatedId of term.related ?? []) {
        expect(ids.has(relatedId), `${term.id} -> ${relatedId}`).toBe(true);
      }
    }
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
    expect(levelById.get("rantai")).toBe("hati");
    expect(levelById.get("ban-dan-tekanan-angin")).toBe("boleh");
    expect(levelById.get("knalpot")).toBe("hati");
    expect(levelById.get("injector")).toBe("bengkel");
    expect(levelById.get("karburator")).toBe("bengkel");

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

  it("menampilkan kategori Roda sebagai filter otomatis", () => {
    const ban = glossaryTerms.find((term) => term.id === "ban-dan-tekanan-angin");
    expect(ban?.category).toBe("roda");
    expect(ban?.categoryLabel).toBe("Roda");
    expect(GLOSSARY_CATEGORY_LABELS.roda).toBe("Roda");
    expect(getGlossaryCategories()).toContain("roda");

    const html = renderToStaticMarkup(createElement(GlossaryView));
    expect(html).toContain(">Roda</button>");
  });
});
