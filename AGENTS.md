# AGENTS.md — RideCare

## Baca dulu
- Baca `PROJECT_BRIEF.md` sebelum mengerjakan apa pun, terutama bagian **"Keputusan Arsitektur (Terbaru)"**. Bagian itu mengalahkan bagian lain jika bertentangan.
- Status repo: baru berisi `PROJECT_BRIEF.md`; aplikasi belum di-scaffold. Jangan menganggap file/folder Next.js sudah ada.

## Aturan produk (wajib, jangan dilanggar)
- Proyek harus gratis: tanpa API berbayar. Analisis keluhan memakai mesin aturan (rule-based), bukan AI. MVP tanpa login.
- Aturan keselamatan dikunci di kode: rem, bensin bocor, kelistrikan utama, mesin, dan motor listrik wajib selalu mengarahkan pengguna ke bengkel/teknisi. AI (nanti, opsional) tidak boleh menimpa aturan ini.
- Jangan menampilkan perkiraan harga perbaikan. Biaya harus diminta dari mekanik sebelum pekerjaan.
- Selalu tampilkan disclaimer bahwa hasil bukan diagnosis pasti (teks wajib ada di `PROJECT_BRIEF.md` bagian "Disclaimer Wajib").
- Bahasa antarmuka: Bahasa Indonesia sederhana; istilah teknis harus dijelaskan.
- Gunakan TypeScript.
- Pisahkan mesin analisis keluhan dari UI agar mudah diuji dan bisa dipasangi adapter AI nanti.

## Arsitektur yang dituju
- Stack: Next.js + TypeScript + Tailwind CSS; Supabase (paket gratis) + Vercel untuk tahap berikutnya.
- Mesin aturan: data aturan sebagai file TypeScript/JSON di repo, terpisah dari komponen UI. Skor kecocokan menentukan penyebab; urgensi akhir = level tertinggi di antara aturan yang cocok; `safety_lock` melarang saran bongkar sendiri.
- MVP hanya: beranda, form keluhan, hasil, checklist, pesan mekanik, kamus, 10 tutorial, halaman tentang/disclaimer.
- Login, riwayat servis, jadwal perawatan, peta, notifikasi, dan AI = tahap berikutnya, bukan MVP.

## Alur kerja
- Kerjakan satu tahap sekali, lalu tanya konfirmasi sebelum lanjut. Jangan membuat seluruh fitur/kode sekaligus.
- Ikuti urutan dari brief: rencana arsitektur → struktur folder → skema DB (termasuk RLS) → format data aturan → alur pengguna → wireframe → implementasi bertahap.
- Desain mobile-first; warna hitam/abu gelap + putih dengan aksen kuning/oranye.
- Setelah scaffold, jalankan skrip yang benar-benar ada di `package.json` (lint/typecheck/test); jangan menebak perintah.
