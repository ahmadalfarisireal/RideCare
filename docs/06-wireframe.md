# 06 — Wireframe UI

Wireframe ini bersifat mobile-first (lebar acuan 360–430 px). Tampilan desktop melebarkan konten dan boleh memakai grid dua kolom, tetapi alur dan urutan konten tetap sama.

## 1. Design token

### Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `bg` | `#0B0B0C` | Latar utama (hitam) |
| `surface` | `#17181A` | Kartu, panel |
| `surface-2` | `#222327` | Input, hover |
| `border` | `#34363B` | Garis pemisah |
| `text` | `#F5F5F4` | Teks utama |
| `muted` | `#A1A1AA` | Teks sekunder |
| `accent` | `#F5A524` | Aksen kuning/oranye, CTA |
| `accent-strong` | `#FF7A1A` | Hover/aktif |
| `danger` | `#EF4444` | Peringatan keselamatan |
| `warning` | `#F59E0B` | Urgensi "perlu segera" |
| `safe` | `#22C55E` | Urgensi "aman ditunda" |

Jangan mengandalkan warna saja: sertakan ikon dan label teks pada badge urgensi.

### Tipografi

| Peran | Ukuran | Ketebalan |
|---|---|---|
| Judul halaman | 24–28 px | 700 |
| Judul kartu | 18 px | 600 |
| Body | 15–16 px | 400 |
| Label form | 14 px | 500 |
| Caption | 12–13 px | 400 |

Gunakan satu keluarga sans-serif yang jelas (mis. Inter) dan tinggi baris 1.5–1.6.

### Spacing dan bentuk

- Skala spacing: 4, 8, 12, 16, 24, 32, 48 px.
- Radius: 12 px untuk kartu, 10 px untuk tombol, 8 px untuk input.
- Lebar konten maksimum desktop: 720 px.
- Tinggi tombol minimum: 44 px (target sentuh).

### Komponen dasar

- `Button` — primer (aksen), sekunder (garis), bahaya (merah, hanya untuk peringatan).
- `Card` — permukaan gelap dengan border tipis.
- `Badge` — urgensi, tingkat kesulitan, jenis motor.
- `Input`, `Textarea`, `RadioGroup`.
- `SafetyAlert` — blok merah dengan ikon peringatan.
- `Disclaimer` — teks kecil di bawah hasil dan footer.

## 2. Kerangka global

```text
┌──────────────────────────────────────┐
│ RideCare                    [☰]      │  header, logo kiri
├──────────────────────────────────────┤
│                                      │
│  Konten halaman                      │
│                                      │
├──────────────────────────────────────┤
│ Beranda · Tutorial · Kamus · Tentang │  footer
│ Hasil bukan diagnosis pasti.         │
└──────────────────────────────────────┘
```

Navigasi mobile memakai menu ringkas; aksi utama selalu berupa tombol lebar penuh di bagian bawah konten.

## 3. Beranda (`/`)

```text
┌──────────────────────────────────────┐
│ RideCare                    [☰]      │
├──────────────────────────────────────┤
│  Pahami motormu,                     │
│  hindari digetok.                    │
│                                      │
│  Susun keluhan sebelum ke bengkel.   │
│  Gratis, tanpa akun.                 │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Ceritakan keluhan motormu      │  │  CTA utama
│  └────────────────────────────────┘  │
│                                      │
│  ┌──────────────┐ ┌──────────────┐   │
│  │ Kamus bengkel│ │ Tutorial DIY │   │
│  └──────────────┘ └──────────────┘   │
│                                      │
│  Cara kerja (3 langkah)              │
│  1. Pilih jenis motor                │
│  2. Tulis keluhan                    │
│  3. Dapatkan hasil + checklist       │
│                                      │
│  ⚠ Hasil bukan diagnosis pasti.      │
└──────────────────────────────────────┘
```

## 4. Pilih jenis motor (`/keluhan`, langkah 1)

```text
┌──────────────────────────────────────┐
│ ←  Jenis motormu                     │
├──────────────────────────────────────┤
│  Pilih jenis motor                   │
│  ┌────────────┐ ┌────────────┐       │
│  │ Bebek      │ │ Matik      │       │
│  └────────────┘ └────────────┘       │
│  ┌────────────┐ ┌────────────┐       │
│  │ Sport      │ │ Listrik    │       │
│  └────────────┘ └────────────┘       │
│                                      │
│  Jenis motor membantu mempersempit   │
│  kemungkinan penyebab.               │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Lanjut                         │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## 5. Form keluhan (`/keluhan`, langkah 2)

```text
┌──────────────────────────────────────┐
│ ←  Ceritakan keluhan                 │
├──────────────────────────────────────┤
│  Jenis motor: Matik        [Ubah]    │
│                                      │
│  Apa yang kamu rasakan?              │
│  ┌────────────────────────────────┐  │
│  │ Motor susah hidup saat pagi... │  │
│  │                                │  │
│  └────────────────────────────────┘  │
│  Contoh: "susah hidup pagi",         │
│  "rem berbunyi", "motor brebet".     │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Lanjut ke pertanyaan           │  │
│  └────────────────────────────────┘  │
│  [ Kembali ]                         │
└──────────────────────────────────────┘
```

## 6. Pertanyaan pendamping (`/keluhan`, langkah 3)

```text
┌──────────────────────────────────────┐
│ ←  Beberapa pertanyaan singkat       │
├──────────────────────────────────────┤
│  Kapan masalah mulai muncul?         │
│  ( ) Hari ini  ( ) Beberapa hari     │
│  ( ) Lebih lama  ( ) Tidak tahu      │
│                                      │
│  Kapan keluhan terasa?               │
│  ( ) Saat mesin dingin               │
│  ( ) Saat mesin panas                │
│  ( ) Keduanya  ( ) Tidak tahu        │
│                                      │
│  Apakah ada lampu indikator menyala? │
│  ( ) Ya  ( ) Tidak  ( ) Tidak tahu   │
│                                      │
│  Apakah ada suara tidak biasa?       │
│  ( ) Ya  ( ) Tidak  ( ) Tidak tahu   │
│                                      │
│  Apakah ada asap / bau / kebocoran?  │
│  [ Ya ] [ Tidak ] [ Tidak tahu ]     │
│                                      │
│  Apakah keluhan hilang setelah       │
│  motor dipakai beberapa menit?       │
│  ( ) Ya  ( ) Tidak  ( ) Tidak tahu   │
│                                      │
│  Pernah kecelakaan atau banjir?      │
│  ( ) Ya  ( ) Tidak  ( ) Tidak tahu   │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Lihat kemungkinan penyebab     │  │
│  └────────────────────────────────┘  │
│  [ Kembali ]                         │
└──────────────────────────────────────┘
```

Pertanyaan boleh dilewati dengan memilih "Tidak tahu". Jangan memaksa semua jawaban terisi.

## 7. Hasil analisis (`/hasil`) — normal

```text
┌──────────────────────────────────────┐
│ ←  Hasil awal                        │
├──────────────────────────────────────┤
│  Ringkasan keluhan                   │
│  ┌────────────────────────────────┐  │
│  │ Motor matik susah hidup saat   │  │
│  │ mesin dingin.                  │  │
│  └────────────────────────────────┘  │
│                                      │
│  Kemungkinan penyebab                │
│  1. Busi lemah atau kotor            │
│  2. Aki lemah                        │
│  3. Sistem bahan bakar kotor         │
│                                      │
│  Yang perlu diperiksa                │
│  • Busi  • Aki  • Filter udara       │
│  • Throttle body                     │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ ⚠ Perlu segera diperiksa       │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Lihat checklist anti getok     │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Buat pesan untuk mekanik       │  │
│  └────────────────────────────────┘  │
│  Tutorial relevan: [Busi] [Aki]      │
│                                      │
│  Hasil ini bukan diagnosis pasti.    │
│  Pemeriksaan akhir oleh teknisi.     │
└──────────────────────────────────────┘
```

## 8. Hasil analisis (`/hasil`) — safety lock

```text
┌──────────────────────────────────────┐
│ ←  Hasil awal                        │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │ ⛔ JANGAN DIKENDARAI DULU      │  │  blok danger
│  │ Keluhan ini termasuk kategori   │  │
│  │ keselamatan. Bawa ke bengkel    │  │
│  │ atau teknisi kompeten.          │  │
│  └────────────────────────────────┘  │
│                                      │
│  Ringkasan keluhan                   │
│  ┌────────────────────────────────┐  │
│  │ Rem terasa tidak pakem.        │  │
│  └────────────────────────────────┘  │
│                                      │
│  Kemungkinan penyebab                │
│  1. Kampas rem aus                   │
│  2. Udara di saluran rem             │
│                                      │
│  Yang perlu diperiksa                │
│  • Kampas rem  • Minyak rem          │
│  • Disc/drum   • Selang rem          │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Bawa ke bengkel/teknisi        │  │  CTA utama
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Lihat checklist anti getok     │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Buat pesan untuk mekanik       │  │
│  └────────────────────────────────┘  │
│                                      │
│  Tidak ada tutorial bongkar sendiri  │
│  untuk kategori ini.                 │
│                                      │
│  Hasil ini bukan diagnosis pasti.    │
└──────────────────────────────────────┘
```

Catatan: untuk safety lock, blok peringatan berada di atas segalanya; rekomendasi tutorial DIY tidak ditampilkan.

## 9. Checklist anti getok harga (`/checklist`)

```text
┌──────────────────────────────────────┐
│ ←  Checklist sebelum ke bengkel      │
├──────────────────────────────────────┤
│  ☑ Jelaskan gejala secara spesifik   │
│  ☑ Minta pemeriksaan sebelum bongkar │
│  ☑ Minta estimasi jasa & sparepart   │
│  ☑ Tanyakan apakah estimasi berubah  │
│  ☑ Minta konfirmasi sebelum ganti    │
│  ☑ Tanyakan alasan penggantian       │
│  ☑ Minta bukti foto/video            │
│  ☑ Tanyakan alternatif lebih murah   │
│  ☑ Minta komponen lama dikembalikan  │
│  ☑ Minta nota rinci                  │
│  ☑ Jangan setujui tambahan tanpa     │
│    penjelasan                        │
│                                      │
│  Estimasi biaya harus diminta dari   │
│  mekanik sebelum pekerjaan.          │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Buat pesan untuk mekanik       │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## 10. Pesan untuk mekanik (`/pesan-mekanik`)

```text
┌──────────────────────────────────────┐
│ ←  Pesan untuk mekanik               │
├──────────────────────────────────────┤
│  Salin pesan ini dan kirim ke        │
│  mekanik lewat WhatsApp.             │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Halo, saya ingin servis motor  │  │
│  │ matik 125 cc.                  │  │
│  │                                │  │
│  │ Keluhan:                       │  │
│  │ - Susah hidup saat pagi.       │  │
│  │                                │  │
│  │ Mohon periksa:                 │  │
│  │ - Busi                         │  │
│  │ - Aki                          │  │
│  │                                │  │
│  │ Sebelum perbaikan, mohon       │  │
│  │ informasikan penyebab,         │  │
│  │ komponen, estimasi biaya,      │  │
│  │ dan waktu pengerjaan.          │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Salin pesan                    │  │  tombol dengan feedback
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Buka WhatsApp                  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

Jangan menampilkan angka estimasi harga di halaman ini.

## 11. Kamus (`/kamus`)

```text
┌──────────────────────────────────────┐
│ ←  Kamus bengkel                     │
├──────────────────────────────────────┤
│  [ Cari istilah...              ]    │
│  [Semua] [Mesin] [Kelistrikan] ...   │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Busi                           │  │
│  │ Komponen pemantik api untuk    │  │
│  │ membakar bahan bakar.          │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Aki                            │  │
│  │ Penyimpan daya listrik motor.  │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ CVT                            │  │
│  │ Sistem transmisi otomatis...   │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## 12. Daftar tutorial (`/tutorial`)

```text
┌──────────────────────────────────────┐
│ ←  Tutorial perawatan dasar          │
├──────────────────────────────────────┤
│  [Semua] [Mudah] [Sedang] [Sulit]    │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Cek Tekanan Ban      [Mudah]   │  │
│  │ Semua jenis · 5 menit          │  │
│  │ ─────────────────────────────  │  │
│  │ Ganti Oli Mesin      [Sedang]  │  │
│  │ Bebek, matik, sport · 20 menit │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Cek & Ganti Busi     [Mudah]   │  │
│  └────────────────────────────────┘  │
│  ...                                 │
└──────────────────────────────────────┘
```

## 13. Detail tutorial (`/tutorial/[slug]`)

```text
┌──────────────────────────────────────┐
│ ←  Cek & Ganti Busi                  │
├──────────────────────────────────────┤
│  [Mudah] [Bebek] [Matik] [Sport]     │
│  Perkiraan waktu: 10–15 menit        │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ ⚠ Peringatan keselamatan       │  │
│  │ Matikan mesin dan tunggu dingin│  │
│  │ sebelum melepas busi.          │  │
│  └────────────────────────────────┘  │
│                                      │
│  Alat yang dibutuhkan                │
│  • Kunci busi  • Kain bersih         │
│                                      │
│  Langkah                             │
│  1. ...                              │
│  2. ...                              │
│  3. ...                              │
│  [gambar/langkah]                    │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Berhenti dan ke bengkel jika   │  │
│  │ busi macet, ulir rusak, atau   │  │
│  │ muncul asap/panas berlebih.    │  │
│  └────────────────────────────────┘  │
│                                      │
│  Hasil bukan diagnosis pasti.        │
└──────────────────────────────────────┘
```

## 14. Tentang dan keselamatan (`/tentang`)

```text
┌──────────────────────────────────────┐
│ ←  Tentang RideCare                  │
├──────────────────────────────────────┤
│  RideCare membantu menyusun keluhan  │
│  dan kemungkinan pemeriksaan awal.   │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Disclaimer wajib               │  │
│  │ RideCare membantu menyusun     │  │
│  │ keluhan dan memberikan         │  │
│  │ kemungkinan pemeriksaan awal.  │  │
│  │ Hasil ini bukan diagnosis      │  │
│  │ pasti. Untuk pemeriksaan,      │  │
│  │ perbaikan, dan keputusan       │  │
│  │ penggantian komponen, gunakan  │  │
│  │ jasa teknisi atau bengkel      │  │
│  │ yang kompeten. Jangan          │  │
│  │ melakukan perbaikan yang       │  │
│  │ berisiko jika kamu tidak yakin.│  │
│  └────────────────────────────────┘  │
│                                      │
│  Kategori yang selalu diarahkan ke   │
│  bengkel: rem, kebocoran bahan       │
│  bakar, kelistrikan utama, mesin,    │
│  dan motor listrik.                  │
│                                      │
│  RideCare tidak menampilkan estimasi │
│  harga perbaikan.                    │
└──────────────────────────────────────┘
```

## 15. Catatan responsif dan aksesibilitas

- Konten satu kolom pada mobile; maksimum 720 px pada desktop.
- Tombol aksi utama berada dalam jangkauan jempol dan tidak tertutup keyboard.
- Label form selalu terlihat; jangan hanya memakai placeholder.
- `SafetyAlert` memakai ikon + teks, bukan hanya warna merah.
- Badge urgensi memuat teks lengkap, mis. "Jangan dikendarai dulu".
- Fokus keyboard terlihat; urutan tab mengikuti urutan visual.
- Teks disclaimer tidak boleh disembunyikan di balik accordion pada halaman hasil.
- Semua gambar tutorial memiliki teks alternatif.
