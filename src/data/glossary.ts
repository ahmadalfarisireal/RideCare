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
