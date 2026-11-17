# RideCare — Panduan Konten dan Penjelasan

Dokumen ini melengkapi PROJECT_BRIEF.md. Semua teks yang tampil di website (kamus, hasil keluhan, tutorial, microcopy) mengikuti panduan ini. Aturan keselamatan di brief tetap berlaku dan tidak boleh dilonggarkan demi gaya bahasa.

## 1. Kenapa penjelasan sebelumnya terasa membosankan dan sulit dipahami

- Definisinya pendek dan berupa istilah dijelaskan dengan istilah lain. Contoh: "Busi adalah komponen pengapian". Pengguna pemula tetap tidak tahu busi itu ngapain dan kenapa mereka perlu peduli.
- Tidak ada gambaran. Tanpa analogi atau contoh gejala, pengguna tidak bisa mengenali masalahnya di motor sendiri.
- Tidak ada alasan. Tertulis "periksa aki", tapi tidak dijelaskan kenapa aki yang dicurigai dan bagaimana membedakannya dari penyebab lain.
- Semua hasil berbentuk sama, sehingga halaman terasa seperti mengisi formulir lalu menerima formulir.

Penjelasan yang bagus menjawab empat pertanyaan pembaca, berurutan: **Ini apa? Kenapa saya harus peduli? Bagaimana saya tahu motor saya kena? Apa yang harus saya lakukan?**

## 2. Suara RideCare: "kakak bengkel yang jujur"

Bayangkan teman yang paham motor, sabar, dan tidak pernah membuatmu merasa bodoh karena bertanya.

Aturan nada:

1. **Bicara langsung ke pembaca.** Pakai "kamu" dan "motormu", bukan "pengguna".
2. **Jelaskan istilah pada kemunculan pertamanya,** di kalimat yang sama. Bukan di halaman lain.
3. **Satu analogi sehari-hari per konsep,** lalu berhenti. Analogi harus akurat, bukan sekadar lucu.
4. **Sebut gejala yang bisa dirasakan,** bukan hanya nama komponen: bunyinya, getarannya, baunya, kapan muncul.
5. **Beri alasan di setiap saran.** "Cek terminal aki, karena karat di sana bisa membuat arus listrik tidak sampai ke starter."
6. **Kalimat pendek.** Satu ide per kalimat. Hindari kalimat bertingkat dengan banyak anak kalimat.
7. **Humor tipis boleh, tapi tidak di topik keselamatan.** Di bagian rem, bensin bocor, dan kelistrikan, nada tenang dan tegas.
8. **Disclaimer tetap ada,** tetapi ditaruh di tempat yang relevan dan ditulis sebagai bantuan, bukan sebagai pembebasan tanggung jawab.

Contoh sebelum dan sesudah:

| Sebelum | Sesudah |
|---|---|
| Kemungkinan penyebab: aki lemah. | Aki kemungkinan besar sudah lemah. Ciri yang paling mudah dikenali: tombol starter hanya berbunyi "ngik-ngik" dan lampu meredup saat distarter. |
| Disarankan memeriksa busi. | Busi layak dicek. Busi yang aus membuat percikan api lemah, jadi campuran bensin dan udara sulit terbakar, terutama saat mesin masih dingin. |
| Segera periksa ke bengkel. | Jangan ditunda terlalu lama. Kalau dibiarkan, masalah kecil seperti ini bisa merembet ke komponen lain yang lebih mahal diperbaiki. |

Catatan: kalimat terakhir tidak menyebut angka biaya. Brief melarang perkiraan harga.

## 3. Struktur penjelasan

### 3.1 Entri Kamus Bengkel

Setiap istilah memakai kerangka yang sama supaya pembaca tahu ke mana harus melihat.

1. **Singkatnya** — satu kalimat: apa ini dan tugasnya.
2. **Bayangkan begini** — satu analogi.
3. **Apa yang terjadi di motormu** — cara kerja singkat, 2–4 kalimat.
4. **Tanda-tanda bermasalah** — gejala yang bisa dirasakan pengguna.
5. **Kalau dibiarkan** — konsekuensi, tanpa menakut-nakuti dan tanpa angka biaya.
6. **Boleh dicek sendiri?** — salah satu dari: Boleh (cek mudah) / Hati-hati (sebaiknya bengkel) / Bengkel saja. Disertai alasan.
7. **Tanya ini ke mekanik** — 2–3 pertanyaan yang membuat mekanik menjelaskan, bukan sekadar menyebut komponen.
8. **Sering dikaitkan dengan** — istilah terkait (tautan).

### 3.2 Hasil Keluhan

Setiap kemungkinan penyebab tampil sebagai blok dengan:

- **Nama penyebab** dan seberapa kuat dugaannya (paling mungkin / mungkin / kemungkinan kecil), diambil dari skor aturan.
- **Kenapa dugaan ini muncul** — sebutkan jawaban pengguna yang memicunya. Contoh: "Karena kamu bilang masalahnya muncul saat mesin dingin dan lampu agak redup."
- **Cara membedakannya** — satu ciri yang membuat penyebab ini berbeda dari yang lain.
- **Yang bisa kamu cek** — hanya jika aturan tidak `safety_lock`.
- **Yang sebaiknya diserahkan ke bengkel** — jika `safety_lock`.

Di atas semua blok: ringkasan keluhan dalam bahasa sehari-hari, lalu penjelasan tingkat urgensi (lihat bagian 5).

### 3.3 Tutorial

1. **Kenapa ini perlu dilakukan** — dua kalimat.
2. **Kapan sebaiknya dilakukan** — tanda atau situasi pemicu. Untuk jadwal berkala, ikuti buku manual motor.
3. **Sebelum mulai** — alat, waktu, kondisi motor (mesin dingin, di tempat datar, dsb.).
4. **Langkah** — setiap langkah berisi apa yang dilakukan dan **kenapa**.
5. **Tandanya sudah benar** — apa yang seharusnya terlihat atau terasa.
6. **Berhenti dan ke bengkel kalau** — tanda yang menunjukkan masalahnya lebih besar dari perkiraan.

## 4. Contoh isi jadi

### 4.1 Kamus: Busi

**Singkatnya:** Busi adalah komponen kecil yang memercikkan api di dalam mesin supaya bensin bisa terbakar.

**Bayangkan begini:** Busi itu seperti korek api untuk mesin. Tanpa percikan yang kuat, bensin dan udara di ruang bakar tidak menyala dengan baik.

**Apa yang terjadi di motormu:** Setiap kali mesin berputar, busi memercikkan api ribuan kali per menit. Seiring waktu ujungnya aus dan celah percikannya melebar. Percikan jadi lemah atau tidak teratur.

**Tanda-tanda bermasalah:**
- Susah hidup, terutama saat pagi atau mesin dingin.
- Mesin brebet (tersendat-sendat) saat digas.
- Tarikan terasa berat dan bensin terasa lebih boros.

**Kalau dibiarkan:** Pembakaran tidak sempurna. Tenaga turun, mesin cepat kotor, dan kamu akan makin sering kesulitan menghidupkan motor.

**Boleh dicek sendiri?** Hati-hati. Di sebagian motor busi mudah dijangkau, di sebagian lain tertutup bodi. Ikuti tutorial "Mengecek dan Mengganti Busi". Jika bodi atau komponen lain harus dibongkar, serahkan ke bengkel.

**Tanya ini ke mekanik:**
- "Kondisi busi saya seperti apa? Boleh saya lihat?"
- "Kalau busi diganti, keluhan saya diharapkan berubah seperti apa?"
- "Ada kemungkinan penyebab lain kalau busi baru pun belum membantu?"

### 4.2 Kamus: Aki dan sistem charging

**Singkatnya:** Aki menyimpan listrik untuk menyalakan starter dan perlengkapan listrik motor. Sistem charging mengisi ulang aki saat mesin hidup.

**Bayangkan begini:** Aki itu dompet, sistem charging itu pemasukan. Dompet yang kosong bisa karena terlalu banyak dipakai, tetapi bisa juga karena pemasukannya berhenti. Mengganti dompet tidak menyelesaikan masalah kalau pemasukannya memang bermasalah.

**Apa yang terjadi di motormu:** Saat mesin hidup, generator kecil di mesin menghasilkan listrik dan komponen pengatur menjaga tegangannya supaya aman. Sebagian listrik dipakai lampu, sebagian mengisi aki.

**Tanda-tanda bermasalah:**
- Starter berbunyi lemah atau "ngik-ngik", mesin tidak mau berputar.
- Lampu dan klakson meredup, terutama saat idle.
- Aki baru diganti tetapi cepat habis lagi. Ini petunjuk penting bahwa masalahnya bukan di aki saja.

**Kalau dibiarkan:** Motor bisa mati mendadak di jalan, dan sistem kelistrikan lain ikut terganggu.

**Boleh dicek sendiri?** Sebagian. Kamu boleh melihat apakah terminal aki berkarat atau longgar. Mengukur dan memperbaiki sistem charging adalah bagian kelistrikan utama, jadi serahkan ke bengkel.

**Tanya ini ke mekanik:**
- "Tegangan aki dan pengisian saat mesin hidup sudah diukur? Hasilnya berapa?"
- "Apakah akinya yang lemah, atau pengisiannya yang bermasalah?"

### 4.3 Kamus: CVT (motor matik)

**Singkatnya:** CVT adalah sistem transmisi motor matik yang mengatur perpindahan tenaga dari mesin ke roda secara otomatis tanpa gigi bertingkat.

**Bayangkan begini:** Seperti sepeda yang bisa mengubah "gigi" secara halus tanpa kamu memindahkan apa pun. Sabuknya berputar di antara dua puli yang bisa melebar dan menyempit.

**Apa yang terjadi di motormu:** Saat gas ditarik, roller (bola pemberat kecil) bergeser dan mengubah lebar puli. Sabuk (V-belt) ikut berpindah posisi sehingga perbandingan tenaganya berubah.

**Tanda-tanda bermasalah:**
- Motor bergetar saat mulai jalan.
- Tarikan terasa kasar atau mesin meraung tetapi motor tidak melaju.
- Terdengar bunyi berdecit atau menggerus dari area samping mesin.
- Tenaga lemah di tanjakan.

**Kalau dibiarkan:** Sabuk dan roller yang aus bisa merusak komponen CVT lain.

**Boleh dicek sendiri?** Bengkel saja. Ruang CVT berhubungan langsung dengan mesin dan perlu pembongkaran.

**Tanya ini ke mekanik:**
- "Kondisi V-belt dan roller saya bagaimana? Boleh saya lihat?"
- "Apakah ada komponen CVT lain yang sudah aus atau cukup diganti sebagian?"

### 4.4 Kamus: Kampas rem

**Singkatnya:** Kampas rem adalah lapisan yang bergesek dengan cakram atau tromol untuk memperlambat dan menghentikan motor.

**Bayangkan begini:** Seperti karet penghapus yang menggosok permukaan. Makin sering dipakai, makin tipis.

**Tanda-tanda bermasalah:**
- Rem berbunyi cit atau mendecit saat ditarik.
- Tuas atau pedal terasa lebih dalam sebelum motor melambat.
- Terdengar bunyi logam bergesek. Ini tanda kampas sudah habis. **Jangan dikendarai dulu.**

**Boleh dicek sendiri?** Kamu boleh melihat ketebalan kampas dan memeriksa apakah ada kebocoran minyak rem di sekitar. Membongkar, mengganti, atau menyetel sistem rem harus dilakukan di bengkel.

**Tanya ini ke mekanik:**
- "Sisa ketebalan kampas saya berapa dibandingkan batas amannya?"
- "Selain kampas, apakah cakram atau minyak rem juga perlu diperiksa?"

### 4.5 Contoh hasil keluhan

*Input pengguna: matik injeksi, "motor susah hidup pagi", masalah muncul saat mesin dingin, lampu agak redup, tidak ada asap.*

**Ringkasan keluhanmu**
Motor matik injeksimu sulit dihidupkan saat pagi atau mesin dingin. Lampu juga terlihat agak redup. Tidak ada asap atau kebocoran yang kamu sebutkan.

**Tingkat urgensi: Perlu segera diperiksa**
Motor masih mungkin dipakai, tetapi gejala seperti ini cenderung makin sering muncul. Kalau tiba-tiba mati di jalan, kamu bisa terjebak di tempat yang tidak nyaman.

**Dugaan yang paling mungkin**

1. **Aki lemah atau pengisian aki bermasalah** — *paling mungkin*
   - *Kenapa dugaan ini muncul:* kamu menyebut lampu redup dan masalah paling terasa saat mesin dingin, ketika aki harus bekerja paling keras.
   - *Cara membedakan:* kalau tombol starter hanya berbunyi lemah atau "ngik-ngik", aki jauh lebih mungkin jadi penyebab.
   - *Yang bisa kamu cek:* lihat apakah terminal aki berkarat atau longgar.
   - *Serahkan ke bengkel:* pengukuran tegangan dan sistem pengisian.

2. **Busi sudah aus** — *mungkin*
   - *Kenapa dugaan ini muncul:* busi yang lemah membuat mesin dingin sulit menyala.
   - *Cara membedakan:* mesin berputar normal saat distarter, tetapi tidak mau menyala atau baru menyala setelah beberapa kali coba.
   - *Yang bisa kamu cek:* lihat tutorial "Mengecek dan Mengganti Busi" kalau motormu mudah dijangkau.

3. **Pasokan bensin kurang lancar** — *kemungkinan kecil*
   - *Kenapa dugaan ini muncul:* pada motor injeksi, bensin dialirkan oleh pompa listrik. Jika pasokannya kurang, mesin sulit menyala.
   - *Cara membedakan:* biasanya terdengar bunyi dengung halus dari area tangki saat kunci pertama kali diputar ke ON. Kalau tidak ada, sampaikan ke mekanik.
   - *Serahkan ke bengkel:* sistem bensin tidak boleh dibongkar sendiri.

**Tanyakan ini ke mekanik**
- Apakah aki dan sistem pengisian sudah diukur sebelum ada komponen yang diganti?
- Bagaimana kondisi busi dan apa buktinya?
- Kalau yang pertama diganti belum menyelesaikan, langkah pemeriksaan berikutnya apa?

**Ingat:** ini kemungkinan awal, bukan diagnosis pasti. Teknisi yang memeriksa langsung motormu yang menentukan penyebab sebenarnya.

### 4.6 Tutorial: pembuka "Mengecek Tekanan Ban"

**Kenapa ini perlu:** Tekanan ban yang tepat membuat motor stabil, hemat, dan ban lebih awet. Ban kurang angin membuat motor terasa berat dan boros, serta lebih cepat aus di bagian tepinya.

**Kapan dilakukan:** Seminggu sekali, atau sebelum perjalanan jauh. Ukur saat ban masih dingin, belum dipakai jauh. Angka tekanan yang disarankan ada di stiker pada motor atau buku manual.

**Berhenti dan ke bengkel kalau:** ada benda tajam tertancap, benjolan di sisi ban, retak, atau tekanan turun lagi dalam waktu singkat setelah diisi.

## 5. Kalimat tingkat urgensi

Kamu bebas membuat variasi, selama tiga tingkat ini punya nada yang berbeda dan selalu menyebut konsekuensinya.

**Aman ditunda**
- "Masih aman dipakai. Catat dulu, dan sampaikan ke mekanik pada servis berikutnya."
- "Tidak mendesak, tetapi jangan dilupakan. Masalah kecil lebih mudah diselesaikan sebelum membesar."

**Perlu segera diperiksa**
- "Motor masih mungkin dipakai, tetapi sebaiknya diperiksa dalam waktu dekat. Gejala seperti ini jarang membaik sendiri."
- "Jangan ditunda terlalu lama. Kalau dibiarkan, bisa membuat motor mati mendadak atau merusak komponen lain."

**Jangan dikendarai dulu**
- "Berhenti dulu. Masalah ini menyangkut keselamatan, jadi sebaiknya motor dibawa ke bengkel tanpa dikendarai lebih jauh."
- "Untuk keselamatanmu, jangan dipakai dulu. Minta bantuan teknisi atau derek."

Untuk tingkat ini, tidak boleh ada saran bongkar sendiri.

## 6. Variasi kalimat pembuka (supaya hasil tidak terasa seragam)

Aturan memilih varian bisa diacak, tetapi isi penyebab dan urgensi tetap berasal dari mesin aturan.

- "Dari ceritamu, ada beberapa hal yang layak dicek."
- "Gejala yang kamu sebut cukup khas. Ini yang paling sering jadi penyebabnya."
- "Biar tidak bingung di bengkel, ini ringkasan keluhanmu."
- "Sebelum ke bengkel, kamu sudah punya pegangan. Ini dugaan awalnya."

Tambahkan juga satu "Tahukah kamu?" atau "Tips bengkel" per gejala, berisi fakta singkat yang membantu pembaca mengenali motornya sendiri. Contoh: "Aki yang baru diganti tetapi cepat habis lagi sering kali bukan salah akinya."

## 7. Aturan yang tidak boleh dilanggar saat menulis konten

- Tidak ada angka harga atau perkiraan biaya.
- Tidak menyebut hasil sebagai diagnosis pasti.
- Topik rem, bensin bocor, kelistrikan utama, mesin, dan motor listrik: selalu arahkan ke bengkel, tanpa saran bongkar sendiri.
- Tidak menuduh bengkel tertentu.
- Analogi tidak boleh mengubah fakta teknis. Kalau ragu, pilih penjelasan yang lebih sederhana tetapi benar.
- Setiap tutorial tetap memuat peringatan keselamatan dan kapan harus berhenti.
- Angka teknis spesifik (jarak ganti oli, tekanan ban, celah busi) tidak ditulis dari ingatan. Arahkan ke buku manual motor atau stiker pada motor.

## 8. Prompt untuk OpenCode

```text
Baca PROJECT_BRIEF.md dan PANDUAN_KONTEN.md. Fokus tugas ini hanya pada isi teks, bukan desain.

Tugas:
1. Ubah struktur data glossary agar mengikuti kerangka di bagian 3.1 PANDUAN_KONTEN.md
   (singkatnya, analogi, cara kerja, tanda bermasalah, kalau dibiarkan,
   boleh dicek sendiri, pertanyaan untuk mekanik, istilah terkait).
2. Tulis ulang 17 istilah kamus yang ada di brief mengikuti contoh bagian 4.1 sampai 4.4.
3. Ubah template hasil keluhan agar mengikuti bagian 3.2 dan contoh 4.5:
   setiap penyebab memuat "kenapa dugaan ini muncul" (diambil dari jawaban pengguna),
   "cara membedakan", dan pemisahan "yang bisa kamu cek" vs "serahkan ke bengkel".
4. Tambahkan variasi kalimat pembuka dan kalimat urgensi seperti bagian 5 dan 6.
5. Perbarui 10 tutorial agar mengikuti struktur bagian 3.3.
6. Jangan ubah mesin aturan, safety_lock, atau tampilan visual.
7. Sebelum mulai, tunjukkan daftar file yang akan diubah dan minta konfirmasi.
```
