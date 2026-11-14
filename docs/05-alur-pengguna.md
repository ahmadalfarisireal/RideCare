# 05 — Alur Pengguna

## 1. Prinsip alur

- Mobile-first: alur utama harus selesai dalam beberapa langkah pendek di layar ponsel.
- Tanpa login pada MVP.
- Pengguna boleh berhenti di mana saja; tidak ada data yang wajib disimpan permanen.
- Hasil selalu berupa "kemungkinan", bukan diagnosis pasti.
- Kategori keselamatan tidak pernah menawarkan langkah bongkar sendiri.

## 2. Alur MVP (tanpa login)

```text
Beranda
  │ "Ceritakan keluhan motormu"
  ▼
Pilih jenis motor
  │ bebek / matik / sport / listrik
  ▼
Tulis keluhan (bahasa sehari-hari)
  │
  ▼
Pertanyaan pendamping (opsional, boleh "tidak tahu")
  │ kapan mulai, suhu mesin, indikator, suara/asap/bau/bocor,
  │ riwayat ganti komponen, hilang setelah panas, kecelakaan/banjir
  ▼
Analisis (mesin aturan, lokal)
  │
  ▼
Halaman Hasil
  ├── Ringkasan keluhan
  ├── Kemungkinan penyebab (bukan diagnosis)
  ├── Komponen yang perlu diperiksa
  ├── Tingkat urgensi
  ├── Peringatan keselamatan (jika safety lock)
  ├── Disclaimer wajib
  └── Aksi:
        ├── Lihat checklist anti getok harga
        ├── Buat pesan untuk mekanik
        └── Lihat tutorial relevan (jika bukan safety lock)
```

### Langkah detail

| # | Langkah | Layar | Input | Output/State |
|---|---|---|---|---|
| 1 | Mulai | Beranda | — | Navigasi ke `/keluhan` |
| 2 | Pilih motor | `/keluhan` | `motorcycleType` | State form |
| 3 | Tulis keluhan | `/keluhan` | `complaint` | State form |
| 4 | Jawab pertanyaan | `/keluhan` | `answers` | State form |
| 5 | Analisis | transisi | `AnalysisInput` | `AnalysisResult` |
| 6 | Lihat hasil | `/hasil` | — | Hasil + disclaimer |
| 7 | Checklist | `/checklist` | — | Checklist 11 poin |
| 8 | Pesan mekanik | `/pesan-mekanik` | — | Teks siap salin |
| 9 | Tutorial | `/tutorial/[slug]` | pilihan pengguna | Panduan aman |

Pertanyaan pendamping boleh dilewati. Jika pengguna melewati, mesin tetap berjalan dengan `answers` kosong; hasil bisa lebih umum dan skor kondisi tidak dipakai.

## 3. Aturan validasi

- `motorcycleType` wajib dipilih sebelum lanjut.
- `complaint` wajib diisi; minimal wajar (mis. 10 karakter) untuk menghindari input kosong.
- Tidak ada pertanyaan pendamping yang wajib.
- Jika `complaint` terlalu pendek atau tidak mengandung keyword apa pun, tampilkan fallback, bukan error.
- Jangan memaksa pengguna membuat akun.

## 4. Edge case

### 4.1 Tidak ada aturan cocok

- Tampilkan hasil umum: ringkasan, checklist, saran periksa ke bengkel.
- Jangan menampilkan penyebab spesifik.
- Tetap tampilkan disclaimer.
- Tawarkan pesan mekanik generik.

### 4.2 Safety lock aktif

- Peringatan keselamatan muncul di paling atas hasil.
- Urgensi minimal `perlu_segera_diperiksa`; aturan akut menetapkan `jangan_dikendarai`.
- Tidak ada rekomendasi tutorial DIY.
- CTA utama: "Bawa ke bengkel/teknisi".
- Checklist tetap ditampilkan, tetapi tidak boleh memuat instruksi bongkar.
- Pesan mekanik menekankan agar kendaraan tidak dikendarai jika berisiko.

### 4.3 Beberapa aturan cocok

- Penyebab dari aturan skor tertinggi.
- Urgensi tertinggi menang.
- Jika salah satunya safety lock, seluruh hasil menjadi safety lock.

### 4.4 Pengguna kembali/edit jawaban

- Tombol "Ubah jawaban" kembali ke form dengan state terakhir.
- Analisis dijalankan ulang saat pengguna menekan "Lihat hasil".
- Jangan menyimpan hasil lama jika input berubah.

### 4.5 Halaman hasil dibuka tanpa state

- Jika `AnalysisResult` tidak ditemukan, arahkan ke `/keluhan` dengan pesan singkat.
- Jangan menampilkan hasil kosong atau error teknis.

### 4.6 Refresh / pindah halaman

- MVP boleh memakai `sessionStorage` untuk menyimpan input dan hasil sementara.
- Jika data tidak ada, fallback ke `/keluhan`.
- Jangan menyimpan data sensitif; tidak ada foto atau data pribadi di MVP.

## 5. State MVP

```text
ComplaintDraft
  motorcycleType: MotorcycleType | null
  complaint: string
  answers: FollowUpAnswers
  step: "motor" | "keluhan" | "pertanyaan" | "hasil"
```

Aturan state:

- State awal kosong.
- "Lanjut" hanya aktif jika langkah saat ini valid.
- "Kembali" tidak menghapus input.
- Setelah analisis, simpan `AnalysisInput` dan `AnalysisResult` agar halaman lain bisa membacanya.
- Sediakan "Mulai ulang" untuk menghapus state.

## 6. Alur kamus dan tutorial

### Kamus

- Pengguna membuka `/kamus` dari navigasi atau tautan istilah di hasil.
- Daftar istilah dapat dicari dan difilter berdasarkan kategori.
- Setiap entri menjelaskan istilah dengan bahasa sederhana dan komponen terkait.

### Tutorial

- `/tutorial` menampilkan 10 tutorial dengan badge tingkat kesulitan dan jenis motor.
- `/tutorial/[slug]` menampilkan alat, perkiraan waktu, langkah, peringatan keselamatan, dan bagian "berhenti dan ke bengkel".
- Tutorial tidak ditautkan dari hasil safety lock.
- Jika tutorial tidak ditemukan, tampilkan 404 yang ramah.

## 7. Alur tahap berikutnya (login)

```text
Selesai analisis
  │
  ├── (MVP) Salin pesan / checklist / tutorial
  │
  └── (tahap berikutnya) "Simpan ke akun"
        │
        ▼
      Login Google (Supabase)
        │
        ▼
      Pindahkan data localStorage ke akun
        │
        ├── Simpan motor
        ├── Simpan keluhan + hasil
        ├── Tambah riwayat servis
        └── Atur jadwal perawatan
```

Ketentuan:

- Login bersifat opsional; pengguna tetap bisa memakai fitur MVP tanpa akun.
- RLS memastikan pengguna hanya mengakses datanya sendiri.
- Data anonim tidak otomatis dibagikan; migrasi harus dengan persetujuan pengguna.

## 8. Pemetaan fitur → halaman → data

| Fitur MVP | Halaman | Data |
|---|---|---|
| Beranda | `/` | Statis |
| Pilih jenis motor | `/keluhan` | `MotorcycleType` |
| Keluhan + pertanyaan | `/keluhan` | `AnalysisInput` |
| Hasil analisis | `/hasil` | `AnalysisResult` |
| Checklist | `/checklist` | Template checklist |
| Pesan mekanik | `/pesan-mekanik` | Template + `AnalysisResult` |
| Kamus | `/kamus` | `GlossaryTerm[]` |
| Tutorial | `/tutorial`, `/tutorial/[slug]` | `Tutorial[]` |
| Tentang/disclaimer | `/tentang` | Statis + teks disclaimer |

## 9. Kriteria penerimaan MVP

- Pengguna dapat menyelesaikan alur dari beranda sampai pesan mekanik tanpa login.
- Hasil selalu menampilkan disclaimer.
- Tidak ada angka estimasi harga di mana pun.
- Setiap hasil safety lock mengarah ke bengkel dan tidak menampilkan langkah bongkar.
- Urgensi akhir mengikuti aturan tertinggi.
- Jika tidak ada aturan cocok, fallback tampil dengan benar.
- Halaman dapat dipakai pada lebar 360 px tanpa scroll horizontal.
- Semua teks antarmuka berbahasa Indonesia sederhana.
