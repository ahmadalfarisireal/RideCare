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

const BATCH_2_IDS = [
  "throttle-body",
  "sistem-charging",
  "sensor",
  "servis-rutin",
  "tune-up",
  "overhaul",
];

const ENRICHED_IDS = [...ORIGINAL_ENRICHED_IDS, ...BATCH_1_IDS, ...BATCH_2_IDS];

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

const BATCH_2_CONTENT: Record<string, BatchContent> = {
  "throttle-body": {
    term: "Throttle body",
    categoryLabel: "Mesin",
    short: "Katup pengatur udara yang masuk ke mesin pada motor injeksi, dibuka lewat tarikan gas.",
    analogy: "Seperti keran udara. Makin lebar dibuka, makin banyak udara yang mengalir ke mesin.",
    how: "Saat gas ditarik, katup di dalam throttle body membuka dan udara mengalir ke mesin. Sensor memberi tahu komputer motor seberapa lebar bukaannya, lalu komputer mengatur bensin yang disemprotkan. Kerak dan kotoran bisa menumpuk di sekitar katup dan mengganggu aliran udara yang halus, terutama saat idle.",
    signs: [
      "Putaran idle naik turun atau tidak stabil",
      "Mesin mati sendiri saat berhenti",
      "Respons gas terasa terlambat atau menyentak",
      "Susah hidup, terutama saat mesin dingin",
    ],
    ignored: "Motor jadi tidak nyaman dan mudah mati di lampu merah. Gejalanya mirip masalah lain, jadi penyebabnya perlu dipastikan.",
    diy: "bengkel",
    diyWhy: "Throttle body bagian dari sistem mesin dan injeksi, dan sensornya halus. Membersihkan dengan cara yang salah bisa merusak sensor atau mengacaukan setelannya.",
    ask: [
      "Apa bukti throttle body yang bermasalah, bukan busi atau filter udara?",
      "Dibersihkan dengan cara yang sesuai motor saya? Perlu diatur ulang setelahnya?",
      "Kalau belum membaik, pemeriksaan berikutnya apa?",
    ],
    related: ["injector", "sensor", "filter-udara"],
  },
  "sistem-charging": {
    term: "Sistem charging",
    categoryLabel: "Kelistrikan",
    short: "Rangkaian yang membuat listrik saat mesin hidup dan mengisi aki: generator dan pengatur tegangan (sering disebut kiprok).",
    analogy: "Seperti pembangkit listrik mini di motormu. Aki hanya penampung. Kalau pembangkitnya lemah, penampungnya terus terkuras.",
    how: "Saat mesin berputar, generator menghasilkan listrik. Pengatur tegangan menjaga tegangannya tetap aman sebelum dialirkan ke lampu dan aki. Kalau generator lemah atau pengatur tegangan bermasalah, aki tidak terisi dengan baik, atau malah terisi berlebihan.",
    signs: [
      "Lampu redup, terutama saat idle, lalu terang lagi saat gas ditarik",
      "Aki cepat habis walau baru diganti",
      "Klakson lemah",
      "Lampu terlalu terang atau sering putus, bisa jadi tanda pengisian berlebih",
    ],
    ignored: "Aki terus terkuras dan motor bisa mati mendadak di jalan. Komponen listrik lain ikut terganggu.",
    diy: "bengkel",
    diyWhy: "Ini bagian kelistrikan utama. Kamu boleh memperhatikan gejalanya, seperti lampu redup atau aki cepat habis, tetapi pengukuran dan penggantiannya harus di bengkel.",
    ask: [
      "Tegangan pengisian saat mesin hidup sudah diukur? Hasilnya bagaimana?",
      "Yang bermasalah generatornya atau pengatur tegangannya?",
      "Setelah pengisian diperbaiki, akinya perlu diganti juga atau cukup diisi ulang?",
    ],
    related: ["aki"],
  },
  sensor: {
    term: "Sensor",
    categoryLabel: "Kelistrikan",
    short: "Komponen kecil yang membaca kondisi motor, misalnya posisi gas, suhu, atau putaran mesin, lalu melaporkannya ke komputer motor.",
    analogy: "Seperti indra untuk motor. Komputer motor tidak bisa melihat atau merasakan sendiri, ia hanya tahu apa yang dilaporkan sensor.",
    how: "Pada motor injeksi, komputer motor memakai data sensor untuk mengatur jumlah bensin dan waktu pengapian. Kalau satu sensor memberi data yang keliru, komputer ikut keliru, walaupun komponen lain sehat.",
    signs: [
      "Lampu indikator mesin menyala (kalau motormu punya)",
      "Brebet atau putaran idle tidak stabil",
      "Bensin terasa boros tanpa sebab yang jelas",
      "Susah hidup, atau mesin mati di waktu yang tidak menentu",
    ],
    ignored: "Mesin bekerja dengan pengaturan yang salah, jadi tenaga turun dan boros. Sensor yang keliru juga bisa menyamarkan penyebab masalah yang sebenarnya.",
    diy: "bengkel",
    diyWhy: "Sensor perlu diperiksa dengan alat diagnosis. Menebak lalu mengganti sensor satu per satu tanpa membaca datanya hanya membuang waktu.",
    ask: [
      "Ada kode kesalahan yang terbaca dari komputer motor? Kodenya apa?",
      "Apa bukti sensor yang rusak, bukan kabel atau sambungannya?",
      "Sensor sudah dites dulu sebelum diganti?",
    ],
    related: ["throttle-body", "injector"],
  },
  "servis-rutin": {
    term: "Servis rutin",
    categoryLabel: "Perawatan",
    short: "Pemeriksaan dan perawatan berkala sesuai jadwal di buku manual, sebelum ada yang rusak.",
    analogy: "Seperti cek kesehatan berkala. Tujuannya menemukan masalah kecil sebelum jadi besar.",
    how: "Mekanik memeriksa dan merawat bagian yang aus pelan-pelan, seperti oli, filter, busi, rantai, rem, ban, dan aki, lalu menyetelnya. Isinya bergantung pada tipe motor dan jadwal di buku manual.",
    signs: [
      "Sudah mencapai jadwal servis di buku manual (jarak tempuh atau waktu)",
      "Motor terasa berbeda: tarikan berat, boros, atau ada bunyi baru",
      "Sudah lama tidak diperiksa sama sekali",
    ],
    ignored: "Bagian yang mulai aus tidak terdeteksi sampai benar-benar bermasalah, dan perbaikannya bisa jadi lebih besar.",
    diy: "hati",
    diyWhy: "Sebagian bisa kamu lakukan sendiri, seperti mengecek tekanan ban, melihat level oli, dan melihat kondisi rantai. Pemeriksaan menyeluruh, terutama rem, bensin, dan kelistrikan, sebaiknya di bengkel.",
    ask: [
      "Apa saja yang diperiksa dan diganti pada servis ini? Boleh saya lihat daftarnya?",
      "Mana yang perlu dikerjakan sekarang, mana yang bisa ditunda, dan kenapa?",
      "Kalau ada komponen yang diganti, boleh saya lihat komponen lamanya?",
    ],
    related: ["oli-mesin", "filter-udara", "busi", "tune-up"],
  },
  "tune-up": {
    term: "Tune-up",
    categoryLabel: "Perawatan",
    short: "Pemeriksaan dan penyetelan mesin untuk mengembalikan kinerja pembakarannya.",
    analogy: "Seperti menyetel gitar. Alatnya masih sehat, tetapi nadanya perlu dirapikan supaya enak lagi.",
    how: "Mekanik memeriksa dan menyetel bagian yang memengaruhi pembakaran, misalnya busi, filter udara, dan setelan idle atau campuran, serta membersihkan saluran bensin dan udara. Isinya berbeda antar bengkel dan tipe motor, jadi tanyakan apa saja yang dikerjakan.",
    signs: [
      "Tarikan terasa berat dan bensin terasa lebih boros",
      "Susah hidup atau idle terasa kasar",
      "Brebet ringan",
      "Sudah lama tidak diservis",
    ],
    ignored: "Pembakaran makin tidak efisien dan gejala ringan makin sering muncul. Tune-up bukan obat untuk semua masalah. Gejala berat tetap perlu diagnosis.",
    diy: "bengkel",
    diyWhy: "Tune-up menyentuh pengapian dan sistem bensin, jadi dikerjakan di bengkel. Kamu boleh membantu dengan mengecek hal ringan seperti filter udara dan busi lewat tutorial kalau motormu mudah dijangkau.",
    ask: [
      "Apa saja yang termasuk dalam tune-up ini? Boleh saya lihat daftar pekerjaannya?",
      "Keluhan saya diharapkan membaik karena bagian yang mana?",
      "Kalau setelah tune-up keluhan belum hilang, pemeriksaan berikutnya apa?",
    ],
    related: ["servis-rutin", "busi", "filter-udara", "overhaul"],
  },
  overhaul: {
    term: "Overhaul",
    categoryLabel: "Perawatan",
    short: "Pembongkaran mesin secara menyeluruh untuk memeriksa dan mengganti bagian dalam yang aus atau rusak.",
    analogy: "Seperti operasi besar. Bukan perawatan biasa, melainkan pemeriksaan dan perbaikan bagian dalam yang tidak terjangkau dari luar.",
    how: "Mesin dibongkar sampai bagian dalamnya, seperti piston, silinder, dan klep, diperiksa dan diukur. Bagian yang aus diganti, lalu semuanya dirakit ulang. Biasanya dilakukan kalau ada kerusakan di dalam mesin, bukan untuk gejala ringan.",
    signs: [
      "Tenaga turun drastis dan tidak membaik setelah perawatan biasa",
      "Asap tebal yang muncul terus-menerus",
      "Bunyi kasar dari dalam mesin",
      "Oli cepat berkurang tanpa bocor yang terlihat",
    ],
    ignored: "Kerusakan di dalam mesin bisa makin parah. Karena overhaul keputusan besar, minta penjelasan tertulis dan bukti kerusakan sebelum menyetujuinya.",
    diy: "bengkel",
    diyWhy: "Overhaul melibatkan pembongkaran mesin dan pengukuran yang presisi. Tidak untuk dikerjakan sendiri.",
    ask: [
      "Apa bukti bagian dalam mesin yang rusak? Boleh saya lihat?",
      "Ada opsi perbaikan yang lebih ringan sebelum overhaul?",
      "Komponen apa yang diganti dan alasannya? Boleh saya minta komponen lamanya dikembalikan?",
      "Mohon rincian pekerjaannya secara tertulis sebelum dimulai.",
    ],
    related: ["tune-up", "servis-rutin", "oli-mesin"],
  },
};

describe("konten kamus baru", () => {
  it("hanya memperkaya tujuh belas istilah yang ditentukan", () => {
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

  it("memakai teks persis dari kamus batch 2", () => {
    for (const [id, expected] of Object.entries(BATCH_2_CONTENT)) {
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
    expect(levelById.get("throttle-body")).toBe("bengkel");
    expect(levelById.get("sistem-charging")).toBe("bengkel");
    expect(levelById.get("sensor")).toBe("bengkel");
    expect(levelById.get("servis-rutin")).toBe("hati");
    expect(levelById.get("tune-up")).toBe("bengkel");
    expect(levelById.get("overhaul")).toBe("bengkel");

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

  it("menampilkan kategori Roda dan Perawatan sebagai filter otomatis", () => {
    const ban = glossaryTerms.find((term) => term.id === "ban-dan-tekanan-angin");
    expect(ban?.category).toBe("roda");
    expect(ban?.categoryLabel).toBe("Roda");
    expect(GLOSSARY_CATEGORY_LABELS.roda).toBe("Roda");
    expect(GLOSSARY_CATEGORY_LABELS.perawatan).toBe("Perawatan");
    expect(getGlossaryCategories()).toContain("roda");
    expect(getGlossaryCategories()).toContain("perawatan");

    const html = renderToStaticMarkup(createElement(GlossaryView));
    expect(html).toContain(">Roda</button>");
    expect(html).toContain(">Perawatan</button>");
  });
});
