import type { GlossaryCategory, GlossaryTerm } from "@/types/glossary";

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "busi",
    term: "Busi",
    definition:
      "Komponen kecil yang memercikkan api di ruang pembakaran. Percikan ini membantu campuran udara dan bahan bakar menyala agar mesin bisa hidup dan berjalan normal.",
    category: "mesin",
    related_components: ["Kabel busi", "Koil pengapian", "Ruang bakar"],
    categoryLabel: "Mesin",
    short: "Komponen kecil yang memercikkan api di dalam mesin supaya bensin bisa terbakar.",
    analogy:
      "Busi itu seperti korek api untuk mesin. Tanpa percikan yang kuat, campuran bensin dan udara tidak menyala dengan baik.",
    how: "Setiap kali mesin berputar, busi memercikkan api ratusan sampai ribuan kali per menit. Seiring waktu ujungnya aus dan celah percikannya melebar, sehingga percikan jadi lemah atau tidak teratur.",
    signs: [
      "Susah hidup, terutama pagi atau saat mesin dingin",
      "Mesin brebet (tersendat) saat digas",
      "Tarikan terasa berat dan bensin terasa lebih boros",
    ],
    ignored:
      "Pembakaran tidak sempurna. Tenaga turun, mesin lebih cepat kotor, dan motor makin sering sulit dihidupkan.",
    diy: "hati",
    diyWhy:
      "Di sebagian motor busi mudah dijangkau, di sebagian lain tertutup bodi. Ikuti buku manual, dan serahkan ke bengkel kalau bodi harus dibongkar.",
    ask: [
      "Kondisi busi saya seperti apa? Boleh saya lihat?",
      "Kalau busi diganti, keluhan saya diharapkan berubah seperti apa?",
      "Kalau busi baru pun belum membantu, kemungkinan penyebab lainnya apa?",
    ],
    related: ["filter-udara", "aki"],
  },
  {
    id: "aki",
    term: "Aki dan sistem pengisian",
    definition:
      "Penyimpan daya listrik pada motor. Aki membantu menyalakan mesin, menyalakan lampu, dan mendukung komponen kelistrikan lain.",
    category: "kelistrikan",
    related_components: ["Terminal aki", "Sekring", "Sistem pengisian"],
    categoryLabel: "Kelistrikan",
    short: "Aki menyimpan listrik untuk starter dan lampu. Sistem pengisian mengisinya lagi saat mesin hidup.",
    analogy:
      "Aki itu dompet, sistem pengisian itu pemasukan. Dompet kosong bisa karena terlalu banyak dipakai, tapi bisa juga karena pemasukannya berhenti. Ganti dompet saja tidak menyelesaikan masalah kalau pemasukannya yang bermasalah.",
    how: "Saat mesin hidup, generator kecil di mesin menghasilkan listrik, dan komponen pengatur menjaga tegangannya supaya aman. Sebagian listrik dipakai lampu, sebagian mengisi aki.",
    signs: [
      "Starter berbunyi lemah atau ngik-ngik, mesin tidak berputar",
      "Lampu dan klakson meredup, terutama saat idle",
      "Aki baru diganti tapi cepat habis lagi, petunjuk bahwa masalahnya bukan di aki saja",
    ],
    ignored: "Motor bisa mati mendadak di jalan, dan sistem kelistrikan lain ikut terganggu.",
    diy: "hati",
    diyWhy:
      "Kamu boleh melihat apakah terminal aki berkarat atau longgar. Mengukur dan memperbaiki sistem pengisian adalah bagian kelistrikan utama, jadi serahkan ke bengkel.",
    ask: [
      "Tegangan aki dan pengisian saat mesin hidup sudah diukur? Hasilnya berapa?",
      "Akinya yang lemah, atau pengisiannya yang bermasalah?",
    ],
    related: ["busi"],
  },
  {
    id: "oli-mesin",
    term: "Oli mesin",
    definition:
      "Cairan pelumas yang membantu bagian-bagian mesin bergerak lebih halus. Oli juga membantu mengurangi panas dan keausan di dalam mesin.",
    category: "mesin",
    related_components: ["Mesin", "Filter oli (pada beberapa motor)", "Baut pembuangan oli"],
    categoryLabel: "Mesin",
    short: "Cairan pelumas yang mengurangi gesekan antar komponen di dalam mesin.",
    analogy: "Seperti pelumas pada engsel pintu. Tanpa itu, logam bergesekan, panas, dan cepat aus.",
    how: "Oli melumasi bagian mesin yang bergerak, membantu membuang panas, dan membawa kotoran halus supaya tidak menempel. Lama-lama oli kehilangan kemampuannya dan perlu diganti.",
    signs: [
      "Suara mesin terasa lebih kasar atau berisik",
      "Lampu indikator oli menyala (kalau motormu punya)",
      "Ada bercak oli di bawah mesin",
    ],
    ignored: "Gesekan meningkat, mesin makin panas dan aus. Kerusakan mesin yang parah bisa terjadi.",
    diy: "hati",
    diyWhy:
      "Mengecek level oli lewat jendela atau batang celup boleh kamu lakukan. Mengganti oli perlu jenis oli yang sesuai buku manual, mesin yang tidak panas, dan pembuangan oli bekas yang benar. Kalau belum terbiasa, serahkan ke bengkel.",
    ask: [
      "Jenis dan spesifikasi oli yang dipakai sesuai buku manual saya?",
      "Ada tanda kebocoran oli di mesin saya?",
    ],
    related: ["filter-udara"],
  },
  {
    id: "filter-udara",
    term: "Filter udara",
    definition:
      "Penyaring udara yang masuk ke mesin. Fungsinya menahan kotoran dan debu agar udara yang dipakai pembakaran lebih bersih.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Kotak filter", "Throttle body", "Karburator"],
    categoryLabel: "Mesin",
    short: "Saringan yang menahan debu sebelum udara masuk ke mesin.",
    analogy: "Seperti masker untuk mesin. Kalau masker kotor dan tersumbat, mesin jadi sulit bernapas.",
    how: "Mesin butuh campuran udara dan bensin. Filter yang tersumbat membuat udara yang masuk kurang, sehingga pembakaran tidak sempurna dan mesin bekerja lebih berat.",
    signs: [
      "Tarikan terasa berat, terutama di tanjakan",
      "Brebet saat butuh tenaga lebih",
      "Bensin terasa lebih boros",
    ],
    ignored: "Mesin bekerja lebih berat dan lebih cepat kotor, dan tenaga makin turun.",
    diy: "hati",
    diyWhy:
      "Di sebagian motor filter mudah dibuka, tetapi jenisnya berbeda (kertas, busa) dan salah membersihkan bisa merusaknya. Ikuti buku manual.",
    ask: ["Filter udara saya perlu dibersihkan atau diganti? Boleh saya lihat kondisinya?"],
    related: ["busi", "oli-mesin"],
  },
  {
    id: "rantai",
    term: "Rantai",
    definition:
      "Penghubung putaran dari mesin ke roda (pada motor berantai). Rantai yang bersih dan terawat membantu tenaga tersalur dengan baik.",
    category: "transmisi_dan_penggerak",
    related_components: ["Gir depan", "Gir belakang", "Pelumas rantai"],
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
  {
    id: "kampas-rem",
    term: "Kampas rem",
    definition:
      "Bagian rem yang bergesekan untuk membantu memperlambat atau menghentikan motor. Jika kampas menipis, kemampuan pengereman bisa berkurang.",
    category: "pengereman",
    related_components: ["Cakram", "Tromol", "Tuas rem", "Pedal rem"],
    categoryLabel: "Rem",
    short: "Lapisan yang bergesekan dengan cakram atau tromol untuk memperlambat dan menghentikan motor.",
    analogy: "Seperti karet penghapus yang menggosok permukaan. Makin sering dipakai, makin tipis.",
    how: "Saat tuas atau pedal ditekan, kampas dijepitkan ke cakram atau tromol. Gesekan itu mengubah gerak roda menjadi panas, dan motor melambat. Kampas pelan-pelan terkikis.",
    signs: [
      "Rem berbunyi cit saat ditarik",
      "Tuas atau pedal terasa lebih dalam sebelum motor melambat",
      "Bunyi logam bergesek: kampas sudah habis, jangan dikendarai dulu",
    ],
    ignored: "Jarak berhenti makin panjang dan cakram bisa rusak. Ini menyangkut keselamatanmu.",
    diy: "bengkel",
    diyWhy:
      "Kamu boleh melihat ketebalan kampas dan ada tidaknya kebocoran minyak rem di sekitar. Membongkar, mengganti, atau menyetel rem harus dilakukan di bengkel.",
    ask: [
      "Sisa ketebalan kampas saya berapa dibandingkan batas amannya?",
      "Selain kampas, cakram atau minyak rem juga perlu diperiksa?",
    ],
    related: [],
  },
  {
    id: "karburator",
    term: "Karburator",
    definition:
      "Komponen pada sebagian motor bensin yang mencampur udara dan bahan bakar sebelum masuk ke mesin. Pengaturan dan kebersihannya memengaruhi jalannya mesin.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Filter udara", "Selang bahan bakar", "Setelan langsam"],
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
  {
    id: "injector",
    term: "Injector",
    definition:
      "Komponen pada motor injeksi yang menyemprotkan bahan bakar dalam bentuk kabut halus. Semprotan yang tepat membantu pembakaran lebih baik.",
    category: "bahan_bakar_dan_udara",
    related_components: ["Pompa bahan bakar", "Sensor", "Throttle body"],
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
    term: "CVT (motor matik)",
    definition:
      "Sistem pemindah tenaga otomatis yang umum pada motor matik. CVT membantu motor menyesuaikan putaran agar terasa halus saat berjalan.",
    category: "transmisi_dan_penggerak",
    related_components: ["V-belt", "Roller", "Kampas ganda", "Puli"],
    categoryLabel: "Penggerak",
    short: "Sistem transmisi motor matik yang menyalurkan tenaga mesin ke roda secara otomatis, tanpa gigi bertingkat.",
    analogy:
      "Seperti sepeda yang bisa mengubah gigi secara halus tanpa kamu memindahkan apa pun. Sabuknya berputar di antara dua puli yang bisa melebar dan menyempit.",
    how: "Saat gas ditarik, roller (bola pemberat kecil) bergeser dan mengubah lebar puli. Sabuk (V-belt) ikut berpindah posisi sehingga perbandingan tenaganya berubah.",
    signs: [
      "Motor bergetar saat mulai jalan",
      "Mesin meraung tetapi laju tidak ikut naik",
      "Bunyi berdecit atau menggerus dari area samping mesin",
      "Tenaga lemah di tanjakan",
    ],
    ignored: "Sabuk dan roller yang aus bisa merusak komponen CVT lain.",
    diy: "bengkel",
    diyWhy: "Ruang CVT berhubungan langsung dengan mesin dan perlu pembongkaran.",
    ask: [
      "Kondisi V-belt dan roller saya bagaimana? Boleh saya lihat?",
      "Ada komponen CVT lain yang sudah aus, atau cukup diganti sebagian?",
    ],
    related: ["oli-mesin"],
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
  {
    id: "ban-dan-tekanan-angin",
    term: "Ban dan tekanan angin",
    definition:
      "Ban adalah bagian yang bersentuhan langsung dengan jalan. Tekanan angin yang sesuai anjuran pabrikan membantu motor stabil, nyaman, dan aman; lihat panduan pada stiker atau buku manual motor.",
    category: "roda",
    related_components: ["Velg", "Pentil", "Suspensi"],
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
