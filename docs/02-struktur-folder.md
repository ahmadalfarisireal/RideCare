# 02 — Struktur Folder

Dokumen ini adalah target struktur saat scaffold Tahap 2. **Belum ada folder aplikasi yang dibuat pada Tahap 1.** Hanya `docs/`, `PROJECT_BRIEF.md`, dan `AGENTS.md` yang ada di repositori.

## 1. Pohon target

```text
ridecare/
├── AGENTS.md
├── PROJECT_BRIEF.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
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
| `src/lib/analysis/` | Normalisasi, skor, urgensi, safety | React, DOM, Supabase, jaringan |
| `src/lib/templates/` | Teks ringkasan, checklist, WhatsApp | Komponen React |
| `src/data/rules/` | Data aturan | Impor dari `components`/`app` |
| `src/data/tutorials/` | Konten tutorial | Logika analisis |
| `src/data/glossary/` | Istilah dan definisi | Logika analisis |
| `src/types/` | Tipe bersama | Implementasi |
| `supabase/migrations/` | DDL dan policy | Kode aplikasi |

## 3. Konvensi penamaan

- File dan folder: `kebab-case` (`pesan-mekanik`, `complaint-form.tsx`).
- Komponen React: `PascalCase` di dalam file.
- Tipe dan interface: `PascalCase`; tipe domain memakai nama domain (`AnalysisInput`, `ComplaintRule`).
- Aturan: `id` stabil dan deskriptif, mis. `rem-kampas-aus`, `bahan-bakar-bocor-selang`.
- Slug tutorial: `kebab-case`, mis. `cek-tekanan-ban`.
- Bahasa kode (nama variabel/tipe): Inggris. Teks antarmuka dan data konten: Bahasa Indonesia.

## 4. Impor dan path alias

Gunakan alias `@/*` ke `src/*` agar tidak ada impor relatif berantai. Contoh: `import { analyzeComplaint } from "@/lib/analysis/engine"`.

## 5. File yang belum boleh dibuat di Tahap 1

- `package.json`, lockfile, konfigurasi Next/Tailwind.
- Komponen, halaman, mesin analisis, data aturan nyata.
- Migrasi SQL yang dijalankan ke Supabase.

Tahap 1 hanya menghasilkan dokumen di `docs/`.
