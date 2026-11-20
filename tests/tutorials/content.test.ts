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
  "ganti-oli-mesin",
  "cek-ganti-busi",
  "perawatan-dasar-motor-listrik",
  "setel-rantai",
  "bersihkan-filter-udara",
  "cek-lampu-kelistrikan-dasar",
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

const BATCH_2_CONTENT: Record<string, BatchContent> = {
  "ganti-oli-mesin": {
    kenapaPerlu:
      "Oli melumasi bagian mesin yang bergerak dan membantu membuang panas. Seiring waktu oli kehilangan kemampuannya, jadi perlu diganti berkala supaya mesin tidak cepat aus.",
    kapanDilakukan:
      "Ganti sesuai jadwal dan jenis oli di buku manual motormu. Kalau pemakaianmu tergolong berat, tanyakan ke bengkel apakah jadwalnya perlu disesuaikan.",
    sebelumMulai: [
      "Oli baru dengan jenis dan takaran sesuai buku manual",
      "Wadah penampung oli bekas yang bisa ditutup",
      "Kunci yang sesuai untuk baut pembuangan",
      "Lap dan sarung tangan",
      "Corong, bila diperlukan",
      "Tempat datar, mesin dingin, dan motor stabil",
      "Rencana membuang oli bekas ke tempat yang menerima limbah oli",
    ],
    alasanPerLangkah: [
      "Jenis dan takaran oli yang sesuai manual menentukan hasilnya, dan oli yang salah bisa merugikan mesin. Mesin dingin mencegah luka bakar dari mesin dan oli panas, dan motor yang stabil mencegah roboh.",
      "Wadah yang tepat menangkap oli supaya tidak tumpah ke tanah atau komponen lain. Letak pembuangan oli berbeda tiap motor, jadi ikuti petunjuk manual.",
      "Membuka tutup pengisian membiarkan udara masuk, sehingga oli lama mengalir lancar dan keluar lebih tuntas.",
      "Oli bekas yang dibiarkan mengalir sampai habis ikut membawa kotoran halus keluar. Hindari kontak dengan kulit karena oli bekas bisa mengiritasi.",
      "Baut yang terlalu kencang bisa merusak ulirnya, sedangkan yang terlalu longgar membuat oli merembes. Ikuti manual, dan hentikan kalau kamu ragu.",
      "Mengisi bertahap sambil memeriksa level mencegah kelebihan atau kekurangan oli, dan keduanya bisa merugikan mesin.",
      "Tumpahan yang dibersihkan mencegah kamu salah mengira ada kebocoran, dan mengurangi bau serta risiko terbakar. Memastikan tidak ada tetesan sebelum mesin dinyalakan menghindarkan mesin bekerja tanpa cukup oli.",
    ],
    tandaBenar:
      "Level oli berada pada penanda yang dianjurkan di buku manual, tidak ada tetesan di sekitar baut pembuangan dan tutup pengisian, dan mesin menyala dengan suara normal tanpa lampu peringatan oli (kalau motormu punya). Oli bekas sudah kamu tampung untuk dibuang dengan benar.",
  },
  "cek-ganti-busi": {
    kenapaPerlu:
      "Busi memercikkan api yang menyalakan campuran bensin dan udara. Busi yang aus atau kotor membuat motor susah hidup, brebet, dan boros. Memeriksanya adalah salah satu perawatan rutin yang paling sering membantu.",
    kapanDilakukan:
      "Cek atau ganti sesuai jadwal di buku manual, dan juga saat motor susah hidup, brebet, atau terasa boros. Kalau busi tertutup bodi dan sulit dijangkau, serahkan ke bengkel.",
    sebelumMulai: [
      "Kunci busi yang sesuai ukuran",
      "Busi pengganti sesuai jenis di buku manual (bila perlu)",
      "Lap bersih",
      "Tempat datar, mesin mati dan dingin",
      "Kunci kontak dalam keadaan mati",
    ],
    alasanPerLangkah: [
      "Area busi ada di kepala mesin yang bisa sangat panas, jadi mesin harus dingin supaya kamu tidak terbakar. Motor yang stabil mencegah jatuh saat kamu bekerja.",
      "Cap busi menyambungkan listrik ke busi. Lepas dengan hati-hati supaya kabel dan karetnya tidak rusak.",
      "Kotoran yang jatuh ke lubang busi bisa masuk ke ruang bakar dan merusak mesin, jadi bersihkan dulu sebelum busi dibuka.",
      "Ulir di kepala mesin mudah rusak kalau busi dipaksa. Memperbaiki ulir bukan perawatan ringan, jadi berhenti kalau terasa seret.",
      "Kondisi ujung busi memberi petunjuk keadaan pembakaran, dan busi yang aus membuat percikan lemah. Pengganti harus sesuai manual karena jenis dan ukuran yang salah bisa tidak pas.",
      "Memasang dengan tangan dulu membuat ulir masuk lurus dan tidak menyilang. Kencangkan secukupnya sesuai manual, karena terlalu kencang merusak ulir dan terlalu longgar membuat panas dan gas bocor.",
      "Cap yang terpasang dengan benar menyambungkan listrik ke busi. Menyalakan mesin memastikan pemasangannya beres tanpa gangguan.",
    ],
    tandaBenar:
      "Busi terpasang lurus dan rapat dengan ulir tidak menyilang, cap busi terpasang kokoh, dan mesin menyala normal tanpa suara atau asap yang tidak biasa. Kalau mesin masih sulit hidup atau brebet, jangan diulang terus-menerus. Bawa ke bengkel.",
  },
  "perawatan-dasar-motor-listrik": {
    kenapaPerlu:
      "Motor listrik tidak memerlukan oli atau busi, tetapi bagian luarnya tetap butuh perhatian: ban, bodi, indikator, dan sambungan yang terlihat. Pengamatan rutin membuat tanda awal masalah cepat ketahuan, sementara komponen bertegangan tinggi tetap tugas teknisi.",
    kapanDilakukan:
      "Lakukan secara berkala dan sebelum perjalanan jauh. Ikuti jadwal perawatan dan petunjuk keselamatan di buku manual motormu.",
    sebelumMulai: [
      "Buku manual motor listrikmu",
      "Lap lembut dan bersih",
      "Tempat datar yang kering dan berventilasi baik",
      "Sistem motor dimatikan sesuai manual dan tidak sedang terhubung ke pengisi daya",
    ],
    alasanPerLangkah: [
      "Sistem listrik yang dimatikan dengan benar dan tidak sedang mengisi daya mengurangi risiko tersengat atau korsleting saat kamu membersihkan dan memeriksa.",
      "Air di soket dan celah kelistrikan bisa menimbulkan gangguan atau korsleting pada sistem bertegangan tinggi. Lap lembut sudah cukup untuk kebersihan bodi.",
      "Ban menentukan kestabilan dan jarak berhenti, seperti pada motor lain, dan bagian ini aman kamu periksa sendiri. Angka tekanan selalu dari stiker atau buku manual.",
      "Indikator panel adalah cara motor memberi tahu masalah yang tidak terlihat olehmu. Membaca tanpa mengubah pengaturan mencegah kamu salah setel.",
      "Retak, kendor, atau perubahan bentuk pada kabel luar, soket, dan bodi bisa menjadi tanda awal masalah pada sistem listrik. Cukup diamati dari luar karena bagian dalamnya berbahaya.",
    ],
    tandaBenar:
      "Bodi bersih tanpa retak atau bagian kendor, ban tanpa benda menancap dengan tekanan sesuai anjuran, indikator panel menampilkan tampilan normal, dan kabel serta soket luar terlihat utuh dan tidak berubah warna. Kalau ada yang janggal, jangan isi daya atau pakai motor dulu. Hubungi bengkel motor listrik.",
  },
};

const BATCH_3_CONTENT: Record<string, BatchContent> = {
  "setel-rantai": {
    kenapaPerlu:
      "Rantai yang terlalu kendor membuat motor menghentak dan bisa lepas dari gir. Rantai yang terlalu kencang membuat rantai, gir, dan bantalan roda cepat aus. Kekencangan yang tepat membuat tenaga tersalur halus dan komponennya awet.",
    kapanDilakukan:
      "Cek secara berkala sesuai buku manual, dan saat rantai terlihat terlalu kendor atau kencang, berbunyi, atau motor menghentak saat gas dibuka dan ditutup. Kalau kamu belum pernah menyetel rantai dan merasa tidak yakin, serahkan ke bengkel.",
    sebelumMulai: [
      "Buku manual motor (untuk kekencangan rantai dan cara mengencangkan pengunci roda)",
      "Kunci yang sesuai untuk pengunci roda dan penyetel rantai",
      "Lap bersih dan pelumas rantai",
      "Penopang motor yang stabil di tempat datar",
      "Tempat dengan penerangan cukup, mesin mati",
    ],
    alasanPerLangkah: [
      "Roda belakang akan digeser dan diputar. Motor yang goyah bisa jatuh dan melukai tanganmu yang dekat dengan rantai.",
      "Rantai yang bersih dan terlumasi lebih sedikit bergesekan, dan kondisi sebenarnya (kering, berkarat, kaku) lebih mudah dinilai setelah dibersihkan. Pelumas yang berlebihan mudah menempel debu, jadi cukup secukupnya.",
      "Kekencangan rantai berbeda tiap motor, jadi acuannya harus dari tanda pada motor atau buku manual, bukan perkiraan atau rasa di tangan.",
      "Roda belakang harus bisa bergeser supaya rantai bisa dikencangkan atau dikendurkan. Longgarkan secukupnya sesuai manual, karena pengunci yang terlalu longgar membuat roda bisa bergeser sendiri.",
      "Kedua sisi penyetel diatur seimbang supaya roda lurus sejajar dengan bodi. Roda yang miring membuat rantai aus tidak merata dan motor bisa terasa tidak stabil.",
      "Pengunci roda menahan roda pada motor, jadi harus dikencangkan sesuai panduan manual, dan terlalu longgar itu berbahaya. Menguji rem perlahan saat motor diam memastikan penyetelan tidak mengubah kerja rem belakang, karena posisinya bisa ikut berubah saat roda digeser.",
    ],
    tandaBenar:
      "Kekencangan rantai sesuai anjuran di buku manual, kedua sisi penyetel sejajar dengan tanda acuan, roda lurus dan berputar bebas tanpa tersangkut, dan tuas atau pedal rem terasa seperti biasa. Kalau salah satu tidak terpenuhi atau kamu ragu, jangan kendarai motor dan bawa ke bengkel.",
  },
  "bersihkan-filter-udara": {
    kenapaPerlu:
      "Filter udara menahan debu sebelum udara masuk ke mesin. Filter yang kotor membuat mesin sulit bernapas, sehingga tarikan terasa berat dan bensin boros. Filter yang rusak membiarkan debu masuk dan merugikan mesin.",
    kapanDilakukan:
      "Periksa sesuai jadwal di buku manual, dan lebih sering kalau kamu sering berkendara di jalan berdebu. Cek juga saat tarikan terasa berat atau motor terasa boros. Jenis filter (kertas atau busa) menentukan cara perawatannya, jadi ikuti buku manual.",
    sebelumMulai: [
      "Buku manual motor (letak rumah filter dan jenis filter)",
      "Alat yang sesuai untuk membuka penutup rumah filter",
      "Lap bersih dan kuas halus",
      "Wadah kecil untuk menyimpan baut",
      "Filter pengganti sesuai manual (bila perlu)",
      "Tempat terang dan berventilasi baik, mesin mati dan dingin",
    ],
    alasanPerLangkah: [
      "Mesin yang panas bisa membakar tanganmu, dan mesin yang menyala menyedot udara lewat saluran yang sedang terbuka. Mesin mati dan dingin mencegah keduanya, dan motor yang stabil mencegah jatuh.",
      "Letak dan cara membuka rumah filter berbeda tiap motor. Buku manual mencegahmu memaksa bagian yang salah.",
      "Penutup yang dibuka perlahan tidak merusak klip atau karetnya. Baut kecil yang disimpan di tempat aman tidak hilang dan tidak jatuh ke saluran udara.",
      "Mengeluarkan filter dengan hati-hati mencegah debu jatuh ke saluran yang menuju mesin. Kondisinya (berdebu, sobek, rusak) menentukan apakah cukup dibersihkan atau harus diganti.",
      "Debu kering paling aman dibersihkan dengan lembut. Bensin dan cairan keras bisa merusak bahan filter dan berbahaya karena mudah terbakar. Tekanan udara yang tinggi bisa merobek serat penyaring, dan filter yang robek meloloskan debu ke mesin.",
      "Filter yang rusak tidak lagi menyaring dengan baik. Penutup yang tidak rapat meloloskan debu lewat celahnya. Kalau kamu ragu cara membersihkan jenis filtermu, pasang pengganti yang sesuai manual.",
    ],
    tandaBenar:
      "Filter bersih dari debu tebal, tidak sobek atau rapuh, dan terpasang rapat bersama penutup rumahnya tanpa ada baut yang tertinggal. Setelah dipasang, mesin menyala seperti biasa. Kalau motor jadi sulit hidup atau brebet berat, periksakan ke bengkel.",
  },
  "cek-lampu-kelistrikan-dasar": {
    kenapaPerlu:
      "Lampu, sein, lampu rem, dan klakson menentukan apakah kamu terlihat dan terdengar oleh pengendara lain. Masalah kelistrikan juga sering terlihat lebih dulu lewat lampu yang redup atau berkedip, sebelum motor benar-benar bermasalah.",
    kapanDilakukan:
      "Cek secara berkala dan sebelum perjalanan jauh, terutama sebelum berkendara malam hari. Cek juga kalau lampu terlihat redup atau aki terasa cepat habis.",
    sebelumMulai: [
      "Buku manual motor (letak sekring yang terlihat, bila ada)",
      "Catatan sederhana atau ponsel untuk mencatat temuan",
      "Senter kecil (bila perlu)",
      "Tempat yang aman dan stabil dengan penerangan cukup",
    ],
    alasanPerLangkah: [
      "Motor yang stabil mencegah jatuh saat kamu bergerak di sekitarnya. Catatan sederhana membantumu tidak lupa fungsi mana yang sudah dicoba.",
      "Mencoba lampu satu per satu memudahkan menemukan yang mati. Lampu rem dan sein penting supaya pengendara lain tahu gerakanmu. Kalau mesin perlu dinyalakan, lakukan di tempat berventilasi baik.",
      "Lampu yang redup atau berkedip sering menjadi tanda awal masalah di aki, pengisian, atau sambungan, sebelum lampunya padam sama sekali. Indikator yang menyala tidak seperti biasa juga petunjuk.",
      "Kabel terkelupas, sambungan longgar, atau jejak hangus bisa menandakan masalah listrik yang berbahaya, tetapi bagian dalam kelistrikan tidak boleh disentuh atau dibuka sendiri. Sekring cukup dilihat dari luar, karena mencabut atau mengganti tanpa tahu penyebabnya bisa menutupi masalah atau menimbulkan risiko.",
      "Kunci kontak yang dimatikan menjaga aki tidak terkuras. Temuan yang spesifik (lampu mana, kapan, seperti apa) membantu mekanik mencari sumbernya tanpa menebak.",
    ],
    tandaBenar:
      "Semua lampu (utama, senja, sein, rem) dan klakson berfungsi, terang, dan tidak berkedip. Indikator panel menampilkan tampilan yang wajar, dan tidak ada kabel terkelupas, sambungan longgar, atau tanda hangus yang terlihat dari luar. Kalau ada yang tidak normal, catat dan sampaikan ke bengkel. Jangan memperbaikinya sendiri.",
  },
};

describe("konten tutorial Tahap D", () => {
  it("hanya mengisi field baru pada sepuluh tutorial yang ditentukan", () => {
    for (const slug of ENRICHED_SLUGS) {
      const enriched = getTutorialBySlug(slug);
      expect(enriched, `tutorial tidak ditemukan: ${slug}`).toBeDefined();

      for (const field of NEW_FIELDS) {
        expect(enriched![field], `field kosong: ${slug}.${field}`).toBeDefined();
      }
    }

    for (const tutorial of getAllTutorials()) {
      expect(ENRICHED_SLUGS, `slug di luar daftar: ${tutorial.slug}`).toContain(tutorial.slug);
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

  it("memakai teks persis dari tutorial-batch-2", () => {
    for (const [slug, expected] of Object.entries(BATCH_2_CONTENT)) {
      const tutorial = getTutorialBySlug(slug);
      expect(tutorial, `tutorial tidak ditemukan: ${slug}`).toBeDefined();

      expect(tutorial!.kenapaPerlu, `kenapaPerlu: ${slug}`).toBe(expected.kenapaPerlu);
      expect(tutorial!.kapanDilakukan, `kapanDilakukan: ${slug}`).toBe(expected.kapanDilakukan);
      expect(tutorial!.sebelumMulai, `sebelumMulai: ${slug}`).toEqual(expected.sebelumMulai);
      expect(tutorial!.alasanPerLangkah, `alasanPerLangkah: ${slug}`).toEqual(
        expected.alasanPerLangkah,
      );
      expect(tutorial!.tandaBenar, `tandaBenar: ${slug}`).toBe(expected.tandaBenar);
      expect(tutorial!.alasanPerLangkah).toHaveLength(tutorial!.steps.length);
    }
  });

  it("memakai teks persis dari tutorial-batch-3", () => {
    for (const [slug, expected] of Object.entries(BATCH_3_CONTENT)) {
      const tutorial = getTutorialBySlug(slug);
      expect(tutorial, `tutorial tidak ditemukan: ${slug}`).toBeDefined();

      expect(tutorial!.kenapaPerlu, `kenapaPerlu: ${slug}`).toBe(expected.kenapaPerlu);
      expect(tutorial!.kapanDilakukan, `kapanDilakukan: ${slug}`).toBe(expected.kapanDilakukan);
      expect(tutorial!.sebelumMulai, `sebelumMulai: ${slug}`).toEqual(expected.sebelumMulai);
      expect(tutorial!.alasanPerLangkah, `alasanPerLangkah: ${slug}`).toEqual(
        expected.alasanPerLangkah,
      );
      expect(tutorial!.tandaBenar, `tandaBenar: ${slug}`).toBe(expected.tandaBenar);
      expect(tutorial!.alasanPerLangkah).toHaveLength(tutorial!.steps.length);
    }
  });

  it("mengisi field baru pada tepat sepuluh tutorial", () => {
    const enriched = getAllTutorials().filter((tutorial) =>
      NEW_FIELDS.every((field) => tutorial[field] !== undefined),
    );
    expect(enriched).toHaveLength(10);
    expect(getTutorialBySlug("ganti-oli-mesin")!.alasanPerLangkah).toHaveLength(7);
    expect(getTutorialBySlug("cek-ganti-busi")!.alasanPerLangkah).toHaveLength(7);
    expect(getTutorialBySlug("perawatan-dasar-motor-listrik")!.alasanPerLangkah).toHaveLength(5);
    expect(getTutorialBySlug("setel-rantai")!.alasanPerLangkah).toHaveLength(6);
    expect(getTutorialBySlug("bersihkan-filter-udara")!.alasanPerLangkah).toHaveLength(6);
    expect(getTutorialBySlug("cek-lampu-kelistrikan-dasar")!.alasanPerLangkah).toHaveLength(5);
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
