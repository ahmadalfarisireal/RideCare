# RideCare — Dokumentasi

Dokumen ini adalah hasil **Tahap 1: perencanaan**. Tahap 2 (scaffold Next.js, layout, komponen UI, beranda) sudah dikerjakan; dokumen tetap menjadi rujukan arsitektur dan batas tahap berikutnya.

Sumber kebenaran utama tetap `PROJECT_BRIEF.md`, terutama bagian **"Keputusan Arsitektur (Terbaru)"**. Jika dokumen di folder ini bertentangan dengan brief, brief yang menang.

## Daftar isi

| Dokumen | Isi |
|---|---|
| [01-arsitektur.md](./01-arsitektur.md) | Stack, lapisan, alur data, batas MVP, keputusan arsitektur |
| [02-struktur-folder.md](./02-struktur-folder.md) | Target struktur folder dan aturan ownership |
| [03-skema-database.md](./03-skema-database.md) | Tabel, enum, relasi, DDL, dan rencana Row Level Security |
| [04-format-aturan.md](./04-format-aturan.md) | Format data aturan, skoring, urgensi, contoh aturan |
| [05-alur-pengguna.md](./05-alur-pengguna.md) | Alur MVP, edge case, rencana tahap berikutnya |
| [06-wireframe.md](./06-wireframe.md) | Wireframe mobile-first dan design token |

## Ringkasan keputusan arsitektur

1. **Gratis.** Tidak ada API berbayar di MVP. Analisis memakai mesin aturan (rule-based), bukan AI.
2. **MVP tanpa login.** Form, hasil, checklist, pesan mekanik, kamus, dan tutorial dapat dipakai tanpa akun.
3. **Aturan keselamatan dikunci di kode.** Rem, kebocoran bahan bakar, kelistrikan utama, mesin, dan motor listrik selalu mengarahkan pengguna ke bengkel/teknisi. Tidak ada saran bongkar sendiri untuk kategori ini.
4. **Tanpa estimasi harga.** Biaya harus diminta dari mekanik sebagai estimasi tertulis sebelum pekerjaan.
5. **Disclaimer wajib** tampil di hasil analisis dan halaman terkait.
6. **Bahasa antarmuka:** Bahasa Indonesia sederhana; istilah teknis dijelaskan.
7. **TypeScript** dan pemisahan tegas antara mesin analisis (`lib/analysis`) dan UI.
8. **AI opsional menyusul** lewat adapter, dengan fallback otomatis ke mesin aturan. AI tidak boleh menimpa urgensi atau aturan keselamatan.
9. **Hosting/database tahap berikutnya:** Vercel dan Supabase paket gratis, dengan RLS sejak skema dirancang.

## Batas MVP

Termasuk MVP:

- Beranda
- Pilih jenis motor
- Form "Ceritakan Keluhan Motormu" + pertanyaan pendamping
- Hasil analisis awal (ringkasan, kemungkinan penyebab, komponen yang diperiksa, urgensi)
- Checklist anti getok harga
- Pesan untuk mekanik (teks siap salin ke WhatsApp)
- Kamus bengkel
- 10 tutorial perawatan dasar
- Halaman tentang dan disclaimer keselamatan

Tidak termasuk MVP:

- Login dan akun
- Riwayat servis dan jadwal perawatan
- Penyimpanan permanen ke database
- Peta bengkel (Leaflet)
- Notifikasi
- Analisis bebas berbasis AI

## Urutan tahap

1. **Tahap 1 (selesai):** rencana arsitektur, skema database, format aturan, alur pengguna, wireframe.
2. **Tahap 2 (selesai):** scaffold Next.js + TypeScript + Tailwind, layout, komponen UI dasar, beranda, klien Supabase yang belum dipakai.
3. **Tahap 3 (berikutnya):** mesin aturan + form keluhan + hasil + checklist + pesan mekanik.
4. **Tahap 4:** kamus dan 10 tutorial.
5. **Tahap 5:** Supabase, login Google, riwayat servis, jadwal perawatan, RLS aktif.

> Catatan: setiap tahap dikerjakan satu per satu dan menunggu konfirmasi sebelum lanjut.
