# 02 — Struktur Folder

Dokumen ini adalah target struktur. Scaffold Tahap 2 sudah dibuat; selisih implementasi dicatat di bagian 6. Pada Tahap 1, repositori hanya berisi `docs/`, `PROJECT_BRIEF.md`, dan `AGENTS.md`.

## 1. Pohon target

```text
ridecare/
├── AGENTS.md
├── PROJECT_BRIEF.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── next-env.d.ts
├── .env.example
├── .env.local                 # tidak di-commit
├── public/
│   └── images/
├── docs/
│   ├── README.md
│   ├── 01-arsitektur.md
│   ├── 02-struktur-folder.md
│   ├── 03-skema-database.md
│   ├── 04-format-aturan.md
│   ├── 05-alur-pengguna.md
│   └── 06-wireframe.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── page.tsx                    # Beranda
│   │   ├── keluhan/
│   │   │   └── page.tsx                # Pilih motor + form + pertanyaan
│   │   ├── hasil/
│   │   │   └── page.tsx
│   │   ├── checklist/
│   │   │   └── page.tsx
│   │   ├── pesan-mekanik/
│   │   │   └── page.tsx
│   │   ├── kamus/
│   │   │   └── page.tsx
│   │   ├── tutorial/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── tentang/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── disclaimer-banner.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── radio-group.tsx
│   │   ├── forms/
│   │   │   ├── motorcycle-type-picker.tsx
│   │   │   ├── complaint-form.tsx
│   │   │   └── follow-up-questions.tsx
│   │   └── result/
│   │       ├── result-summary.tsx
│   │       ├── cause-list.tsx
│   │       ├── urgency-badge.tsx
│   │       ├── safety-alert.tsx
│   │       ├── checklist.tsx
│   │       └── mechanic-message.tsx
│   ├── lib/
│   │   ├── analysis/
│   │   │   ├── engine.ts               # orkestrasi analisis
│   │   │   ├── normalize.ts            # normalisasi teks
│   │   │   ├── scoring.ts              # skor kecocokan
│   │   │   ├── urgency.ts              # resolusi urgensi
│   │   │   ├── safety.ts               # pengaman keselamatan
│   │   │   └── adapter.ts              # antarmuka AI (tahap berikutnya)
│   │   ├── templates/
│   │   │   ├── summary.ts
│   │   │   ├── checklist.ts
│   │   │   └── whatsapp.ts
│   │   ├── storage/
│   │   │   └── local-analysis.ts       # session/localStorage (opsional)
│   │   └── supabase/                   # tahap berikutnya
│   │       ├── client.ts
│   │       └── server.ts
│   ├── data/
│   │   ├── rules/
│   │   │   ├── index.ts                # agregasi semua aturan
│   │   │   ├── rem.ts
│   │   │   ├── bahan-bakar.ts
│   │   │   ├── kelistrikan.ts
│   │   │   ├── mesin.ts
│   │   │   ├── motor-listrik.ts
│   │   │   └── umum.ts
│   │   ├── tutorials/
│   │   │   ├── index.ts
│   │   │   └── *.ts                    # 10 tutorial
│   │   └── glossary/
│   │       ├── index.ts
│   │       └── terms.ts
│   └── types/
│       ├── analysis.ts
│       ├── rule.ts
│       ├── tutorial.ts
│       └── glossary.ts
├── supabase/
│   └── migrations/
│       ├── 0001_init.sql
│       └── 0002_rls.sql
└── tests/
    ├── analysis/
    │   ├── scoring.test.ts
    │   ├── safety.test.ts
    │   └── engine.test.ts
    └── fixtures/
        └── complaints.ts
```

Folder `tests/` mengikuti runner yang dipilih saat scaffold. Jika memakai Vitest, file dapat ditempatkan di samping sumber atau di `tests/`. Keputusan final diambil di Tahap 2.

## 2. Aturan ownership

| Lokasi | Boleh berisi | Dilarang |
|---|---|---|
| `src/app/` | Rute, layout, komposisi halaman | Logika skor/urgensi, data aturan |
| `src/components/ui/` | Komponen presentasional generik | Fetch data, aturan bisnis |
| `src/components/forms/` | Form dan validasi input UI | Menentukan penyebab/urgensi |
| `src/components/result/` | Menampilkan `AnalysisResult` | Menghitung ulang hasil |
| `src/lib/complaint-engine/` | Tipe & mesin aturan murni: normalisasi, skor, urgensi, safety, template, `analyze` | React, DOM, Supabase, jaringan |
| `src/data/complaint-rules.ts` | Data aturan keluhan | Impor dari `components`/`app` |
| `src/data/tutorials/` | Konten tutorial (nanti) | Logika analisis |
| `src/data/glossary/` | Istilah dan definisi (nanti) | Logika analisis |
| `supabase/migrations/` | DDL dan policy | Kode aplikasi |

> Catatan: `src/lib/analysis/`, `src/lib/templates/`, `src/data/rules/`, dan `src/types/` adalah placeholder target awal; implementasi mesin Tahap 3A berada di `src/lib/complaint-engine/` dan `src/data/complaint-rules.ts`.

## 3. Konvensi penamaan

- File dan folder: `kebab-case` (`pesan-mekanik`, `complaint-form.tsx`).
- Komponen React: `PascalCase` di dalam file.
- Tipe dan interface: `PascalCase`; tipe domain memakai nama domain (`AnalysisInput`, `ComplaintRule`).
- Aturan: `id` stabil dan deskriptif, mis. `rem-kampas-aus`, `bahan-bakar-bocor-selang`.
- Slug tutorial: `kebab-case`, mis. `cek-tekanan-ban`.
- Bahasa kode (nama variabel/tipe): Inggris. Teks antarmuka dan data konten: Bahasa Indonesia.

## 4. Impor dan path alias

Gunakan alias `@/*` ke `src/*` agar tidak ada impor relatif berantai. Contoh: `import { analyzeComplaint } from "@/lib/analysis/engine"`.

## 5. Batas Tahap 1 (sudah dilampaui)

Pada Tahap 1, item berikut belum dibuat:

- `package.json`, lockfile, konfigurasi Next/Tailwind.
- Komponen, halaman, mesin analisis, data aturan nyata.
- Migrasi SQL yang dijalankan ke Supabase.

Tahap 2 sudah membuat scaffold, halaman beranda, komponen UI, dan placeholder rute. Mesin analisis, data aturan, dan migrasi yang dijalankan tetap belum dibuat.

## 6. Selisih implementasi Tahap 2–3A

- Next.js 16 + React 19 + Tailwind CSS 4. Tailwind 4 dikonfigurasi lewat `src/app/globals.css` dan loader `@tailwindcss/turbopack` di `next.config.ts`; tidak ada `tailwind.config.ts` atau `postcss.config.mjs`.
- Rute fitur sudah ada, tetapi selain `/tentang` isinya masih placeholder `ComingSoon`, bukan fitur (belum ada UI form keluhan/hasil).
- `src/lib/supabase/client.ts`, `server.ts`, dan `env.ts` sudah disiapkan, tetapi tidak diimpor oleh halaman mana pun.
- `.env.example` tersedia; `.env.local` diabaikan git.
- **Tahap 3A (mesin saja, tanpa UI/React):** `src/lib/complaint-engine/` (tipe + `analyze` murni, tanpa jaringan/React), `src/data/complaint-rules.ts`, pengujian Vitest di `tests/complaint-engine/`, dan `vitest.config.ts` + skrip `test`.
- Placeholder lama `src/lib/analysis/`, `src/lib/templates/`, `src/data/rules/`, dan sebagian `src/types/` belum dipakai; folder fitur lain (`src/components/forms`, `src/components/result`, `src/data/tutorials`, `src/data/glossary`, `supabase/migrations`) masih menunggu tahap berikutnya.
- Tambahan kecil: `src/lib/constants.ts`, `src/lib/utils.ts`, `src/components/ui/logo.tsx`, `src/components/ui/icons.tsx`, dan `src/app/icon.svg`.
- `next.config.ts` mengatur `turbopack.root` agar Turbopack tidak mencari lockfile di luar repo.
