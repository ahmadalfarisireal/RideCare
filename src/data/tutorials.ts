import type { Tutorial } from "@/types/tutorial";

export const tutorials: Tutorial[] = [
  {
    slug: "cek-tekanan-ban",
    title: "Mengecek tekanan ban",
    motorcycle_types: ["bebek", "matik", "sport", "listrik"],
    difficulty: "mudah",
    estimated_time: "Sekitar 5–10 menit",
    tools: [
      "Alat ukur tekanan ban (jika tersedia)",
      "Pompa ban manual atau akses ke pompa angin",
      "Lap bersih",
    ],
    safety_warnings: [
      "Lakukan saat motor dalam keadaan stabil di permukaan datar; gunakan standar (penopang motor) tengah/samping dengan aman agar motor tidak mudah goyah.",
      "Periksa ban saat kondisi aman untuk disentuh; hindari memeriksa tepat setelah berkendara jauh jika ban terasa sangat panas.",
      "Gunakan tekanan angin sesuai anjuran pada stiker motor atau buku manual, bukan perkiraan.",
    ],
    steps: [
      "Parkirkan motor di tempat datar dan pastikan posisi motor stabil sebelum mulai.",
      "Cari informasi tekanan angin yang dianjurkan pada stiker di motor atau di buku manual pemilik.",
      "Lepas penutup pentil (katup kecil tempat udara masuk) jika ada, lalu simpan agar tidak hilang.",
      "Jika memiliki alat ukur, tempelkan ke pentil untuk melihat kondisi tekanan saat ini; jika tidak ada alat ukur, periksa tampilan ban dan rencanakan pengecekan di tempat pompa yang memiliki alat ukur.",
      "Tambahkan atau kurangi angin secara bertahap sesuai anjuran pabrikan. Setelah menyesuaikan, periksa kembali.",
      "Pasang kembali penutup pentil dan pastikan tidak ada suara angin keluar dari sekitar pentil.",
    ],
    when_to_stop: [
      "Ban terlihat kempis parah, sobek, benjol, atau ada benda menancap di ban.",
      "Angin terus berkurang dalam waktu singkat atau terdengar/terasa ada kebocoran.",
      "Velg (roda logam tempat ban terpasang) terlihat peyang/retak atau motor terasa tidak stabil saat didorong.",
      "Kamu tidak yakin kondisi ban aman untuk digunakan; bawa ke bengkel atau teknisi kompeten.",
    ],
    related_glossary_ids: ["ban-dan-tekanan-angin"],
    kenapaPerlu:
      "Tekanan ban yang tepat membuat motor stabil, hemat, dan ban lebih awet. Ban kurang angin membuat motor terasa berat dan boros, serta lebih cepat aus di bagian tepinya.",
    kapanDilakukan:
      "Cek secara berkala dan sebelum perjalanan jauh. Ikuti anjuran jadwal di buku manual motormu.",
    sebelumMulai: [
      "Parkir di tempat datar, saat ban masih dingin",
      "Cari angka tekanan anjuran di stiker pada motor atau buku manual",
    ],
    alasanPerLangkah: [
      "Ban yang baru dipakai jauh menjadi hangat dan angkanya naik, jadi hasil ukur tidak akurat.",
      "Tiap motor berbeda, dan ban depan bisa berbeda dari ban belakang. Jangan memakai angka dari ingatan.",
      "Kalau miring, udara bocor dan angkanya tidak tepat.",
      "Terlalu keras atau terlalu lembek sama-sama membuat motor kurang stabil.",
      "Tutup melindungi pentil dari debu yang bisa membuat bocor halus.",
      "Cari benda tajam, retakan, atau benjolan. Kalau ada, hentikan dan ke bengkel.",
    ],
    tandaBenar: "Semua langkah selesai. Kalau angkanya sudah sesuai anjuran, kamu beres.",
  },
  {
    slug: "ganti-oli-mesin",
    title: "Mengganti oli mesin",
    motorcycle_types: ["bebek", "matik", "sport"],
    difficulty: "sedang",
    estimated_time: "Sekitar 20–30 menit",
    tools: [
      "Oli baru sesuai spesifikasi di buku manual motor",
      "Wadah untuk menampung oli bekas",
      "Kunci yang sesuai untuk baut pembuangan oli (jika tertera di manual)",
      "Lap bersih dan corong (jika perlu)",
      "Sarung tangan (disarankan)",
    ],
    safety_warnings: [
      "Pastikan mesin sudah dingin sebelum mulai agar terhindar dari panas mesin dan oli panas.",
      "Parkirkan motor pada permukaan datar dan posisi stabil agar tidak roboh saat dikerjakan.",
      "Tampung oli bekas dengan wadah tertutup dan buang di tempat yang menerima limbah oli; jangan membuang oli ke tanah atau saluran air.",
      "Gunakan jenis dan takaran oli sesuai buku manual atau petunjuk pabrikan, bukan perkiraan.",
      "Ini perawatan rutin, bukan bongkar mesin bagian dalam. Jika muncul ketukan keras, asap putih tebal, mesin kepanasan, atau mesin mati berulang, hentikan dan bawa ke bengkel.",
    ],
    steps: [
      "Siapkan alat dan oli yang sesuai buku manual. Pastikan motor stabil dan mesin dalam keadaan dingin.",
      "Letakkan wadah penampung di bawah area pembuangan oli sesuai petunjuk manual motor.",
      "Buka tutup pengisian oli (jika diperlukan) agar oli lama lebih mudah keluar, mengikuti panduan manual.",
      "Buka baut pembuangan oli dengan hati-hati dan biarkan oli bekas mengalir ke wadah sampai habis. Hindari kontak oli dengan kulit.",
      "Pasang kembali baut pembuangan sesuai panduan manual tanpa memaksakan; jika ragu, hentikan dan minta bantuan bengkel.",
      "Isi oli baru secara bertahap sesuai takaran yang dianjurkan di buku manual/stiker, lalu periksa level oli (ketinggian oli) melalui penanda yang tersedia.",
      "Pasang kembali tutup pengisian, bersihkan sisa oli yang tumpah, dan pastikan tidak ada tetesan sebelum menyalakan mesin sebentar untuk pengecekan. Jika masih menetes, jangan menyalakan mesin dan minta bantuan bengkel.",
    ],
    when_to_stop: [
      "Baut pembuangan terasa macet, dol, atau ulir (garis sekrup pada baut) tidak mau masuk kembali dengan benar.",
      "Terlihat oli merembes/menetes dari baut atau area lain setelah dipasang kembali.",
      "Kamu tidak yakin jenis atau takaran oli yang benar untuk motor; periksa buku manual atau minta bantuan bengkel.",
      "Muncul suara, asap, atau bau tidak biasa setelah mesin dinyalakan; matikan mesin dan bawa ke bengkel.",
    ],
    related_glossary_ids: ["oli-mesin", "servis-rutin"],
  },
  {
    slug: "cek-ganti-busi",
    title: "Mengecek dan mengganti busi",
    motorcycle_types: ["bebek", "matik", "sport"],
    difficulty: "mudah",
    estimated_time: "Sekitar 10–20 menit",
    tools: [
      "Kunci busi yang sesuai motor",
      "Lap bersih",
      "Busi pengganti sesuai spesifikasi buku manual (jika akan mengganti)",
    ],
    safety_warnings: [
      "Matikan mesin dan tunggu sampai mesin benar-benar dingin sebelum menyentuh area busi agar tidak terkena panas.",
      "Pastikan motor stabil dan kunci kontak dalam posisi mati selama pekerjaan.",
      "Gunakan busi dengan spesifikasi yang dianjurkan di buku manual; jangan memaksakan ukuran atau tipe yang tidak sesuai.",
      "Membuka busi adalah pengecekan perawatan, bukan perbaikan bagian dalam mesin. Jika muncul asap putih tebal, ketukan keras, atau mesin mati berulang, hentikan dan bawa ke bengkel.",
    ],
    steps: [
      "Pastikan motor berada di tempat yang aman, mesin mati, dan sudah dingin.",
      "Lepas penutup/cap busi (karet penyambung kabel busi) dengan hati-hati sesuai akses pada motor kamu.",
      "Bersihkan area sekitar busi dengan lap agar kotoran tidak masuk saat busi dibuka.",
      "Gunakan kunci busi untuk membuka busi secara perlahan. Jika terasa sangat keras atau seret, jangan dipaksa.",
      "Amati kondisi busi: jika kotor ringan bersihkan permukaannya dengan lap; jika terlihat rusak atau aus, siapkan pengganti yang sesuai manual.",
      "Pasang busi (lama yang masih baik atau pengganti yang sesuai) dengan tangan terlebih dahulu agar ulir (garis sekrup pada busi) tidak menyilang, lalu kencangkan secukupnya sesuai panduan manual tanpa memaksakan.",
      "Pasang kembali cap busi sampai terasa terhubung dengan baik, lalu coba nyalakan mesin untuk memastikan tidak ada gangguan.",
    ],
    when_to_stop: [
      "Busi atau ulir terasa macet, tidak mau masuk lurus, atau ada tanda ulir rusak.",
      "Cap busi, kabel, atau bagian sekitar terlihat retak, hangus, atau berbau gosong.",
      "Mesin tetap sulit menyala, pincang, atau muncul asap/suara tidak biasa setelah pemasangan.",
      "Kamu ragu spesifikasi busi (jenis dan ukuran yang sesuai motor) yang tepat; cek buku manual atau minta bantuan bengkel/teknisi.",
    ],
    related_glossary_ids: ["busi", "servis-rutin"],
  },
  {
    slug: "setel-rantai",
    title: "Menyetel rantai",
    motorcycle_types: ["bebek", "sport"],
    difficulty: "sedang",
    estimated_time: "Sekitar 15–25 menit",
    tools: [
      "Kunci yang sesuai untuk pengatur dan pengunci roda (baut penahan posisi roda; lihat buku manual)",
      "Pelumas rantai",
      "Lap bersih",
      "Standar atau penopang agar motor stabil",
    ],
    safety_warnings: [
      "Kerjakan saat mesin mati dan motor diposisikan sangat stabil di permukaan datar agar tidak jatuh.",
      "Jauhkan jari dan pakaian longgar dari rantai serta gir; jangan memutar roda saat ada bagian tubuh dekat rantai.",
      "Setel kekencangan rantai sesuai petunjuk pada stiker atau buku manual motor, bukan perkiraan.",
      "Jangan menyentuh atau melepas komponen rem saat melonggarkan pengunci roda. Posisi rem belakang bisa berubah saat roda digeser; hentikan jika tuas/pedal rem terasa berbeda.",
    ],
    steps: [
      "Parkirkan motor di tempat datar dan pastikan posisinya stabil dengan penopang yang aman.",
      "Periksa kondisi rantai: bersihkan kotoran ringan dengan lap dan beri pelumas rantai secukupnya bila perlu.",
      "Lihat tanda acuan dan petunjuk kekencangan rantai pada motor atau di buku manual.",
      "Longgarkan pengunci roda secukupnya sesuai panduan manual agar posisi roda bisa diatur.",
      "Atur kedua sisi penyetel secara seimbang mengikuti tanda acuan agar roda tetap lurus, lalu sesuaikan kekencangan rantai sesuai manual.",
      "Kencangkan kembali pengunci roda sesuai panduan, pastikan posisi kiri-kanan sejajar, dan periksa kembali putaran roda berjalan bebas tanpa tersangkut. Uji tuas/pedal rem secara perlahan saat motor diam dan pastikan rasanya masih normal sebelum memutar roda lebih jauh.",
    ],
    when_to_stop: [
      "Rantai terlihat sangat kendor, berbunyi keras, berkarat parah, atau ada mata rantai (sambungan pada rantai) kaku/rusak.",
      "Gir (roda gigi penggerak) terlihat aus tajam/bergelombang atau rantai sering lepas dari jalurnya.",
      "Mur/pengunci sulit dikencangkan, tidak rata, atau roda terlihat tidak lurus setelah penyetelan.",
      "Rem terasa keras, blong, seret, atau tuas/pedal berubah setelah penyetelan; hentikan dan bawa ke bengkel.",
      "Kamu tidak yakin kekencangan yang benar; hentikan dan minta pengecekan di bengkel.",
    ],
    related_glossary_ids: ["rantai"],
  },
  {
    slug: "cek-kampas-rem",
    title: "Mengecek kampas rem",
    motorcycle_types: ["bebek", "matik", "sport", "listrik"],
    difficulty: "mudah",
    estimated_time: "Sekitar 5–10 menit",
    tools: [
      "Senter atau lampu penerangan",
      "Lap bersih",
    ],
    safety_warnings: [
      "Ini hanya pengecekan visual/pengamatan dari luar; jangan melepas komponen rem apa pun.",
      "Pastikan motor stabil dan mesin mati saat mengamati area rem agar aman.",
      "Rem adalah bagian penting untuk keselamatan; jika ada keraguan, segera periksakan ke bengkel atau teknisi.",
      "Cakram adalah piringan rem yang terlihat; tromol adalah drum rem yang tertutup. Dalam tutorial ini keduanya hanya diamati dari luar.",
    ],
    steps: [
      "Parkirkan motor di tempat datar dengan posisi stabil dan mesin dalam keadaan mati.",
      "Gunakan senter untuk melihat bagian kampas rem dari celah yang tersedia tanpa membuka atau melepas komponen.",
      "Perhatikan ketebalan lapisan kampas dan kondisi permukaan yang terlihat: apakah tampak sangat menipis, tidak rata, atau ada kotoran menempel.",
      "Periksa area sekitar secara visual (tanpa menyentuh bagian dalam): lihat apakah ada tanda cairan, kotoran berlebihan, atau keausan yang tidak wajar.",
      "Uji tuas/pedal rem secara perlahan saat motor diam untuk merasakan apakah masih bekerja seperti biasa, tanpa memaksakan berkendara jika terasa tidak aman.",
    ],
    when_to_stop: [
      "Kampas terlihat sangat tipis, habis, atau permukaan rem tampak tidak rata/berkerak berat.",
      "Tuas/pedal rem terasa terlalu dalam, sangat keras, blong (tidak ada tenaga rem saat ditekan), atau tidak kembali normal.",
      "Terlihat cairan di sekitar rem, muncul bau menyengat, atau ada suara gesekan logam saat rem digunakan.",
      "Ada keraguan apa pun tentang kondisi rem; jangan kendarai motor dan bawa ke bengkel/teknisi kompeten.",
    ],
    related_glossary_ids: ["kampas-rem"],
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
  {
    slug: "cek-aki-terminal",
    title: "Mengecek aki dan terminal",
    motorcycle_types: ["bebek", "matik", "sport"],
    difficulty: "mudah",
    estimated_time: "Sekitar 5–10 menit",
    tools: [
      "Senter atau lampu penerangan",
      "Lap kering bersih",
    ],
    safety_warnings: [
      "Ini hanya pengecekan visual/pengamatan; jangan melepas komponen, kabel, atau terminal aki.",
      "Pastikan kunci kontak mati dan motor stabil. Jauhkan percikan api, rokok, atau sumber panas dari area aki.",
      "Hindari menyentuh bagian logam terminal secara langsung; jika ada kerusakan atau kebocoran, minta bantuan bengkel.",
    ],
    steps: [
      "Matikan motor dan letakkan di tempat yang terang serta stabil.",
      "Lihat area aki dari luar (sesuai akses yang aman pada motor) tanpa membuka atau melepas bagian apa pun.",
      "Amati kondisi yang terlihat: apakah terminal (titik sambungan kabel aki) tampak berkarat/putih kehijauan, kabel terlihat longgar, atau ada kotoran di sekitar aki.",
      "Perhatikan apakah ada tanda fisik tidak normal pada aki yang terlihat dari luar, seperti retak, basah/lembap, atau bentuk tidak wajar.",
      "Jika hanya ada debu ringan di bagian luar yang mudah dijangkau, bersihkan dengan lap kering tanpa menyentuh atau menekan terminal/kabel. Catat temuan untuk disampaikan ke mekanik bila perlu.",
    ],
    when_to_stop: [
      "Terlihat kerak tebal, kabel mengelupas, terminal berubah warna parah, atau ada tanda meleleh/hangus.",
      "Ada bau menyengat, asap, suara mendesis, cairan, atau aki tampak membengkak/retak.",
      "Motor sulit dinyalakan berulang kali atau lampu sangat redup disertai tanda tidak normal di area aki.",
      "Kamu ragu dengan kondisi kelistrikan; hentikan pemeriksaan sendiri dan bawa ke bengkel/teknisi.",
    ],
    related_glossary_ids: ["aki", "sistem-charging"],
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
  {
    slug: "bersihkan-filter-udara",
    title: "Membersihkan filter udara",
    motorcycle_types: ["bebek", "matik", "sport"],
    difficulty: "mudah",
    estimated_time: "Sekitar 10–20 menit",
    tools: [
      "Obeng atau alat pembuka yang sesuai (lihat buku manual)",
      "Lap bersih atau kuas halus",
      "Kuas halus atau lap kering; udara bertekanan sangat rendah hanya jika buku manual mengizinkan",
    ],
    safety_warnings: [
      "Lakukan saat mesin mati dan dingin, di tempat yang cukup terang dan berventilasi baik.",
      "Ikuti petunjuk buku manual untuk letak dan cara membuka rumah filter; jangan memaksa bagian yang terasa keras.",
      "Jaga agar debu atau benda asing tidak masuk ke saluran udara saat filter dilepas sementara.",
    ],
    steps: [
      "Parkirkan motor stabil, matikan mesin, dan pastikan kondisi sudah dingin.",
      "Temukan lokasi kotak filter udara dengan melihat buku manual motor.",
      "Buka penutup rumah filter (kotak tempat filter) dengan alat yang sesuai secara perlahan, dan simpan pengikat/baut kecil di tempat aman.",
      "Keluarkan elemen filter (bagian kertas/kain penyaring) dengan hati-hati, lalu amati kondisinya (berdebu, kotor, sobek, atau rusak).",
      "Bersihkan debu kering secara lembut menggunakan lap/kuas atau tiupan udara bertekanan sangat rendah sesuai petunjuk buku manual. Jangan pakai bensin, cairan pembersih keras, atau kompresor bertekanan tinggi kecuali manual mengizinkan.",
      "Jika filter terlihat rusak atau terlalu kotor, gunakan pengganti yang sesuai buku manual. Jika ragu membersihkannya, jangan dipaksa; siapkan pengganti sesuai manual. Pasang kembali filter dan penutup rumahnya dengan benar.",
    ],
    when_to_stop: [
      "Filter sobek, rapuh, basah oleh oli/bahan bakar, atau tidak bisa dibersihkan dengan aman.",
      "Pengikat/penutup rumah filter rusak, hilang, atau tidak bisa terpasang rapat kembali.",
      "Terlihat kotoran berat masuk ke saluran udara atau ada bagian yang pecah di dalam rumah filter.",
      "Filter masih kotor atau rusak setelah dibersihkan; jangan memaksakan memasangnya kembali, minta bantuan bengkel.",
      "Setelah dipasang kembali motor sulit hidup, brebet berat, atau berperilaku tidak biasa; periksakan ke bengkel.",
    ],
    related_glossary_ids: ["filter-udara", "karburator", "throttle-body"],
  },
  {
    slug: "cek-lampu-kelistrikan-dasar",
    title: "Mengecek lampu dan kelistrikan dasar",
    motorcycle_types: ["bebek", "matik", "sport", "listrik"],
    difficulty: "mudah",
    estimated_time: "Sekitar 10–15 menit",
    tools: [
      "Tempat yang aman untuk mencoba fungsi lampu",
      "Buku manual motor (untuk letak lampu dan posisi sekring yang terlihat dari luar)",
    ],
    safety_warnings: [
      "Ini hanya pengecekan visual dan fungsi dari luar; jangan melepas komponen, jangan membuka kelistrikan utama, dan jangan menyentuh bagian bertegangan tinggi.",
      "Sekring (pengaman listrik yang putus jika arus berlebih) hanya dilihat dari luar; jangan dicabut, diganti, atau disentuh.",
      "Lakukan di tempat aman; jika perlu menyalakan motor, pastikan area berventilasi dan motor stabil.",
      "Jika tercium bau gosong, terlihat asap, kabel panas/meleleh, atau percikan, hentikan dan jangan gunakan motor.",
    ],
    steps: [
      "Parkirkan motor di tempat aman dan stabil. Siapkan catatan sederhana untuk fungsi yang akan diperiksa.",
      "Nyalakan kunci kontak (sakelar utama motor; dan mesin bila diperlukan) untuk mencoba lampu utama, lampu senja, lampu sein, lampu rem, dan klakson secara bergantian.",
      "Amati apakah ada lampu yang mati, redup, berkedip tidak normal, atau indikator (lampu peringatan di panel) yang menyala tidak seperti biasanya.",
      "Lakukan pengamatan visual dari luar pada area yang mudah terlihat: cari kabel yang kendur/terkelupas terlihat, sambungan longgar, atau tanda hangus tanpa menyentuhnya. Jika buku manual menunjukkan posisi sekring yang terlihat, amati dari luar saja; jangan melepas penutup atau konektornya.",
      "Matikan kembali motor/kontak setelah selesai dan sampaikan temuan secara spesifik jika perlu ke bengkel/teknisi.",
    ],
    when_to_stop: [
      "Tercium bau gosong, terlihat asap, kabel panas/meleleh, atau ada percikan api.",
      "Sekring sering bermasalah berulang, lampu padam total, atau ada tanda hangus pada komponen kelistrikan.",
      "Motor mati mendadak, sulit dinyalakan, atau indikator menunjukkan tanda gangguan yang tidak kamu pahami.",
      "Ada keraguan terkait keselamatan kelistrikan; segera bawa ke bengkel atau teknisi kompeten.",
    ],
    related_glossary_ids: ["aki", "sistem-charging", "sensor"],
  },
  {
    slug: "cek-kebocoran-oli-bahan-bakar",
    title: "Mengenali kebocoran oli atau bahan bakar",
    motorcycle_types: ["bebek", "matik", "sport"],
    difficulty: "mudah",
    estimated_time: "Sekitar 5–10 menit",
    tools: [
      "Senter atau lampu penerangan",
      "Kertas/alas bersih untuk melihat tetesan (opsional)",
      "Lap untuk membersihkan area luar secara aman (tanpa menyentuh sumber bocor)",
    ],
    safety_warnings: [
      "Ini hanya pengecekan visual/pengamatan; jangan melepas komponen dan jangan menyentuh sistem bahan bakar.",
      "Jauhkan api, percikan, dan rokok dari motor. Jika tercium bau bahan bakar kuat, jangan menyalakan mesin.",
      "Lakukan saat mesin mati dan cukup dingin. Kebocoran bahan bakar atau oli bisa berbahaya; utamakan keselamatan.",
    ],
    steps: [
      "Parkirkan motor di tempat terang, datar, dan berventilasi baik dengan mesin mati.",
      "Lihat area bawah dan sekitar motor: periksa apakah ada noda basah, tetesan baru, atau bau oli/bahan bakar.",
      "Gunakan senter untuk mengamati dari luar (tanpa membongkar) area sekitar mesin, selang yang terlihat, sambungan, dan bagian bawah tangki/sekitarnya.",
      "Catat lokasi perkiraan, warna/bau cairan, dan kapan terlihat (misalnya saat motor diam atau setelah digunakan) untuk informasi ke mekanik.",
      "Jika aman, bersihkan area luar yang jauh dari sumber bocor agar lebih mudah melihat apakah ada rembesan baru (tetesan kecil), lalu amati kembali tanpa menyalakan mesin bila ada bau bahan bakar.",
    ],
    when_to_stop: [
      "Tercium bau bahan bakar kuat, terlihat tetesan bahan bakar, atau ada cairan yang terus menetes.",
      "Terlihat oli menetes deras, level oli turun cepat, atau ada cipratan di area panas mesin.",
      "Muncul asap, permukaan sangat panas, atau ada tanda selang/kabel dekat sumber bocor yang rusak.",
      "Setiap dugaan kebocoran bahan bakar atau kebocoran yang tidak jelas sumbernya: jangan kendarai motor dan segera ke bengkel/teknisi.",
    ],
    related_glossary_ids: ["oli-mesin"],
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
  {
    slug: "perawatan-dasar-motor-listrik",
    title: "Perawatan dasar motor listrik",
    motorcycle_types: ["listrik"],
    difficulty: "sedang",
    estimated_time: "Sekitar 10–20 menit",
    tools: [
      "Lap bersih dan lembut",
      "Air secukupnya untuk membersihkan bagian luar yang aman (ikuti buku manual)",
      "Senter atau lampu penerangan",
    ],
    safety_warnings: [
      "Hanya lakukan perawatan luar: kebersihan bodi, pengecekan ban, dan pengamatan visual/indikator. Jangan menyentuh baterai, kabel, soket pengisian bagian dalam, atau komponen tegangan tinggi (daya listrik besar yang berbahaya).",
      "Jangan membuka penutup, membongkar, atau memperbaiki bagian kelistrikan/baterai sendiri. Ikuti instruksi keselamatan di buku manual motor.",
      "Jika ada bau menyengat/gosong, panas berlebih, asap, percikan, atau indikator gangguan, jauhi motor dan hubungi bengkel/teknisi motor listrik.",
    ],
    steps: [
      "Parkirkan motor di tempat datar dan aman, matikan sistem sesuai prosedur di buku manual, dan pastikan area pengisian tidak sedang terhubung jika tidak diperlukan.",
      "Bersihkan bagian luar bodi dengan lap lembut; hindari menyemprot atau mengarahkan air ke area soket, celah kelistrikan, atau komponen yang dilarang di buku manual.",
      "Periksa ban secara visual: lihat keausan, benda asing, dan pastikan tekanan angin mengikuti anjuran pada stiker atau buku manual.",
      "Amati indikator pada panel secara visual: perhatikan tanda peringatan, level daya, atau pesan yang tidak biasa tanpa menekan/mengubah pengaturan yang tidak dipahami.",
      "Lakukan pengecekan visual luar pada kabel yang terlihat, soket pengisian bagian luar, dan bodi untuk mencari keretakan, kendor, atau perubahan bentuk tanpa menyentuh bagian dalamnya.",
    ],
    when_to_stop: [
      "Muncul bau gosong/menyengat, panas berlebih, asap, percikan, atau suara tidak normal dari area baterai/kelistrikan.",
      "Indikator menampilkan peringatan gangguan, motor kehilangan tenaga tiba-tiba, atau tidak merespons normal.",
      "Terlihat kabel/selubung rusak, soket pengisian berubah warna/retak, atau ada bagian bodi dekat komponen listrik yang rusak.",
      "Setiap kondisi yang membuat kamu ragu soal keamanan baterai atau kelistrikan: jangan gunakan/isi daya motor dan hubungi teknisi/bengkel motor listrik kompeten.",
    ],
    related_glossary_ids: ["sistem-charging", "sensor"],
  },
];

export function getAllTutorials(): Tutorial[] {
  return tutorials;
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((tutorial) => tutorial.slug === slug);
}

export const TUTORIAL_SLUGS = tutorials.map((tutorial) => tutorial.slug);
