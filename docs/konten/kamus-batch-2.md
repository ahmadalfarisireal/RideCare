# Kamus Bengkel — Batch 2 (6 istilah)

Sumber teks untuk OpenCode. Struktur dan nada mengikuti PANDUAN_KONTEN.md bagian 2 dan 3.1.
Id dan istilah mengikuti isi src/data/glossary.ts. Field per istilah: id, term, cat (categoryLabel), short, analogy, how, signs, ignored, diy (boleh | hati | bengkel), diyWhy, ask, related (id yang ada di glossary).
Aturan: tanpa angka harga, tanpa angka teknis dari ingatan, tema bensin, kelistrikan utama, dan mesin tidak lebih longgar dari "hati".

---

## 1. Throttle body

- id: throttle-body
- term: Throttle body
- cat: Mesin
- short: Katup pengatur udara yang masuk ke mesin pada motor injeksi, dibuka lewat tarikan gas.
- analogy: Seperti keran udara. Makin lebar dibuka, makin banyak udara yang mengalir ke mesin.
- how: Saat gas ditarik, katup di dalam throttle body membuka dan udara mengalir ke mesin. Sensor memberi tahu komputer motor seberapa lebar bukaannya, lalu komputer mengatur bensin yang disemprotkan. Kerak dan kotoran bisa menumpuk di sekitar katup dan mengganggu aliran udara yang halus, terutama saat idle.
- signs:
  - Putaran idle naik turun atau tidak stabil
  - Mesin mati sendiri saat berhenti
  - Respons gas terasa terlambat atau menyentak
  - Susah hidup, terutama saat mesin dingin
- ignored: Motor jadi tidak nyaman dan mudah mati di lampu merah. Gejalanya mirip masalah lain, jadi penyebabnya perlu dipastikan.
- diy: bengkel
- diyWhy: Throttle body bagian dari sistem mesin dan injeksi, dan sensornya halus. Membersihkan dengan cara yang salah bisa merusak sensor atau mengacaukan setelannya.
- ask:
  - Apa bukti throttle body yang bermasalah, bukan busi atau filter udara?
  - Dibersihkan dengan cara yang sesuai motor saya? Perlu diatur ulang setelahnya?
  - Kalau belum membaik, pemeriksaan berikutnya apa?
- related: injector, sensor, filter-udara

---

## 2. Sistem charging

- id: sistem-charging
- term: Sistem charging
- cat: Kelistrikan
- short: Rangkaian yang membuat listrik saat mesin hidup dan mengisi aki: generator dan pengatur tegangan (sering disebut kiprok).
- analogy: Seperti pembangkit listrik mini di motormu. Aki hanya penampung. Kalau pembangkitnya lemah, penampungnya terus terkuras.
- how: Saat mesin berputar, generator menghasilkan listrik. Pengatur tegangan menjaga tegangannya tetap aman sebelum dialirkan ke lampu dan aki. Kalau generator lemah atau pengatur tegangan bermasalah, aki tidak terisi dengan baik, atau malah terisi berlebihan.
- signs:
  - Lampu redup, terutama saat idle, lalu terang lagi saat gas ditarik
  - Aki cepat habis walau baru diganti
  - Klakson lemah
  - Lampu terlalu terang atau sering putus, bisa jadi tanda pengisian berlebih
- ignored: Aki terus terkuras dan motor bisa mati mendadak di jalan. Komponen listrik lain ikut terganggu.
- diy: bengkel
- diyWhy: Ini bagian kelistrikan utama. Kamu boleh memperhatikan gejalanya, seperti lampu redup atau aki cepat habis, tetapi pengukuran dan penggantiannya harus di bengkel.
- ask:
  - Tegangan pengisian saat mesin hidup sudah diukur? Hasilnya bagaimana?
  - Yang bermasalah generatornya atau pengatur tegangannya?
  - Setelah pengisian diperbaiki, akinya perlu diganti juga atau cukup diisi ulang?
- related: aki

---

## 3. Sensor

- id: sensor
- term: Sensor
- cat: Kelistrikan
- short: Komponen kecil yang membaca kondisi motor, misalnya posisi gas, suhu, atau putaran mesin, lalu melaporkannya ke komputer motor.
- analogy: Seperti indra untuk motor. Komputer motor tidak bisa melihat atau merasakan sendiri, ia hanya tahu apa yang dilaporkan sensor.
- how: Pada motor injeksi, komputer motor memakai data sensor untuk mengatur jumlah bensin dan waktu pengapian. Kalau satu sensor memberi data yang keliru, komputer ikut keliru, walaupun komponen lain sehat.
- signs:
  - Lampu indikator mesin menyala (kalau motormu punya)
  - Brebet atau putaran idle tidak stabil
  - Bensin terasa boros tanpa sebab yang jelas
  - Susah hidup, atau mesin mati di waktu yang tidak menentu
- ignored: Mesin bekerja dengan pengaturan yang salah, jadi tenaga turun dan boros. Sensor yang keliru juga bisa menyamarkan penyebab masalah yang sebenarnya.
- diy: bengkel
- diyWhy: Sensor perlu diperiksa dengan alat diagnosis. Menebak lalu mengganti sensor satu per satu tanpa membaca datanya hanya membuang waktu.
- ask:
  - Ada kode kesalahan yang terbaca dari komputer motor? Kodenya apa?
  - Apa bukti sensor yang rusak, bukan kabel atau sambungannya?
  - Sensor sudah dites dulu sebelum diganti?
- related: throttle-body, injector

---

## 4. Servis rutin

- id: servis-rutin
- term: Servis rutin
- cat: Perawatan
- short: Pemeriksaan dan perawatan berkala sesuai jadwal di buku manual, sebelum ada yang rusak.
- analogy: Seperti cek kesehatan berkala. Tujuannya menemukan masalah kecil sebelum jadi besar.
- how: Mekanik memeriksa dan merawat bagian yang aus pelan-pelan, seperti oli, filter, busi, rantai, rem, ban, dan aki, lalu menyetelnya. Isinya bergantung pada tipe motor dan jadwal di buku manual.
- signs:
  - Sudah mencapai jadwal servis di buku manual (jarak tempuh atau waktu)
  - Motor terasa berbeda: tarikan berat, boros, atau ada bunyi baru
  - Sudah lama tidak diperiksa sama sekali
- ignored: Bagian yang mulai aus tidak terdeteksi sampai benar-benar bermasalah, dan perbaikannya bisa jadi lebih besar.
- diy: hati
- diyWhy: Sebagian bisa kamu lakukan sendiri, seperti mengecek tekanan ban, melihat level oli, dan melihat kondisi rantai. Pemeriksaan menyeluruh, terutama rem, bensin, dan kelistrikan, sebaiknya di bengkel.
- ask:
  - Apa saja yang diperiksa dan diganti pada servis ini? Boleh saya lihat daftarnya?
  - Mana yang perlu dikerjakan sekarang, mana yang bisa ditunda, dan kenapa?
  - Kalau ada komponen yang diganti, boleh saya lihat komponen lamanya?
- related: oli-mesin, filter-udara, busi, tune-up

---

## 5. Tune-up

- id: tune-up
- term: Tune-up
- cat: Perawatan
- short: Pemeriksaan dan penyetelan mesin untuk mengembalikan kinerja pembakarannya.
- analogy: Seperti menyetel gitar. Alatnya masih sehat, tetapi nadanya perlu dirapikan supaya enak lagi.
- how: Mekanik memeriksa dan menyetel bagian yang memengaruhi pembakaran, misalnya busi, filter udara, dan setelan idle atau campuran, serta membersihkan saluran bensin dan udara. Isinya berbeda antar bengkel dan tipe motor, jadi tanyakan apa saja yang dikerjakan.
- signs:
  - Tarikan terasa berat dan bensin terasa lebih boros
  - Susah hidup atau idle terasa kasar
  - Brebet ringan
  - Sudah lama tidak diservis
- ignored: Pembakaran makin tidak efisien dan gejala ringan makin sering muncul. Tune-up bukan obat untuk semua masalah. Gejala berat tetap perlu diagnosis.
- diy: bengkel
- diyWhy: Tune-up menyentuh pengapian dan sistem bensin, jadi dikerjakan di bengkel. Kamu boleh membantu dengan mengecek hal ringan seperti filter udara dan busi lewat tutorial kalau motormu mudah dijangkau.
- ask:
  - Apa saja yang termasuk dalam tune-up ini? Boleh saya lihat daftar pekerjaannya?
  - Keluhan saya diharapkan membaik karena bagian yang mana?
  - Kalau setelah tune-up keluhan belum hilang, pemeriksaan berikutnya apa?
- related: servis-rutin, busi, filter-udara, overhaul

---

## 6. Overhaul

- id: overhaul
- term: Overhaul
- cat: Perawatan
- short: Pembongkaran mesin secara menyeluruh untuk memeriksa dan mengganti bagian dalam yang aus atau rusak.
- analogy: Seperti operasi besar. Bukan perawatan biasa, melainkan pemeriksaan dan perbaikan bagian dalam yang tidak terjangkau dari luar.
- how: Mesin dibongkar sampai bagian dalamnya, seperti piston, silinder, dan klep, diperiksa dan diukur. Bagian yang aus diganti, lalu semuanya dirakit ulang. Biasanya dilakukan kalau ada kerusakan di dalam mesin, bukan untuk gejala ringan.
- signs:
  - Tenaga turun drastis dan tidak membaik setelah perawatan biasa
  - Asap tebal yang muncul terus-menerus
  - Bunyi kasar dari dalam mesin
  - Oli cepat berkurang tanpa bocor yang terlihat
- ignored: Kerusakan di dalam mesin bisa makin parah. Karena overhaul keputusan besar, minta penjelasan tertulis dan bukti kerusakan sebelum menyetujuinya.
- diy: bengkel
- diyWhy: Overhaul melibatkan pembongkaran mesin dan pengukuran yang presisi. Tidak untuk dikerjakan sendiri.
- ask:
  - Apa bukti bagian dalam mesin yang rusak? Boleh saya lihat?
  - Ada opsi perbaikan yang lebih ringan sebelum overhaul?
  - Komponen apa yang diganti dan alasannya? Boleh saya minta komponen lamanya dikembalikan?
  - Mohon rincian pekerjaannya secara tertulis sebelum dimulai.
- related: tune-up, servis-rutin, oli-mesin
