# 01 — Rencana Arsitektur

## 1. Tujuan dan batasan

RideCare adalah website edukasi dan asisten persiapan servis motor. Fokus MVP adalah membantu pengguna menyusun keluhan, memahami kemungkinan penyebab, dan datang ke bengkel dengan pertanyaan yang jelas.

Batasan yang tidak boleh dilanggar:

- Gratis: tanpa API berbayar.
- Analisis keluhan memakai mesin aturan, bukan AI.
- MVP berjalan tanpa login.
- Kategori keselamatan dikunci di kode dan selalu mengarahkan ke bengkel.
- Tidak menampilkan perkiraan harga perbaikan.
- Disclaimer "bukan diagnosis pasti" selalu tampil pada hasil.
- Bahasa antarmuka: Bahasa Indonesia sederhana.
- TypeScript dan pemisahan mesin analisis dari UI.

## 2. Stack

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Framework | Next.js (App Router) | Rute berbasis folder, server/client component |
| Bahasa | TypeScript (strict) | Tipe bersama untuk input, aturan, dan hasil |
| Styling | Tailwind CSS | Mobile-first, design token di `globals.css` |
| Database (tahap berikutnya) | Supabase (paket gratis) | PostgreSQL + Auth + Storage + RLS |
| Hosting (tahap berikutnya) | Vercel (paket gratis) | Deploy dari repositori |
| Analisis MVP | Mesin aturan lokal | Pure functions, tanpa jaringan |

Tidak ada dependency AI pada MVP. Tidak ada panggilan jaringan saat menganalisis keluhan.

## 3. Prinsip arsitektur

1. **Aturan adalah data, bukan logika tersebar.** Data aturan disimpan sebagai file TypeScript/JSON di `src/data/rules/`, terpisah dari komponen UI.
2. **Mesin analisis pure dan deterministik.** Input yang sama menghasilkan output yang sama; tidak membaca browser API, database, atau jaringan.
3. **UI hanya menampilkan.** Komponen tidak menghitung urgensi atau memilih penyebab; semua keputusan ada di `src/lib/analysis/`.
4. **Keselamatan berlapis.** Selain aturan data, ada pengaman di kode (`safety.ts`) yang memaksa kategori berisiko selalu mengarah ke bengkel.
5. **Tanpa login sejak awal.** State MVP disimpan di memori halaman; `localStorage` hanya jika benar-benar diperlukan.
6. **Adapter AI disiapkan sebagai titik sambung, bukan fitur MVP.** Antarmuka adapter tidak dipakai sampai tahap berikutnya.

## 4. Lapisan dan tanggung jawab

```text
┌─────────────────────────────────────────────────────────────┐
│  app/ + components/           UI, rute, form, tampilan hasil  │
│  - tidak berisi aturan analisis                              │
│  - memanggil lib/analysis dan lib/templates                  │
└───────────────────────────┬─────────────────────────────────┘
                            │ AnalysisInput / AnalysisResult
┌───────────────────────────▼─────────────────────────────────┐
│  lib/analysis/               Mesin aturan (pure)             │
│  - normalize, scoring, engine, urgency, safety               │
│  - impor data dari data/rules                                │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  data/rules/                 Data aturan (TypeScript/JSON)   │
│  - tanpa impor React/DOM                                     │
└─────────────────────────────────────────────────────────────┘

lib/templates/   → ringkasan keluhan, checklist, pesan WhatsApp
data/tutorials/  → konten tutorial
data/glossary/   → kamus istilah
types/           → tipe bersama
```

Aturan dependency:

- `data/rules` tidak boleh mengimpor `components`, `app`, atau `lib/analysis`.
- `lib/analysis` boleh mengimpor `data/rules` dan `types`, tidak boleh mengimpor React/DOM.
- `components` boleh mengimpor hasil mesin, tidak boleh menduplikasi logika skor/urgensi.
- `lib/templates` menerima `AnalysisResult` dan data pendukung, menghasilkan teks.

## 5. Alur data analisis

```text
Pengguna memilih jenis motor
        │
        ▼
Mengisi keluhan bebas + pertanyaan pendamping
        │
        ▼
AnalysisInput  ──────────────►  lib/analysis
        │                        1. normalisasi teks
        │                        2. cocokkan keyword + tipe + kondisi
        │                        3. hitung skor tiap aturan
        │                        4. tentukan penyebab (skor tertinggi)
        │                        5. ambil urgensi tertinggi
        │                        6. terapkan safety lock
        │                        7. susun tutorial + pertanyaan mekanik
        │                        8. fallback jika tidak ada aturan cocok
        ▼
AnalysisResult
        ├──► Halaman hasil
        ├──► Checklist anti getok harga
        ├──► Pesan untuk mekanik (template WhatsApp)
        └──► Rekomendasi tutorial
```

`AnalysisInput` minimal berisi:

- `complaint` — teks keluhan bebas.
- `motorcycleType` — `bebek | matik | sport | listrik`.
- `answers` — jawaban pertanyaan pendamping (suhu mesin, indikator, asap, bau, kebocoran, riwayat ganti komponen, kecelakaan/banjir, dan sebagainya).

`AnalysisResult` minimal berisi:

- `summary` — ringkasan keluhan yang rapi.
- `possibleCauses` — penyebab dari aturan dengan skor tertinggi, berurutan.
- `componentsToCheck` — komponen yang perlu diperiksa.
- `urgency` — `aman_ditunda | perlu_segera_diperiksa | jangan_dikendarai`.
- `safetyLocked` — apakah hasil terkena aturan keselamatan.
- `safetyCategories` — kategori keselamatan yang cocok.
- `recommendedTutorials` — slug tutorial relevan.
- `mechanicQuestions` — pertanyaan tambahan untuk mekanik.
- `checklist` — checklist anti getok harga.
- `disclaimer` — teks disclaimer wajib.
- `matchedRuleIds` — untuk debugging dan pengujian.

Detail format ada di [04-format-aturan.md](./04-format-aturan.md).

## 6. Aturan keselamatan berlapis

Kategori yang dikunci: `rem`, `kebocoran_bahan_bakar`, `kelistrikan_utama`, `mesin`, `motor_listrik`.

Pengamanan dilakukan di dua tempat:

1. **Data aturan:** setiap aturan kategori tersebut memiliki `safety_lock: true` dan `safety_category`.
2. **Kode:** `lib/analysis/safety.ts` memeriksa hasil akhir. Jika ada aturan keselamatan yang cocok, hasil dipaksa:
   - `safetyLocked = true`
   - urgensi minimal `perlu_segera_diperiksa`; aturan akut (rem blong, kebocoran bahan bakar, korsleting, overheat berat, tegangan tinggi motor listrik) menetapkan `jangan_dikendarai`
   - tidak ada langkah bongkar sendiri
   - CTA utama menuju bengkel/teknisi
   - peringatan keselamatan ditampilkan di atas konten lain

AI (tahap berikutnya) tidak boleh mengubah `urgency`, `safetyLocked`, atau `safetyCategories`.

## 7. Adapter AI opsional (tahap berikutnya)

Titik sambung yang disiapkan:

```text
lib/analysis/
  engine.ts        ← mesin aturan (selalu ada)
  adapter.ts       ← antarmuka adapter AI (nanti)
```

Prinsip adapter:

- Hanya merapikan kalimat keluhan dan menambah kemungkinan penyebab.
- Tidak menentukan urgensi akhir.
- Tidak menimpa hasil aturan keselamatan.
- Jika gagal, kuota habis, atau dimatikan: otomatis kembali ke hasil mesin aturan.
- Penyedia memakai paket gratis dan dapat diganti tanpa mengubah UI.

Adapter tidak dibuat pada MVP.

## 8. Persistensi data

| Data | MVP | Tahap berikutnya |
|---|---|---|
| Jawaban form | State di halaman | Disimpan ke akun setelah login |
| Hasil analisis | Ditampilkan, tidak disimpan permanen | Disimpan ke `complaints` |
| Motor pengguna | Tidak ada | `motorcycles` |
| Riwayat servis | Tidak ada | `service_records` |
| Foto nota | Tidak ada | Supabase Storage (batas ukuran) |
| Preferensi ringan | `localStorage` bila perlu | Dipindahkan ke akun |

Catatan: `localStorage` hanya untuk kenyamanan (mis. melanjutkan form), bukan sumber kebenaran. Data harus bisa dihapus pengguna.

## 9. Rute halaman

| Rute | Halaman |
|---|---|
| `/` | Beranda |
| `/keluhan` | Pilih jenis motor + form keluhan + pertanyaan pendamping |
| `/hasil` | Hasil analisis awal |
| `/checklist` | Checklist anti getok harga |
| `/pesan-mekanik` | Pesan siap salin untuk mekanik |
| `/kamus` | Kamus bengkel |
| `/tutorial` | Daftar tutorial |
| `/tutorial/[slug]` | Detail tutorial |
| `/tentang` | Tentang dan disclaimer keselamatan |

Rute `/hasil`, `/checklist`, dan `/pesan-mekanik` membutuhkan state analisis. Untuk MVP, state dapat dibawa lewat `sessionStorage`/`localStorage` dengan fallback kembali ke `/keluhan` jika kosong.

## 10. Non-functional

- **Mobile-first:** target lebar 360–430 px, tombol besar, navigasi sederhana.
- **Aksesibilitas:** label form eksplisit, kontras memadai, fokus terlihat, status tidak hanya dibedakan warna.
- **Performa:** mesin aturan berjalan lokal; tidak ada panggilan jaringan pada alur utama.
- **Privasi:** tidak ada pelacakan wajib; jangan minta data pribadi yang tidak perlu.
- **Keterbacaan:** kalimat pendek, istilah teknis diberi penjelasan atau tautan ke kamus.

## 11. Keputusan dan alasan

| Keputusan | Alasan |
|---|---|
| Mesin aturan, bukan AI | Gratis, deterministik, mudah diuji, aman untuk keselamatan |
| App Router | Struktur rute jelas, cocok untuk halaman statis + form |
| Data aturan sebagai file | Mudah ditinjau dan diuji; tidak perlu database di MVP |
| Supabase dirancang sejak awal | Menghindari migrasi besar saat login ditambahkan |
| RLS sejak desain | Keamanan data pengguna sejak tahap pertama |
| Tanpa login di MVP | Mengurangi hambatan dan kompleksitas |
| Tanpa estimasi harga | Menghindari klaim yang tidak akurat dan risiko misleading |

## 12. Non-goals MVP

- Diagnosis pasti atau pengganti mekanik.
- Perhitungan/estimasi biaya.
- Rekomendasi bongkar komponen berisiko.
- Login, riwayat, jadwal, peta, notifikasi, AI.
- Integrasi pembayaran atau layanan berbayar.
