export interface CauseExplanation {
  why: string;
  differentiate: string;
  selfCheck?: string;
  workshop: string;
}

const FALLBACK_EXPLANATION: CauseExplanation = {
  why: "Karena {answers}. Pola ini cukup umum untuk keluhan yang kamu sampaikan.",
  differentiate: "Perhatikan kapan gejala muncul dan apakah gejalanya berubah saat motor dipakai.",
  selfCheck: "Kamu boleh melihat kondisi yang mudah terlihat dari luar tanpa membongkar motor.",
  workshop: "Untuk pemeriksaan dan keputusan penggantian komponen, gunakan bengkel atau teknisi yang kompeten.",
};

const SAFETY_WORKSHOP =
  "Jangan membongkar atau menyetel komponen sendiri. Serahkan pemeriksaan dan perbaikannya ke bengkel atau teknisi yang kompeten.";

const CAUSE_EXPLANATIONS: Record<string, Record<string, CauseExplanation>> = {
  "starter-susah-hidup-pagi": {
    "Kemungkinan busi lemah atau kotor.": {
      why: "Karena {answers}. Percikan api yang lemah membuat mesin dingin lebih sulit menyala.",
      differentiate: "Mesin ikut berputar saat distarter, tetapi baru menyala setelah beberapa kali coba.",
      selfCheck: "Busi bisa dilihat di sebagian motor. Ikuti tutorialnya, dan serahkan ke bengkel kalau bodi harus dibongkar.",
      workshop: "Pemeriksaan busi dan pembakaran dilakukan bengkel kalau aksesnya sulit.",
    },
    "Kemungkinan aki mulai lemah.": {
      why: "Karena {answers}. Aki bekerja paling keras saat mesin masih dingin.",
      differentiate: "Starter berbunyi lemah atau lampu ikut meredup saat tombol starter ditekan.",
      selfCheck: "Kamu boleh melihat terminal aki dari luar: adakah karat atau sambungan yang longgar.",
      workshop: "Pengukuran aki dan sistem pengisian dilakukan bengkel.",
    },
    "Kemungkinan aliran bahan bakar atau udara kurang bersih.": {
      why: "Karena {answers}. Campuran yang tidak lancar membuat mesin sulit menyala.",
      differentiate: "Mesin berputar normal, tetapi tetap sulit menyala atau terasa brebet.",
      selfCheck: "Filter udara bisa dilihat di sebagian motor. Ikuti buku manual untuk cara perawatannya.",
      workshop: "Sistem bahan bakar dan injektor sebaiknya diperiksa bengkel.",
    },
    "Kemungkinan setelan langsam kurang pas.": {
      why: "Karena {answers}. Putaran idle yang kurang stabil membuat mesin mudah mati saat awal menyala.",
      differentiate: "Mesin mudah mati begitu gas dilepas, terutama saat masih dingin.",
      workshop: "Setelan idle atau langsam dilakukan bengkel.",
    },
  },
  "mesin-mati-lampu-merah": {
    "Kemungkinan setelan langsam terlalu rendah.": {
      why: "Karena {answers}. Putaran idle yang terlalu rendah membuat mesin mati saat motor berhenti.",
      differentiate: "Mesin normal saat berjalan, lalu mati begitu gas dilepas dan motor berhenti.",
      workshop: "Setelan langsam termasuk bagian mesin, jadi serahkan ke bengkel.",
    },
    "Kemungkinan busi atau pembakaran tidak stabil.": {
      why: "Karena {answers}. Pembakaran yang tidak stabil membuat mesin sulit mempertahankan putaran.",
      differentiate: "Mesin terasa tidak halus sebelum akhirnya mati.",
      selfCheck: "Busi bisa dilihat di sebagian motor. Serahkan ke bengkel kalau bodi harus dibongkar.",
      workshop: "Pemeriksaan pembakaran dilakukan bengkel.",
    },
    "Kemungkinan kotoran pada sistem udara atau bahan bakar.": {
      why: "Karena {answers}. Aliran yang tersendat membuat mesin kehilangan putaran saat idle.",
      differentiate: "Tarikan terasa berat sebelum mesin akhirnya mati.",
      selfCheck: "Filter udara bisa dilihat di sebagian motor tanpa membongkar bagian mesin.",
      workshop: "Pembersihan saluran udara dan bahan bakar sebaiknya di bengkel.",
    },
    "Kemungkinan ada gangguan sensor atau komponen pendukung pada motor injeksi.": {
      why: "Karena {answers}. Komponen pendukung dapat memengaruhi putaran idle.",
      differentiate: "Gejala datang dan pergi tanpa pola yang jelas.",
      workshop: "Pembacaan sensor memakai alat khusus, jadi dilakukan bengkel.",
    },
  },
  "rem-berbunyi-tidak-pakem": {
    _default: {
      why: "Karena {answers}. Bunyi atau perubahan rasa pada rem perlu diperiksa langsung.",
      differentiate: "Perhatikan apakah gejala muncul setiap kali rem ditarik atau berubah saat motor dipakai.",
      workshop: SAFETY_WORKSHOP,
    },
  },
  "performa-lemah-tanjakan": {
    "Kemungkinan pembakaran kurang optimal (busi atau udara).": {
      why: "Karena {answers}. Pembakaran yang kurang baik membuat tenaga turun.",
      differentiate: "Tarikan berat disertai brebet atau mesin terasa kurang halus.",
      selfCheck: "Busi dan filter udara bisa dilihat di sebagian motor tanpa membongkar mesin.",
      workshop: "Pemeriksaan pembakaran dilakukan bengkel kalau gejala tetap ada.",
    },
    "Kemungkinan aliran bahan bakar tidak lancar.": {
      why: "Karena {answers}. Mesin kekurangan pasokan saat membutuhkan tenaga lebih.",
      differentiate: "Tenaga turun terutama saat menanjak atau saat motor membawa beban.",
      workshop: "Sistem bahan bakar sebaiknya diperiksa bengkel.",
    },
    "Kemungkinan CVT/penyaluran tenaga perlu diperiksa (terutama motor matik).": {
      why: "Karena {answers}. Tenaga mesin mungkin tidak tersalurkan dengan baik ke roda.",
      differentiate: "Mesin meraung tetapi laju tidak ikut naik, terutama pada motor matik.",
      workshop: "CVT perlu dibuka dan diperiksa di bengkel.",
    },
    "Kemungkinan tekanan ban atau beban kendaraan memengaruhi tarikan.": {
      why: "Karena {answers}. Ban yang kurang angin membuat motor terasa lebih berat.",
      differentiate: "Motor terasa berat dan ban tampak lebih lembek dari biasanya.",
      selfCheck: "Kamu bisa mengecek ban di tempat datar. Angka anjuran ada di stiker motor atau buku manual.",
      workshop: "Ke bengkel kalau tekanan cepat turun atau ada benjolan pada ban.",
    },
  },
  "rantai-berderak-kasar": {
    "Kemungkinan rantai kering dan perlu pelumasan.": {
      why: "Karena {answers}. Rantai yang kering lebih berisik saat berputar.",
      differentiate: "Bunyi berasal dari sisi rantai dan berubah saat gas dibuka lalu ditutup.",
      selfCheck: "Kamu boleh melihat apakah rantai kering, berkarat, atau terlalu kendor.",
      workshop: "Perawatan rantai sebaiknya dibantu bengkel kalau belum terbiasa.",
    },
    "Kemungkinan ketegangan rantai tidak sesuai.": {
      why: "Karena {answers}. Rantai yang terlalu kendor atau terlalu kencang menimbulkan bunyi.",
      differentiate: "Bunyi muncul saat gas dibuka lalu segera ditutup.",
      selfCheck: "Kondisi rantai bisa dilihat dari luar tanpa membongkar motor.",
      workshop: "Penyetelan rantai sebaiknya dilakukan bengkel.",
    },
    "Kemungkinan gir atau rantai mulai aus.": {
      why: "Karena {answers}. Bagian yang sudah aus menimbulkan bunyi kasar.",
      differentiate: "Gigi terlihat lebih runcing atau rantai terlihat aus.",
      selfCheck: "Kamu boleh melihat kondisi rantai dan gir dari luar.",
      workshop: "Penggantian rantai dan gir sebaiknya di bengkel.",
    },
  },
  "lampu-redup-aki-tekor": {
    "Kemungkinan aki lemah atau sudah menurun kapasitasnya.": {
      why: "Karena {answers}. Aki yang lemah membuat lampu dan starter kekurangan tenaga.",
      differentiate: "Starter berbunyi lemah dan lampu ikut meredup saat tombol starter ditekan.",
      selfCheck: "Kamu boleh melihat terminal aki dari luar: adakah karat atau sambungan yang longgar.",
      workshop: "Pengukuran kondisi aki dilakukan bengkel.",
    },
    "Kemungkinan terminal aki kendor atau berkarat.": {
      why: "Karena {answers}. Sambungan yang tidak rapat membuat arus listrik terhambat.",
      differentiate: "Gejalanya datang dan pergi: kadang normal, kadang lampu redup.",
      selfCheck: "Lihat terminal aki dari luar. Adakah serbuk atau sambungan yang tampak longgar?",
      workshop: "Jangan melepas kabel aki sendiri kalau belum terbiasa.",
    },
    "Kemungkinan sistem pengisian perlu diperiksa.": {
      why: "Karena {answers}. Aki bisa lemah karena tidak terisi kembali dengan baik.",
      differentiate: "Lampu meredup saat idle, lalu terang lagi saat gas ditarik.",
      workshop: "Mengukur sistem pengisian saat mesin hidup dilakukan bengkel.",
    },
    "Kemungkinan ada beban kelistrikan yang tidak normal (tanpa tanda korsleting).": {
      why: "Karena {answers}. Komponen listrik tambahan dapat menguras aki.",
      differentiate: "Aki cepat habis lagi meski sudah diganti.",
      workshop: "Bengkel perlu memeriksa jalur dan beban kelistrikan.",
    },
  },
  "kelistrikan-korsleting-bau-gosong": {
    _default: {
      why: "Karena {answers}. Bau gosong atau kabel panas termasuk tanda kelistrikan utama.",
      differentiate: "Perhatikan apakah bau atau panas muncul terus-menerus atau hanya sesekali.",
      workshop: "Kelistrikan utama jangan diotak-atik sendiri. Ke bengkel atau teknisi yang kompeten.",
    },
  },
  "mesin-brebet-tarikan-tidak-stabil": {
    "Kemungkinan busi kotor atau aus.": {
      why: "Karena {answers}. Percikan yang lemah membuat pembakaran tersendat.",
      differentiate: "Brebet terasa jelas saat gas ditarik dan tenaga hilang sesaat.",
      selfCheck: "Busi bisa dilihat di sebagian motor. Serahkan ke bengkel kalau bodi harus dibongkar.",
      workshop: "Pemeriksaan busi dilakukan bengkel kalau aksesnya sulit.",
    },
    "Kemungkinan pasokan bahan bakar atau udara tidak lancar.": {
      why: "Karena {answers}. Mesin seperti kekurangan napas saat butuh tenaga.",
      differentiate: "Tarikan terasa berat dan brebet muncul saat motor dipacu.",
      workshop: "Sistem bahan bakar sebaiknya diperiksa bengkel.",
    },
    "Kemungkinan filter udara kotor.": {
      why: "Karena {answers}. Filter yang tersumbat membuat udara yang masuk berkurang.",
      differentiate: "Tarikan terasa berat dan mesin lebih cepat kotor.",
      selfCheck: "Cara membersihkan filter berbeda untuk tiap jenis. Ikuti buku manual motor.",
      workshop: "Ke bengkel kalau filter sudah dibersihkan tetapi brebet tetap ada.",
    },
    "Kemungkinan komponen pembakaran perlu diperiksa.": {
      why: "Karena {answers}. Bagian pembakaran lain mungkin yang bermasalah.",
      differentiate: "Brebet tetap ada walau busi dan filter sudah diperiksa.",
      workshop: "Pemeriksaan pembakaran dilakukan bengkel.",
    },
  },
  "knalpot-asap-putih-tebal": {
    _default: {
      why: "Karena {answers}. Asap putih tebal perlu pemeriksaan langsung pada mesin.",
      differentiate: "Perhatikan apakah asap muncul terus-menerus atau hanya saat kondisi tertentu.",
      workshop: "Jangan membuka mesin sendiri. Serahkan ke bengkel atau teknisi yang kompeten.",
    },
  },
  "bensin-bocor-bau-menyengat": {
    _default: {
      why: "Karena {answers}. Bau atau tetesan bensin termasuk kondisi yang harus dihentikan dulu.",
      differentiate: "Perhatikan dari mana bau atau tetesan paling jelas tercium atau terlihat.",
      workshop: "Sistem bensin tidak boleh dibongkar sendiri. Bawa motor ke bengkel.",
    },
  },
  "motor-listrik-daya-gangguan-baterai": {
    _default: {
      why: "Karena {answers}. Gangguan daya pada motor listrik perlu ditangani teknisi yang berpengalaman.",
      differentiate: "Perhatikan apakah masalah muncul saat dipakai, saat diam, atau saat pengisian daya.",
      workshop: "Sistem baterai bertegangan tinggi. Jangan menyentuh atau membukanya sendiri. Serahkan ke teknisi motor listrik.",
    },
  },
  "bekas-banjir-kecelakaan-periksa-menyeluruh": {
    _default: {
      why: "Karena {answers}. Setelah banjir atau kecelakaan, kerusakan tidak selalu langsung terlihat.",
      differentiate: "Perhatikan apakah ada bagian yang penyok, basah, atau terasa tidak sejajar.",
      workshop: "Motor perlu pemeriksaan menyeluruh di bengkel sebelum dipakai lagi.",
    },
  },
  "oli-bocor-rembes": {
    "Kemungkinan seal, paking, atau baut pembuangan oli tidak rapat.": {
      why: "Karena {answers}. Sambungan yang tidak rapat membuat oli keluar.",
      differentiate: "Rembesan paling jelas terlihat di bagian bawah mesin.",
      selfCheck: "Kamu boleh melihat bercak oli di bawah motor tanpa membongkar komponen.",
      workshop: "Penggantian seal atau paking dilakukan bengkel.",
    },
    "Kemungkinan ada retakan atau sambungan yang longgar.": {
      why: "Karena {answers}. Bagian yang retak atau longgar bisa mengeluarkan oli.",
      differentiate: "Rembesan muncul lebih jelas setelah mesin dipakai.",
      selfCheck: "Boleh dilihat dari luar tanpa membongkar mesin.",
      workshop: "Perbaikan sambungan sebaiknya di bengkel.",
    },
    "Kemungkinan level oli perlu diperiksa agar tidak kurang.": {
      why: "Karena {answers}. Oli yang berkurang membuat mesin bekerja lebih berat.",
      differentiate: "Suara mesin terasa lebih kasar atau lampu indikator oli menyala kalau motormu punya.",
      selfCheck: "Cek level oli lewat jendela atau batang celup sesuai buku manual motor.",
      workshop: "Ke bengkel kalau level oli terus turun.",
    },
  },
  "kampas-rem-menipis-cek-rutin": {
    "Kemungkinan kampas rem mulai menipis.": {
      why: "Karena {answers}. Kampas yang menipis membuat rem lebih lambat merespons.",
      differentiate: "Rem mulai terasa lebih dalam atau muncul bunyi cit saat ditarik.",
      selfCheck: "Kamu boleh melihat ketebalan kampas kalau mudah terlihat dari luar.",
      workshop: "Mengganti dan menyetel rem tetap dilakukan di bengkel.",
    },
    "Kemungkinan permukaan rem kotor dan perlu dibersihkan.": {
      why: "Karena {answers}. Kotoran pada permukaan rem mengganggu gesekan.",
      differentiate: "Bunyi berubah atau hilang setelah pembersihan.",
      selfCheck: "Lihat kondisi permukaan rem dari luar tanpa membongkar sistem.",
      workshop: "Pembersihan dan pemeriksaan rem dilakukan bengkel.",
    },
    "Kemungkinan setelan atau cairan rem perlu diperiksa.": {
      why: "Karena {answers}. Tuas yang terasa dalam bisa berkaitan dengan setelan atau cairan rem.",
      differentiate: "Tuas terasa lebih dalam walau kampas masih terlihat tebal.",
      workshop: "Sistem rem disetel dan diperiksa di bengkel.",
    },
  },
  "mesin-overheat-parah": {
    _default: {
      why: "Karena {answers}. Panas berlebih pada mesin perlu penanganan teknisi.",
      differentiate: "Perhatikan apakah panas muncul saat macet, dipakai jauh, atau terus-menerus.",
      workshop: "Jangan membuka mesin sendiri. Bawa ke bengkel atau teknisi yang kompeten.",
    },
  },
};

export function getCauseExplanation(ruleId: string, causeText: string): CauseExplanation {
  const byRule = CAUSE_EXPLANATIONS[ruleId];
  if (!byRule) return FALLBACK_EXPLANATION;
  return byRule[causeText] ?? byRule._default ?? FALLBACK_EXPLANATION;
}

export function formatWhy(why: string, answerSummary: string): string {
  return why.replace("{answers}", answerSummary || "jawaban yang kamu berikan");
}

export function safetyWorkshopText(): string {
  return SAFETY_WORKSHOP;
}
