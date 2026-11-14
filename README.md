# RideCare

Website edukasi dan asisten persiapan servis motor untuk pemilik motor di Indonesia. Tagline: **Pahami motormu, hindari digetok.**

Status: **Tahap 2 — scaffold dan beranda.** Fitur analisis keluhan, kamus, dan tutorial belum diimplementasikan.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Supabase (disiapkan, belum dipakai pada MVP)
- Vercel (rencana hosting)

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Skrip

```bash
npm run dev        # server pengembangan
npm run build      # build produksi
npm run start      # jalankan hasil build
npm run lint       # ESLint
npm run typecheck  # TypeScript tanpa emit
```

## Supabase

Klien Supabase sudah disiapkan di `src/lib/supabase/`, tetapi **tidak dipakai** oleh halaman mana pun. MVP tidak membutuhkan login atau database.

Untuk tahap berikutnya, salin `.env.example` menjadi `.env.local` dan isi:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Struktur

- `src/app/` — rute App Router
- `src/components/ui/` — komponen presentasional (Button, Card, Badge, Input, Textarea, RadioGroup)
- `src/components/layout/` — header, footer, disclaimer
- `src/lib/` — utilitas, konstanta, klien Supabase
- `src/data/` — tempat data aturan, tutorial, dan kamus (tahap berikutnya)
- `docs/` — rencana arsitektur, skema database, format aturan, alur, wireframe

## Aturan produk

- Gratis, tanpa API berbayar, analisis memakai mesin aturan.
- MVP tanpa login.
- Kategori rem, kebocoran bahan bakar, kelistrikan utama, mesin, dan motor listrik selalu diarahkan ke bengkel.
- Tidak menampilkan estimasi harga perbaikan.
- Hasil bukan diagnosis pasti; disclaimer wajib selalu tampil.

Lihat `PROJECT_BRIEF.md` dan `AGENTS.md` untuk aturan lengkap.
