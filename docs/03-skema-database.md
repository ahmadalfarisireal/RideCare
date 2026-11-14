# 03 — Skema Database Supabase

Skema dirancang sejak Tahap 1, tetapi **belum dijalankan** dan **belum dipakai MVP**. MVP tidak menulis ke database. Skema ini menjadi target saat login, riwayat servis, dan jadwal perawatan dibangun.

Database: PostgreSQL milik Supabase (paket gratis).

## 1. Prinsip

- Gunakan `auth.users` bawaan Supabase untuk kredensial; tabel `public.users` hanya menyimpan profil.
- Aktifkan Row Level Security (RLS) pada semua tabel milik pengguna.
- Jangan menyimpan data pribadi yang tidak diperlukan.
- Semua waktu memakai `timestamptz` dengan default `now()`.
- ID memakai `uuid` (`gen_random_uuid()`).
- Enum dipakai agar nilai domain konsisten.
- Foto nota disimpan di Supabase Storage, bukan di tabel.

## 2. Enum

```sql
create type public.motorcycle_type as enum ('bebek', 'matik', 'sport', 'listrik');
create type public.fuel_type as enum ('bensin', 'listrik');
create type public.transmission_type as enum ('manual', 'matic', 'listrik');
create type public.urgency_level as enum ('aman_ditunda', 'perlu_segera_diperiksa', 'jangan_dikendarai');
create type public.difficulty_level as enum ('mudah', 'sedang', 'sulit');
```

Urutan enum `urgency_level` disengaja: semakin ke kanan semakin tinggi. Resolusi urgensi memakai urutan ini.

## 3. Tabel

### 3.1 `users` (profil)

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `uuid` | PK, FK ke `auth.users(id)` on delete cascade |
| `email` | `text` | unique, not null |
| `name` | `text` | null |
| `created_at` | `timestamptz` | not null, default `now()` |

Catatan: baris profil dibuat lewat trigger saat pengguna mendaftar (tahap berikutnya).

### 3.2 `motorcycles`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `user_id` | `uuid` | not null, FK `users(id)` on delete cascade |
| `brand` | `text` | not null |
| `model` | `text` | not null |
| `type` | `motorcycle_type` | not null |
| `fuel_type` | `fuel_type` | not null |
| `transmission` | `transmission_type` | not null |
| `year` | `integer` | check 1900–2100 |
| `plate_number` | `text` | null |
| `current_km` | `integer` | check >= 0 |
| `created_at` | `timestamptz` | not null, default `now()` |
| `updated_at` | `timestamptz` | not null, default `now()` |

### 3.3 `complaints`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `user_id` | `uuid` | nullable, FK `users(id)` on delete set null |
| `motorcycle_id` | `uuid` | nullable, FK `motorcycles(id)` on delete set null |
| `raw_complaint` | `text` | not null |
| `selected_symptoms` | `text[]` | not null, default `'{}'` |
| `answers` | `jsonb` | not null, default `'{}'` |
| `summary` | `text` | null |
| `possible_causes` | `jsonb` | not null, default `'[]'` |
| `urgency_level` | `urgency_level` | null |
| `recommended_checks` | `jsonb` | not null, default `'[]'` |
| `safety_locked` | `boolean` | not null, default `false` |
| `matched_rule_ids` | `text[]` | not null, default `'{}'` |
| `created_at` | `timestamptz` | not null, default `now()` |

`user_id` sengaja nullable untuk pengguna tanpa login. Namun penulisan anonim **tidak diaktifkan** pada MVP (lihat bagian RLS).

### 3.4 `service_records`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `user_id` | `uuid` | not null, FK `users(id)` on delete cascade |
| `motorcycle_id` | `uuid` | nullable, FK `motorcycles(id)` on delete set null |
| `complaint_id` | `uuid` | nullable, FK `complaints(id)` on delete set null |
| `service_date` | `date` | not null |
| `odometer_km` | `integer` | check >= 0 |
| `service_type` | `text` | null |
| `replaced_parts` | `jsonb` | not null, default `'[]'` |
| `labor_cost` | `numeric(12,2)` | check >= 0 |
| `parts_cost` | `numeric(12,2)` | check >= 0 |
| `total_cost` | `numeric(12,2)` | generated always as (`coalesce(labor_cost,0) + coalesce(parts_cost,0)`) stored |
| `notes` | `text` | null |
| `receipt_image_url` | `text` | null |
| `created_at` | `timestamptz` | not null, default `now()` |

Catatan: kolom biaya hanya untuk **mencatat** biaya aktual dari nota pengguna (tahap berikutnya). Aplikasi tidak menampilkan estimasi harga perbaikan.

### 3.5 `tutorials`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `title` | `text` | not null |
| `slug` | `text` | unique, not null |
| `applicable_types` | `motorcycle_type[]` | not null, default `'{}'` |
| `difficulty` | `difficulty_level` | not null |
| `estimated_time` | `text` | null |
| `tools_required` | `text[]` | not null, default `'{}'` |
| `safety_warnings` | `text[]` | not null, default `'{}'` |
| `steps` | `jsonb` | not null, default `'[]'` |
| `video_url` | `text` | null |
| `created_at` | `timestamptz` | not null, default `now()` |

`applicable_types` memakai array karena satu tutorial bisa berlaku untuk beberapa jenis motor; brief menyebut `motorcycle_type` secara konseptual.

### 3.6 `glossary`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `term` | `text` | unique, not null |
| `definition` | `text` | not null |
| `category` | `text` | null |
| `related_components` | `text[]` | not null, default `'{}'` |

### 3.7 `complaint_rules` (opsional, tahap berikutnya)

Pada MVP aturan berada di file repositori. Tabel ini hanya dipakai jika aturan perlu diedit tanpa deploy ulang.

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | `text` | PK |
| `keywords` | `text[]` | not null |
| `applicable_types` | `motorcycle_type[]` | not null |
| `conditions` | `jsonb` | not null, default `'{}'` |
| `possible_causes` | `text[]` | not null |
| `components_to_check` | `text[]` | not null |
| `urgency` | `urgency_level` | not null |
| `safety_lock` | `boolean` | not null, default `false` |
| `related_tutorials` | `text[]` | not null, default `'{}'` |
| `mechanic_questions` | `text[]` | not null, default `'{}'` |
| `created_at` | `timestamptz` | not null, default `now()` |
| `updated_at` | `timestamptz` | not null, default `now()` |

## 4. DDL ringkas

```sql
-- 0001_init.sql
create extension if not exists pgcrypto;

create type public.motorcycle_type as enum ('bebek', 'matik', 'sport', 'listrik');
create type public.fuel_type as enum ('bensin', 'listrik');
create type public.transmission_type as enum ('manual', 'matic', 'listrik');
create type public.urgency_level as enum ('aman_ditunda', 'perlu_segera_diperiksa', 'jangan_dikendarai');
create type public.difficulty_level as enum ('mudah', 'sedang', 'sulit');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  created_at timestamptz not null default now()
);

create table public.motorcycles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  brand text not null,
  model text not null,
  type public.motorcycle_type not null,
  fuel_type public.fuel_type not null,
  transmission public.transmission_type not null,
  year integer check (year between 1900 and 2100),
  plate_number text,
  current_km integer check (current_km >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  motorcycle_id uuid references public.motorcycles(id) on delete set null,
  raw_complaint text not null,
  selected_symptoms text[] not null default '{}',
  answers jsonb not null default '{}',
  summary text,
  possible_causes jsonb not null default '[]',
  urgency_level public.urgency_level,
  recommended_checks jsonb not null default '[]',
  safety_locked boolean not null default false,
  matched_rule_ids text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.service_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  motorcycle_id uuid references public.motorcycles(id) on delete set null,
  complaint_id uuid references public.complaints(id) on delete set null,
  service_date date not null,
  odometer_km integer check (odometer_km >= 0),
  service_type text,
  replaced_parts jsonb not null default '[]',
  labor_cost numeric(12,2) check (labor_cost >= 0),
  parts_cost numeric(12,2) check (parts_cost >= 0),
  total_cost numeric(12,2) generated always as
    (coalesce(labor_cost, 0) + coalesce(parts_cost, 0)) stored,
  notes text,
  receipt_image_url text,
  created_at timestamptz not null default now()
);

create table public.tutorials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  applicable_types public.motorcycle_type[] not null default '{}',
  difficulty public.difficulty_level not null,
  estimated_time text,
  tools_required text[] not null default '{}',
  safety_warnings text[] not null default '{}',
  steps jsonb not null default '[]',
  video_url text,
  created_at timestamptz not null default now()
);

create table public.glossary (
  id uuid primary key default gen_random_uuid(),
  term text unique not null,
  definition text not null,
  category text,
  related_components text[] not null default '{}'
);

create table public.complaint_rules (
  id text primary key,
  keywords text[] not null,
  applicable_types public.motorcycle_type[] not null,
  conditions jsonb not null default '{}',
  possible_causes text[] not null,
  components_to_check text[] not null,
  urgency public.urgency_level not null,
  safety_lock boolean not null default false,
  related_tutorials text[] not null default '{}',
  mechanic_questions text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 5. Index

```sql
create index motorcycles_user_id_idx on public.motorcycles (user_id);
create index complaints_user_id_idx on public.complaints (user_id);
create index complaints_motorcycle_id_idx on public.complaints (motorcycle_id);
create index complaints_created_at_idx on public.complaints (created_at desc);
create index service_records_user_id_idx on public.service_records (user_id);
create index service_records_motorcycle_id_idx on public.service_records (motorcycle_id);
create index service_records_service_date_idx on public.service_records (service_date desc);
create index tutorials_slug_idx on public.tutorials (slug);
create index glossary_term_idx on public.glossary (lower(term));
```

## 6. Row Level Security

### 6.1 Prinsip policy

- `motorcycles`, `complaints`, `service_records`: pengguna hanya bisa `select/insert/update/delete` baris dengan `user_id = auth.uid()`.
- `insert` wajib memakai `with check`, bukan hanya `using`.
- `users`: pengguna hanya bisa membaca dan mengubah profilnya sendiri.
- `tutorials`, `glossary`, `complaint_rules`: dapat dibaca publik (anon dan authenticated); penulisan hanya lewat `service_role` (dashboard/admin).
- `complaints.user_id` nullable tidak otomatis berarti boleh insert anonim. Penulisan anonim ditunda agar tidak menjadi celah spam.

### 6.2 SQL policy

```sql
-- 0002_rls.sql
alter table public.users enable row level security;
alter table public.motorcycles enable row level security;
alter table public.complaints enable row level security;
alter table public.service_records enable row level security;
alter table public.tutorials enable row level security;
alter table public.glossary enable row level security;
alter table public.complaint_rules enable row level security;

-- users
create policy "users select own" on public.users
  for select using (id = auth.uid());
create policy "users update own" on public.users
  for update using (id = auth.uid()) with check (id = auth.uid());

-- motorcycles
create policy "motorcycles select own" on public.motorcycles
  for select using (user_id = auth.uid());
create policy "motorcycles insert own" on public.motorcycles
  for insert with check (user_id = auth.uid());
create policy "motorcycles update own" on public.motorcycles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "motorcycles delete own" on public.motorcycles
  for delete using (user_id = auth.uid());

-- complaints
create policy "complaints select own" on public.complaints
  for select using (user_id = auth.uid());
create policy "complaints insert own" on public.complaints
  for insert with check (user_id = auth.uid());
create policy "complaints update own" on public.complaints
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "complaints delete own" on public.complaints
  for delete using (user_id = auth.uid());

-- service_records
create policy "service_records select own" on public.service_records
  for select using (user_id = auth.uid());
create policy "service_records insert own" on public.service_records
  for insert with check (user_id = auth.uid());
create policy "service_records update own" on public.service_records
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "service_records delete own" on public.service_records
  for delete using (user_id = auth.uid());

-- konten publik
create policy "tutorials public read" on public.tutorials
  for select using (true);
create policy "glossary public read" on public.glossary
  for select using (true);
create policy "complaint_rules public read" on public.complaint_rules
  for select using (true);
```

Policy tulis untuk `tutorials`, `glossary`, dan `complaint_rules` sengaja tidak dibuat. Operasi tulis dilakukan lewat dashboard/SQL dengan `service_role`, yang melewati RLS.

### 6.3 Validasi kepemilikan lintas tabel

RLS menjaga baris berdasarkan `user_id`, tetapi tidak otomatis memastikan `motorcycle_id` atau `complaint_id` milik pengguna yang sama. Aplikasi (server action/route handler) wajib memverifikasi:

- `motorcycle_id` yang dirujuk benar-benar milik `auth.uid()` sebelum insert/update `complaints` atau `service_records`.
- `complaint_id` yang dirujuk milik pengguna yang sama.

Alternatif penguatan di database: trigger validasi atau composite foreign key `(id, user_id)`. Keputusan final diambil saat Tahap 5.

### 6.4 Rencana penulisan anonim (belum diaktifkan)

Jika nanti diperlukan, tambahkan policy terbatas:

```sql
-- JANGAN dijalankan pada MVP
create policy "complaints anonymous insert" on public.complaints
  for insert to anon with check (user_id is null);
```

Syarat sebelum diaktifkan:

- Rate limiting di sisi server/edge.
- Tidak ada policy `select` untuk anon.
- Validasi ukuran payload.
- Kebijakan retensi data.

## 7. Storage foto nota (tahap berikutnya)

- Bucket: `receipts` (private).
- Path: `{user_id}/{service_record_id}/{filename}`.
- Batas ukuran: 2 MB per file.
- Tipe: `image/jpeg`, `image/png`, `image/webp`.
- Policy: pengguna hanya bisa upload/baca file di folder dengan `user_id = auth.uid()`.
- URL disimpan di `service_records.receipt_image_url` sebagai path, bukan URL publik permanen.

## 8. Trigger sederhana

```sql
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger motorcycles_set_updated_at
before update on public.motorcycles
for each row execute function public.set_updated_at();

create trigger complaint_rules_set_updated_at
before update on public.complaint_rules
for each row execute function public.set_updated_at();
```

Pembuatan baris `public.users` dari `auth.users` dilakukan lewat trigger terpisah saat Tahap 5, setelah alur login ditentukan.

## 9. Urutan migrasi

1. `0001_init.sql` — extension, enum, tabel.
2. `0002_rls.sql` — enable RLS, policy, trigger.
3. `0003_seed_content.sql` (opsional) — seed `tutorials`, `glossary`, `complaint_rules`.

Data aturan MVP tetap berada di repositori; seed database baru relevan jika aturan dipindah ke tabel.

## 10. Catatan dan keputusan terbuka

- **MVP tidak menulis ke database.** Skema ini belum diverifikasi lewat Supabase lokal.
- `complaints.answers` dan `possible_causes` memakai `jsonb` agar fleksibel; validasi bentuk dilakukan di aplikasi.
- `total_cost` dihitung otomatis dari komponen biaya; tetap tidak ditampilkan sebagai estimasi di UI.
- Perlu keputusan Tahap 5: apakah `public.users` dibuat via trigger `auth.users` atau upsert dari aplikasi.
- Perlu keputusan Tahap 5: strategi migrasi data `localStorage` ke akun.
