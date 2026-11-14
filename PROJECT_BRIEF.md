# RideCare — Project Brief

## Ringkasan Proyek

**Nama website:** RideCare  
**Tagline:** “Pahami motormu, hindari digetok.”  
**Jenis proyek:** Website edukasi dan asisten persiapan servis motor untuk pemilik motor di Indonesia.  
**Target pengguna:** Pemilik sepeda motor, terutama pemula yang belum memahami istilah bengkel, perawatan rutin, dan proses servis.

RideCare membantu pengguna memahami kondisi motor, menyusun keluhan sebelum ke bengkel, mendapatkan edukasi perawatan, dan menghindari biaya servis yang tidak transparan. Website ini bukan pengganti mekanik profesional, melainkan alat bantu agar pengguna lebih siap dan terlindungi sebelum melakukan servis.

## Keputusan Arsitektur (Terbaru)

Keputusan ini menggantikan bagian lain di dokumen ini jika ada yang bertentangan.

1. **Proyek harus gratis.** Tidak memakai API berbayar (termasuk Claude API) pada MVP.
2. **Analisis keluhan memakai mesin aturan (rule-based), bukan AI.** Keluhan dan jawaban pertanyaan pendamping dipetakan ke tabel aturan: gejala → kemungkinan penyebab → komponen yang diperiksa → tingkat urgensi. Ringkasan dan pesan WhatsApp disusun dari template.
3. **Aturan keselamatan dikunci di kode.** Untuk rem, kebocoran bahan bakar, kelistrikan utama, mesin, dan motor listrik, hasil selalu mengarahkan pengguna ke bengkel atau teknisi. Tidak ada AI yang bisa menimpa aturan ini.
4. **Lapisan AI bersifat opsional dan datang belakangan (hybrid).**
   - Dipasang lewat adapter sehingga penyedia AI bisa diganti atau dimatikan tanpa mengubah fitur lain.
   - Prioritas penyedia: paket gratis (misalnya Gemini atau Groq; cek syarat dan kuota terbaru sebelum dipakai). Claude API hanya jika nanti ada dana.
   - Fungsi AI terbatas pada merapikan kalimat keluhan dan menambah kemungkinan penyebab. Urgensi dan aturan keselamatan tetap ditentukan mesin aturan.
   - Jika kuota habis atau AI gagal, website otomatis kembali ke mesin aturan.
5. **MVP tanpa login.**
   - Form keluhan, hasil, checklist, pesan WhatsApp, kamus, dan tutorial bisa dipakai tanpa akun.
   - Penyimpanan sementara memakai localStorage di browser jika diperlukan.
6. **Login ditambahkan di tahap berikutnya**, bersamaan dengan fitur Riwayat Servis dan Jadwal Perawatan.
   - Metode awal: Google login lewat Supabase.
   - Data localStorage dapat dipindahkan ke akun saat pengguna mendaftar.
7. **Skema database dan keamanan dirancang sejak Tahap 1** walaupun login belum dibuat. Aktifkan Row Level Security (RLS) di Supabase agar setiap pengguna hanya bisa mengakses datanya sendiri.
8. **Hosting dan database:** paket gratis Vercel dan Supabase. Batasi ukuran foto nota agar penyimpanan tidak cepat penuh.
9. **Ditunda:** peta bengkel (Leaflet), notifikasi, dan analisis bebas lewat AI.

## Masalah yang Diselesaikan

- Banyak pemilik motor tidak memahami istilah bengkel dan komponen motor.
- Pengguna sering kesulitan menjelaskan keluhan motor kepada mekanik.
- Pengguna tidak tahu komponen mana yang benar-benar perlu diganti.
- Biaya servis dapat membengkak karena tidak ada estimasi awal, konfirmasi, atau penjelasan sebelum perbaikan.
- Tutorial perbaikan motor tersebar dan tidak terstruktur berdasarkan jenis motor serta tingkat kesulitan.

## Tujuan Website

1. Membantu pengguna menjelaskan keluhan motor sebelum ke bengkel.
2. Memberikan edukasi perawatan dan servis motor.
3. Menyediakan tutorial perbaikan dasar yang aman.
4. Membantu pengguna menghindari praktik “tembak harga” atau biaya servis tidak transparan.
5. Menyimpan riwayat keluhan dan servis motor pengguna (tahap berikutnya, setelah login tersedia).

## Fitur Utama

### 1. Ceritakan Keluhan Motormu

Pengguna dapat menulis keluhan motor dengan bahasa sehari-hari.

Contoh keluhan:

- “Motor saya susah hidup pagi.”
- “Motor mati saat berhenti di lampu merah.”
- “Rem berbunyi.”
- “Motor lemah saat menanjak.”
- “Rantai berderak.”
- “Lampu redup dan aki cepat habis.”
- “Motor brebet saat digas.”
- “Knalpot berasap putih.”

Setelah pengguna menulis keluhan, website menanyakan pertanyaan pendamping:

- Jenis motor: bebek, matik, sport, injeksi, karburator, atau motor listrik.
- Kapan masalah mulai muncul.
- Apakah masalah terjadi saat mesin dingin atau panas.
- Apakah ada lampu indikator menyala.
- Apakah ada suara, asap, bau, atau kebocoran.
- Apakah sudah pernah diganti komponen.
- Apakah masalah hilang setelah motor dipakai beberapa menit.
- Apakah motor pernah mengalami kecelakaan atau banjir.

Website kemudian menghasilkan (melalui mesin aturan):

- Ringkasan keluhan yang rapi.
- Kemungkinan penyebab masalah.
- Komponen yang perlu diperiksa.
- Tingkat urgensi: aman ditunda, perlu segera diperiksa, atau jangan dikendarai dulu.
- Rekomendasi tutorial yang relevan.
- Checklist pertanyaan untuk mekanik.

Penting: hasil analisis adalah kemungkinan awal, bukan diagnosis pasti. Website wajib menampilkan disclaimer bahwa pemeriksaan akhir harus dilakukan oleh teknisi atau bengkel.

#### Mesin Analisis Keluhan (Rule-Based)

Struktur data aturan disimpan sebagai file TypeScript/JSON agar mudah ditambah dan diuji. Gambaran struktur:

```text
Rule:
- id
- keywords: kata kunci / frasa keluhan (termasuk variasi bahasa sehari-hari)
- applicable_types: bebek, matik, sport, listrik
- conditions: kondisi dari pertanyaan pendamping (dingin/panas, indikator, asap, dll.)
- possible_causes: daftar kemungkinan penyebab, berurutan dari yang paling umum
- components_to_check: komponen yang perlu diperiksa
- urgency: aman_ditunda | perlu_segera_diperiksa | jangan_dikendarai
- safety_lock: true jika kategori wajib diarahkan ke bengkel (rem, bensin bocor, kelistrikan utama, mesin, motor listrik)
- related_tutorials: slug tutorial yang relevan
- mechanic_questions: pertanyaan tambahan untuk mekanik
```

Aturan pemrosesan:

- Jika beberapa aturan cocok, tampilkan penyebab dari aturan dengan skor kecocokan tertinggi.
- Tingkat urgensi akhir selalu diambil dari yang paling tinggi di antara aturan yang cocok.
- Aturan dengan `safety_lock` tidak boleh menampilkan saran bongkar sendiri.
- Jika tidak ada aturan yang cocok, tampilkan hasil umum: ringkasan keluhan, checklist anti getok harga, dan saran periksa ke bengkel.

### 2. Buat Pesan untuk Mekanik

Setelah pengguna mengisi keluhan, website menghasilkan pesan WhatsApp yang siap disalin dan dikirim ke mekanik.

Contoh hasil pesan:

```text
Halo, saya ingin servis motor matik 125 cc.

Keluhan:
- Susah hidup saat pagi.
- Kadang mati sendiri saat idle.
- Lampu agak redup.

Riwayat singkat:
- Oli sudah diganti, tetapi keluhan tetap ada.

Mohon periksa:
- Aki.
- Sistem charging.
- Busi.
- Idle atau throttle body.

Sebelum perbaikan, mohon informasikan:
- Penyebab kerusakan.
- Komponen yang perlu diganti.
- Estimasi biaya jasa dan sparepart.
- Waktu pengerjaan.

Mohon konfirmasi terlebih dahulu sebelum penggantian komponen.

Terima kasih.
```

### 3. Checklist Anti Getok Harga

Setiap pengguna yang membuat keluhan mendapat checklist sebelum ke bengkel:

- Jelaskan gejala secara spesifik.
- Minta mekanik memeriksa sebelum membongkar komponen besar.
- Minta estimasi biaya jasa dan sparepart.
- Tanyakan apakah estimasi bisa berubah setelah pemeriksaan.
- Minta konfirmasi sebelum komponen diganti.
- Tanyakan alasan komponen harus diganti.
- Minta bukti foto atau video komponen rusak bila memungkinkan.
- Tanyakan apakah ada alternatif perbaikan yang lebih murah.
- Minta komponen lama dikembalikan.
- Minta nota rinci berisi jasa, sparepart, dan total biaya.
- Jangan setujui pekerjaan tambahan tanpa penjelasan.

### 4. Kamus Bengkel

Halaman kamus berisi penjelasan istilah dan komponen motor dengan bahasa sederhana.

Contoh istilah:

- Busi
- Aki
- Oli mesin
- Filter udara
- Rantai
- Kampas rem
- Karburator
- Injector
- Throttle body
- CVT
- Sistem charging
- Sensor
- Knalpot
- Ban dan tekanan angin
- Servis rutin
- Tune-up
- Overhaul

### 5. Tutorial DIY Bertingkat

Website memiliki tutorial perbaikan dan perawatan dasar yang aman.

Setiap tutorial harus memiliki:

- Judul.
- Jenis motor yang relevan.
- Tingkat kesulitan: mudah, sedang, atau sulit.
- Alat yang dibutuhkan.
- Perkiraan waktu.
- Langkah-langkah bergambar atau video.
- Peringatan keselamatan.
- Kapan pengguna harus berhenti dan membawa motor ke bengkel.

Contoh tutorial:

- Mengecek tekanan ban.
- Mengganti oli mesin.
- Mengecek dan mengganti busi.
- Menyetel rantai.
- Mengecek kampas rem.
- Mengecek aki dan terminal baterai.
- Membersihkan filter udara.
- Mengecek lampu dan kelistrikan dasar.
- Mengecek kebocoran oli atau bahan bakar.
- Perawatan dasar motor listrik.

### 6. Jadwal Perawatan (Tahap Berikutnya, Perlu Login)

Pengguna dapat menyimpan data motor dan mendapatkan pengingat perawatan berkala, seperti:

- Ganti oli.
- Cek rantai.
- Cek kampas rem.
- Cek tekanan ban.
- Servis berkala.
- Cek aki.
- Cek busi.

### 7. Riwayat Servis / Servis Passport (Tahap Berikutnya, Perlu Login)

Pengguna dapat menyimpan riwayat servis motor, meliputi:

- Tanggal servis.
- Kilometer.
- Jenis servis.
- Komponen yang diganti.
- Biaya.
- Foto nota servis.
- Catatan mekanik.
- Keluhan yang pernah dialami.

## Struktur Halaman

1. Beranda
2. Pilih Jenis Motor
3. Ceritakan Keluhan Motormu
4. Hasil Diagnosis Awal
5. Pesan untuk Mekanik
6. Checklist Anti Getok Harga
7. Kamus Bengkel
8. Tutorial DIY
9. Jadwal Perawatan (tahap berikutnya)
10. Riwayat Servis (tahap berikutnya)
11. Tentang dan Keselamatan

## Alur Pengguna

**Alur MVP (tanpa login):**

1. Pengguna membuka website.
2. Memilih jenis motor.
3. Menulis keluhan.
4. Menjawab pertanyaan pendamping.
5. Mendapat ringkasan keluhan dan kemungkinan penyebab.
6. Melihat tutorial jika masalahnya sederhana.
7. Mendapat checklist pertanyaan untuk bengkel.
8. Menyalin pesan WhatsApp untuk mekanik.

**Alur tahap berikutnya (dengan login):**

9. Masuk dengan Google dan menyimpan riwayat servis di akun.
10. Mendapat pengingat perawatan berikutnya.

## Desain Website

- Mobile-first karena banyak pengguna membuka dari ponsel.
- Tampilan modern, bersih, profesional, dan tepercaya.
- Warna utama: hitam atau abu gelap, putih, dengan aksen kuning atau oranye.
- Gunakan kartu informasi, langkah bernomor, badge tingkat kesulitan, ikon otomotif, dan tombol yang jelas.
- Halaman diagnosis harus terasa seperti percakapan singkat, bukan formulir panjang yang membingungkan.
- Bahasa antarmuka menggunakan Bahasa Indonesia yang sederhana dan mudah dipahami pemula.

## Teknologi

- Frontend: Next.js dan Tailwind CSS.
- Bahasa: TypeScript.
- Backend dan database: Supabase (paket gratis).
- Hosting: Vercel (paket gratis).
- Analisis keluhan: mesin aturan (rule-based) di sisi aplikasi. Tanpa biaya API.
- AI (opsional, tahap berikutnya): lewat adapter, memakai penyedia dengan paket gratis. Dapat dimatikan kapan saja. Claude API hanya jika nanti ada dana.
- Autentikasi (tahap berikutnya): Google login lewat Supabase. Email menyusul jika diperlukan.
- Penyimpanan foto nota (tahap berikutnya): Supabase Storage, dengan batas ukuran file.
- Peta: Leaflet, hanya jika nanti menambahkan direktori bengkel.
- Notifikasi: Email atau WhatsApp link (tahap berikutnya).

## Skema Database Awal

Skema dirancang sejak awal, walaupun tabel akun dan riwayat baru dipakai setelah login dibuat. Aktifkan Row Level Security (RLS) pada tabel milik pengguna: `motorcycles`, `complaints`, dan `service_records`.

### users

- id
- email
- name
- created_at

### motorcycles

- id
- user_id
- brand
- model
- type: bebek, matik, sport, listrik
- fuel_type: bensin, listrik
- transmission: manual, matic, listrik
- year
- plate_number
- current_km
- created_at

### complaints

- id
- user_id (boleh kosong untuk pengguna tanpa login)
- motorcycle_id
- raw_complaint
- selected_symptoms
- answers
- summary
- possible_causes
- urgency_level
- recommended_checks
- created_at

### service_records

- id
- user_id
- motorcycle_id
- complaint_id
- service_date
- odometer_km
- service_type
- replaced_parts
- labor_cost
- parts_cost
- total_cost
- notes
- receipt_image_url
- created_at

### tutorials

- id
- title
- slug
- motorcycle_type
- difficulty
- estimated_time
- tools_required
- safety_warnings
- steps
- video_url
- created_at

### glossary

- id
- term
- definition
- category
- related_components

### complaint_rules (opsional, jika aturan dipindah ke database)

Pada awalnya aturan disimpan sebagai file di repositori. Jika nanti perlu diedit tanpa deploy ulang, pindahkan ke tabel ini.

- id
- keywords
- applicable_types
- conditions
- possible_causes
- components_to_check
- urgency
- safety_lock
- related_tutorials
- mechanic_questions

## MVP Versi Pertama

Untuk tahap awal, buat fitur berikut terlebih dahulu (tanpa login, tanpa API berbayar):

1. Beranda.
2. Form “Ceritakan Keluhan Motormu.”
3. Hasil ringkasan keluhan (mesin aturan + template).
4. Kemungkinan penyebab berdasarkan gejala.
5. Checklist anti getok harga.
6. Tombol “Buat Pesan untuk Mekanik.”
7. Kamus bengkel sederhana.
8. 10 tutorial perawatan dasar.
9. Halaman tentang dan disclaimer keselamatan.

## Aturan Konten dan Keselamatan

- Gunakan Bahasa Indonesia yang sederhana.
- Jangan menggunakan istilah teknis tanpa penjelasan.
- Jangan menyebut hasil analisis sebagai diagnosis pasti.
- Selalu tampilkan disclaimer bahwa pemeriksaan akhir harus dilakukan teknisi.
- Untuk masalah rem, kebocoran bahan bakar, kelistrikan utama, mesin, dan motor listrik, arahkan pengguna ke bengkel atau teknisi kompeten.
- Jangan mendorong pengguna membongkar komponen berisiko sendiri.
- Tampilkan peringatan keselamatan pada setiap tutorial.
- Jangan menuduh bengkel tertentu; fokus pada edukasi konsumen dan transparansi.
- Jangan menampilkan perkiraan harga perbaikan. Biaya harus diminta dari mekanik sebagai estimasi tertulis sebelum pekerjaan dimulai.

## Disclaimer Wajib

“RideCare membantu menyusun keluhan dan memberikan kemungkinan pemeriksaan awal. Hasil ini bukan diagnosis pasti. Untuk pemeriksaan, perbaikan, dan keputusan penggantian komponen, gunakan jasa teknisi atau bengkel yang kompeten. Jangan melakukan perbaikan yang berisiko jika kamu tidak yakin.”

## Instruksi untuk AI Coding

Saat membangun proyek ini:

1. Buat rencana arsitektur dan struktur folder terlebih dahulu.
2. Buat wireframe atau sketsa UI untuk setiap halaman.
3. Buat skema database.
4. Buat alur pengguna.
5. Buat komponen UI yang dapat digunakan ulang.
6. Bangun fitur satu per satu, mulai dari MVP.
7. Jangan langsung membuat seluruh kode sekaligus.
8. Tanyakan konfirmasi sebelum melanjutkan ke tahap berikutnya.
9. Gunakan TypeScript.
10. Buat kode yang rapi, modular, mudah dikembangkan, dan responsif.
11. Patuhi bagian “Keputusan Arsitektur (Terbaru)”: proyek gratis, mesin aturan untuk MVP, MVP tanpa login.
12. Pisahkan mesin analisis keluhan dari antarmuka agar mudah diuji dan mudah dipasangi adapter AI nanti.

## Prompt Awal untuk OpenCode

```text
Baca file PROJECT_BRIEF.md dengan teliti, terutama bagian "Keputusan Arsitektur (Terbaru)".

Proyek ini bernama RideCare: website edukasi dan asisten persiapan servis motor untuk pemilik motor di Indonesia. Fokus utamanya adalah membantu pengguna menyusun keluhan sebelum ke bengkel, memahami perawatan motor, dan menghindari biaya servis yang tidak transparan.

Proyek ini harus gratis: tanpa API berbayar, analisis keluhan memakai mesin aturan (rule-based), dan MVP berjalan tanpa login.

Mulai dari tahap 1:
- Buat rencana arsitektur proyek.
- Buat struktur folder Next.js + TypeScript + Tailwind CSS.
- Buat skema database Supabase (termasuk rencana Row Level Security).
- Buat format data aturan keluhan untuk mesin analisis.
- Buat alur pengguna.
- Buat wireframe UI untuk halaman utama.
- Jangan membuat kode dulu.
- Setelah selesai, tampilkan rencananya dan tanyakan apakah saya ingin melanjutkan.
```

## Prompt Tahap Berikutnya

```text
Lanjutkan ke tahap 2:
Buat proyek Next.js + TypeScript + Tailwind CSS + Supabase.
Buat struktur folder, konfigurasi dasar, halaman beranda, layout, dan komponen UI dasar.
Jangan membuat seluruh fitur sekaligus.
```

```text
Buat fitur “Ceritakan Keluhan Motormu” terlebih dahulu:
- Form input keluhan.
- Pertanyaan pendamping.
- Mesin analisis keluhan berbasis aturan (tanpa API berbayar).
- Hasil ringkasan keluhan.
- Kemungkinan penyebab berdasarkan gejala.
- Tingkat urgensi.
- Checklist anti getok harga.
- Tombol “Buat Pesan untuk Mekanik”.
- Disclaimer bahwa hasil bukan diagnosis pasti.
- Tanpa login.
```

```text
Tahap lanjutan (setelah MVP berjalan):
- Tambahkan adapter AI opsional dengan penyedia paket gratis, dengan fallback otomatis ke mesin aturan.
- Tambahkan login Google lewat Supabase.
- Bangun Riwayat Servis dan Jadwal Perawatan dengan Row Level Security.
```

## Nama Alternatif

- RideCare (nama terpilih)
- BengkelPintar (nama sebelumnya)
- MotorPaham
- ServisAman
- MotorCheck
- ServisPaham
