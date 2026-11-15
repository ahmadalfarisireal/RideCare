import type { GlossaryCategory, GlossaryTerm } from "@/types/glossary";

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "busi",
    term: "Busi",
    definition:
      "Komponen kecil yang memercikkan api di ruang pembakaran. Percikan ini membantu campuran udara dan bahan bakar menyala agar mesin bisa hidup dan berjalan normal.",
    category: "mesin",
    related_components: ["Kabel busi", "Koil pengapian", "Ruang bakar"],
  },
  {
    id: "aki",
    term: "Aki",
    definition:
      "Penyimpan daya listrik pada motor. Aki membantu menyalakan mesin, menyalakan lampu, dan mendukung komponen kelistrikan lain.",
    category: "kelistrikan",
    related_components: ["Terminal aki", "Sekring", "Sistem pengisian"],
  },
  {
    id: "oli-mesin",
    term: "Oli mesin",
    definition:
      "Cairan pelumas yang membantu bagian-bagian mesin bergerak lebih halus. Oli juga membantu mengurangi panas dan keausan di dalam mesin.",
    category: "mesin",
    related_components: ["Mesin", "Filter oli (pada beberapa motor)", "Baut pembuangan oli"],
  },
  {
    id: "filter-udara",
    term: "Filter udara",
    definition:
      "Penyaring udara yang masuk ke mesin. Fungsinya menahan kotoran dan debu agar udara yang dipakai pembakaran lebih bersih.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Kotak filter", "Throttle body", "Karburator"],
  },
  {
    id: "rantai",
    term: "Rantai",
    definition:
      "Penghubung putaran dari mesin ke roda (pada motor berantai). Rantai yang bersih dan terawat membantu tenaga tersalur dengan baik.",
    category: "transmisi_dan_penggerak",
    related_components: ["Gir depan", "Gir belakang", "Pelumas rantai"],
  },
  {
    id: "kampas-rem",
    term: "Kampas rem",
    definition:
      "Bagian rem yang bergesekan untuk membantu memperlambat atau menghentikan motor. Jika kampas menipis, kemampuan pengereman bisa berkurang.",
    category: "pengereman",
    related_components: ["Cakram", "Tromol", "Tuas rem", "Pedal rem"],
  },
  {
    id: "karburator",
    term: "Karburator",
    definition:
      "Komponen pada sebagian motor bensin yang mencampur udara dan bahan bakar sebelum masuk ke mesin. Pengaturan dan kebersihannya memengaruhi jalannya mesin.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Filter udara", "Selang bahan bakar", "Setelan langsam"],
  },
  {
    id: "injector",
    term: "Injector",
    definition:
      "Komponen pada motor injeksi yang menyemprotkan bahan bakar dalam bentuk kabut halus. Semprotan yang tepat membantu pembakaran lebih baik.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Pompa bahan bakar", "Sensor", "Throttle body"],
  },
  {
    id: "throttle-body",
    term: "Throttle body",
    definition:
      "Bagian yang mengatur banyaknya udara masuk ke mesin saat gas diputar. Pada motor injeksi, throttle body bekerja bersama sensor dan injector.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Filter udara", "Injector", "Selang gas"],
  },
  {
    id: "cvt",
    term: "CVT",
    definition:
      "Sistem pemindah tenaga otomatis yang umum pada motor matik. CVT membantu motor menyesuaikan putaran agar terasa halus saat berjalan.",
    category: "transmisi_dan_penggerak",
    related_components: ["V-belt", "Roller", "Kampas ganda", "Puli"],
  },
  {
    id: "sistem-charging",
    term: "Sistem charging",
    definition:
      "Sistem pengisian daya listrik saat mesin hidup. Sistem ini membantu menjaga aki tetap terisi untuk kebutuhan kelistrikan motor.",
    category: "kelistrikan",
    related_components: ["Aki", "Kiprok/regulator", "Spul pengisian"],
  },
  {
    id: "sensor",
    term: "Sensor",
    definition:
      "Alat pendeteksi yang mengirim informasi ke sistem motor, misalnya tentang suhu, posisi, atau kondisi kerja mesin. Informasi ini membantu motor bekerja sesuai kebutuhan.",
    category: "kelistrikan",
    related_components: ["ECU", "Kabel kelistrikan", "Sistem injeksi"],
  },
  {
    id: "knalpot",
    term: "Knalpot",
    definition:
      "Saluran pembuangan gas hasil pembakaran dari mesin. Knalpot juga membantu meredam suara mesin.",
    category: "mesin",
    related_components: ["Leher knalpot", "Paking knalpot", "Ruang bakar"],
  },
  {
    id: "ban-dan-tekanan-angin",
    term: "Ban dan tekanan angin",
    definition:
      "Ban adalah bagian yang bersentuhan langsung dengan jalan. Tekanan angin yang sesuai anjuran pabrikan membantu motor stabil, nyaman, dan aman; lihat panduan pada stiker atau buku manual motor.",
    category: "roda_dan_rangka",
    related_components: ["Velg", "Pentil", "Suspensi"],
  },
  {
    id: "servis-rutin",
    term: "Servis rutin",
    definition:
      "Perawatan berkala untuk menjaga kondisi motor tetap baik. Biasanya meliputi pemeriksaan oli, rem, ban, kelistrikan, dan bagian penting lain sesuai kebutuhan motor.",
    category: "perawatan",
    related_components: ["Oli mesin", "Filter udara", "Rem", "Busi"],
  },
  {
    id: "tune-up",
    term: "Tune-up",
    definition:
      "Pemeriksaan dan penyetelan ringan agar kinerja mesin kembali baik. Cakupannya bisa berbeda tergantung kondisi dan jenis motor.",
    category: "perawatan",
    related_components: ["Busi", "Filter udara", "Sistem bahan bakar", "Setelan mesin"],
  },
  {
    id: "overhaul",
    term: "Overhaul",
    definition:
      "Perbaikan besar pada bagian mesin yang dilakukan saat ada masalah serius. Pekerjaan ini sebaiknya ditangani teknisi atau bengkel yang kompeten.",
    category: "perawatan",
    related_components: ["Mesin", "Komponen dalam mesin", "Paking dan seal"],
  },
];

export function getGlossaryCategories(): GlossaryCategory[] {
  return Array.from(new Set(glossaryTerms.map((item) => item.category)));
}
