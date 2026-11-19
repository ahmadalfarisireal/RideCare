import { describe, expect, it } from "vitest";

import { getAllTutorials, getTutorialBySlug } from "@/data/tutorials";

const NEW_FIELDS = [
  "kenapaPerlu",
  "kapanDilakukan",
  "sebelumMulai",
  "alasanPerLangkah",
  "tandaBenar",
] as const;

const ENRICHED_SLUGS = [
  "cek-tekanan-ban",
  "cek-kampas-rem",
  "cek-aki-terminal",
  "cek-kebocoran-oli-bahan-bakar",
];

type BatchContent = {
  kenapaPerlu: string;
  kapanDilakukan: string;
  sebelumMulai: string[];
  alasanPerLangkah: string[];
  tandaBenar: string;
};

const BATCH_1_CONTENT: Record<string, BatchContent> = {
  "cek-kampas-rem": {
    kenapaPerlu:
      "Rem adalah bagian yang paling menentukan keselamatanmu. Kampas habis pelan-pelan tanpa terasa, dan baru terasa saat sudah terlambat, jadi melihatnya secara berkala memberi peringatan dini.",
    kapanDilakukan:
      "Cek secara berkala dan sebelum perjalanan jauh. Cek juga saat rem berbunyi atau terasa berbeda. Ikuti anjuran jadwal di buku manual motormu.",
    sebelumMulai: [
      "Senter",
      "Lap bersih",
      "Tempat datar dengan penerangan cukup",
      "Mesin mati dan motor stabil",
    ],
    alasanPerLangkah: [
      "Motor yang goyah bisa jatuh saat kamu membungkuk dan tanganmu dekat roda. Mesin yang mati menghindarkanmu dari bagian yang bergerak dan panas.",
      "Kampas ada di area yang gelap dan tersembunyi. Senter membuat ketebalannya terlihat tanpa membongkar apa pun, karena membongkar rem bukan untuk dikerjakan sendiri.",
      "Kampas menipis pelan-pelan. Lapisan yang sangat tipis atau permukaan yang tidak rata adalah tanda ia hampir habis, dan permukaan yang kotor atau berkerak bisa membuat rem berbunyi.",
      "Cairan atau kotoran berlebihan di sekitar rem bisa menandakan kebocoran minyak rem atau oli yang mengenai kampas. Keduanya membuat rem kurang pakem.",
      "Rasa tuas atau pedal memberi petunjuk tentang kondisi sistem rem yang tidak terlihat dari luar. Terlalu dalam, terlalu keras, atau empuk berarti ada yang perlu dicek bengkel.",
    ],
    tandaBenar:
      "Kampas terlihat masih memiliki lapisan yang jelas, permukaannya rata, tidak ada cairan atau kotoran berlebihan di sekitarnya, dan tuas atau pedal terasa seperti biasa. Kalau kamu ragu soal ketebalan kampas, anggap perlu dicek bengkel.",
  },
  "cek-aki-terminal": {
    kenapaPerlu:
      "Aki yang bermasalah sering terlihat dari luar sebelum motor benar-benar susah dihidupkan. Terminal berkarat atau kabel longgar juga penyebab umum starter lemah, dan mudah dikenali dengan mata.",
    kapanDilakukan:
      "Cek secara berkala, dan lebih sering kalau starter mulai terasa lemah atau lampu meredup. Ikuti anjuran perawatan di buku manual motormu.",
    sebelumMulai: [
      "Senter",
      "Lap kering",
      "Kunci kontak dalam keadaan mati",
      "Jauhkan rokok, api, dan percikan dari motor",
    ],
    alasanPerLangkah: [
      "Penerangan yang cukup membantu melihat karat yang halus. Motor yang mati dan stabil mengurangi risiko percikan listrik atau motor jatuh.",
      "Aki menyimpan listrik yang besar dan berisi bahan kimia. Melihat dari luar sudah cukup untuk menemukan tanda awal tanpa risiko.",
      "Karat membuat arus listrik sulit lewat, sehingga starter bisa terasa lemah walaupun aki sebenarnya masih berisi. Kabel yang longgar membuat gejalanya datang dan pergi.",
      "Aki yang retak, basah, atau membengkak menandakan kerusakan di dalamnya dan bisa berbahaya. Kondisi seperti itu perlu ditangani bengkel.",
      "Lap kering aman untuk debu ringan. Menyentuh atau menekan terminal bisa menggeser sambungan. Catatan temuanmu membantu mekanik mempersempit penyebab tanpa menebak.",
    ],
    tandaBenar:
      "Terminal terlihat bersih tanpa serbuk putih atau kehijauan, kabel terpasang rapat dan tidak terkelupas, dan bodi aki tidak retak, basah, atau menggembung. Debu ringan di bagian luar itu wajar.",
  },
  "cek-kebocoran-oli-bahan-bakar": {
    kenapaPerlu:
      "Kebocoran oli dan bensin sering mulai dari tetesan kecil. Oli yang menetes bisa membuat mesin kekurangan pelumas, dan bensin yang bocor berisiko terbakar. Menemukannya lebih awal sangat membantu.",
    kapanDilakukan:
      "Lihat saat kamu menemukan noda di tempat parkir, mencium bau oli atau bensin, atau merasa level oli cepat turun. Bisa juga dijadikan kebiasaan sebelum perjalanan jauh.",
    sebelumMulai: [
      "Senter",
      "Lap bersih",
      "Tempat terang dan berventilasi baik",
      "Mesin mati dan sudah dingin",
      "Jauhkan api, rokok, dan percikan",
    ],
    alasanPerLangkah: [
      "Tempat yang terang membuat noda dan tetesan terlihat. Ventilasi yang baik mengurangi uap bensin yang terhirup dan risiko menyala. Mesin yang mati dan dingin menghindarkanmu dari bagian yang panas.",
      "Kebocoran sering meninggalkan jejak lebih dulu berupa noda basah atau tetesan di tanah, sebelum terlihat jelas pada motor.",
      "Area sekitar mesin, selang, dan sambungan itu gelap. Senter membuat rembesan kecil terlihat dari luar, sementara membongkar bagian bensin berbahaya.",
      "Lokasi, warna, bau, dan waktu munculnya membantu mekanik menebak sumbernya, apakah oli, bensin, atau cairan lain, dan mencegah pembongkaran yang tidak perlu.",
      "Area yang bersih membuat rembesan baru terlihat jelas, jadi kamu tahu apakah masih bocor atau hanya noda lama. Bersihkan hanya area yang jauh dari sumber bocor supaya cairannya tidak tersebar.",
    ],
    tandaBenar:
      'Tidak ada noda basah baru, tetesan, atau bau bensin dan oli yang menyengat, dan area yang sudah dilap tetap kering saat dilihat lagi. Kalau ada yang basah atau berbau, jangan nyalakan mesin dulu dan baca bagian "Berhenti dan ke bengkel kalau".',
  },
};

describe("konten tutorial Tahap D", () => {
  it("hanya mengisi field baru pada empat tutorial yang ditentukan", () => {
    for (const slug of ENRICHED_SLUGS) {
      const enriched = getTutorialBySlug(slug);
      expect(enriched, `tutorial tidak ditemukan: ${slug}`).toBeDefined();

      for (const field of NEW_FIELDS) {
        expect(enriched![field], `field kosong: ${slug}.${field}`).toBeDefined();
      }
    }

    for (const tutorial of getAllTutorials()) {
      if (ENRICHED_SLUGS.includes(tutorial.slug)) continue;
      for (const field of NEW_FIELDS) {
        expect(tutorial[field], `field tidak boleh terisi: ${tutorial.slug}.${field}`).toBeUndefined();
      }
    }
  });

  it("memakai teks yang disetujui untuk kapanDilakukan", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.kapanDilakukan).toBe(
      "Cek secara berkala dan sebelum perjalanan jauh. Ikuti anjuran jadwal di buku manual motormu.",
    );
    expect(tutorial.kapanDilakukan).not.toContain("Seminggu sekali");
  });

  it("memakai teks kenapaPerlu dan tandaBenar dari sumber", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.kenapaPerlu).toBe(
      "Tekanan ban yang tepat membuat motor stabil, hemat, dan ban lebih awet. Ban kurang angin membuat motor terasa berat dan boros, serta lebih cepat aus di bagian tepinya.",
    );
    expect(tutorial.tandaBenar).toBe(
      "Semua langkah selesai. Kalau angkanya sudah sesuai anjuran, kamu beres.",
    );
  });

  it("memakai sebab dari STEPS prototipe untuk setiap langkah", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.alasanPerLangkah).toEqual([
      "Ban yang baru dipakai jauh menjadi hangat dan angkanya naik, jadi hasil ukur tidak akurat.",
      "Tiap motor berbeda, dan ban depan bisa berbeda dari ban belakang. Jangan memakai angka dari ingatan.",
      "Kalau miring, udara bocor dan angkanya tidak tepat.",
      "Terlalu keras atau terlalu lembek sama-sama membuat motor kurang stabil.",
      "Tutup melindungi pentil dari debu yang bisa membuat bocor halus.",
      "Cari benda tajam, retakan, atau benjolan. Kalau ada, hentikan dan ke bengkel.",
    ]);
    expect(tutorial.alasanPerLangkah).toHaveLength(tutorial.steps.length);
    expect(tutorial.sebelumMulai).toEqual([
      "Parkir di tempat datar, saat ban masih dingin",
      "Cari angka tekanan anjuran di stiker pada motor atau buku manual",
    ]);
  });

  it("tidak mengubah steps dan when_to_stop lama", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.steps).toHaveLength(6);
    expect(tutorial.steps[0]).toBe(
      "Parkirkan motor di tempat datar dan pastikan posisi motor stabil sebelum mulai.",
    );
    expect(tutorial.when_to_stop.length).toBeGreaterThan(0);
    expect(tutorial.when_to_stop).toContain(
      "Ban terlihat kempis parah, sobek, benjol, atau ada benda menancap di ban.",
    );
  });

  it("memakai teks persis dari tutorial-batch-1", () => {
    for (const [slug, expected] of Object.entries(BATCH_1_CONTENT)) {
      const tutorial = getTutorialBySlug(slug);
      expect(tutorial, `tutorial tidak ditemukan: ${slug}`).toBeDefined();

      expect(tutorial!.kenapaPerlu, `kenapaPerlu: ${slug}`).toBe(expected.kenapaPerlu);
      expect(tutorial!.kapanDilakukan, `kapanDilakukan: ${slug}`).toBe(expected.kapanDilakukan);
      expect(tutorial!.sebelumMulai, `sebelumMulai: ${slug}`).toEqual(expected.sebelumMulai);
      expect(tutorial!.alasanPerLangkah, `alasanPerLangkah: ${slug}`).toEqual(
        expected.alasanPerLangkah,
      );
      expect(tutorial!.tandaBenar, `tandaBenar: ${slug}`).toBe(expected.tandaBenar);
    }
  });

  it("memberi alasanPerLangkah sebanyak steps untuk semua tutorial yang memakainya", () => {
    for (const tutorial of getAllTutorials()) {
      if (tutorial.alasanPerLangkah === undefined) continue;
      expect(tutorial.alasanPerLangkah, `alasanPerLangkah: ${tutorial.slug}`).toHaveLength(
        tutorial.steps.length,
      );
    }
  });

  it("tidak memuat kata harga atau Rp pada field baru tutorial", () => {
    for (const tutorial of getAllTutorials()) {
      const texts = [
        tutorial.kenapaPerlu,
        tutorial.kapanDilakukan,
        tutorial.tandaBenar,
        ...(tutorial.sebelumMulai ?? []),
        ...(tutorial.alasanPerLangkah ?? []),
      ].filter((text): text is string => text !== undefined);

      for (const text of texts) {
        expect(text, `${tutorial.slug}: ${text}`).not.toMatch(/harga|\bRp\b/i);
      }
    }
  });
});
