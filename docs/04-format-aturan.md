# 04 — Format Data Aturan (Mesin Analisis)

Mesin analisis bersifat **rule-based, deterministik, dan lokal**. Tidak ada AI dan tidak ada panggilan jaringan pada MVP.

Lokasi target:

```text
src/types/rule.ts          # tipe data
src/types/analysis.ts      # input/output analisis
src/data/rules/*.ts        # data aturan
src/lib/analysis/*.ts      # mesin: normalisasi, skor, urgensi, safety
```

## 1. Tipe domain

```ts
// src/types/rule.ts
export type MotorcycleType = "bebek" | "matik" | "sport" | "listrik";

export type Urgency =
  | "aman_ditunda"
  | "perlu_segera_diperiksa"
  | "jangan_dikendarai";

export type SafetyCategory =
  | "rem"
  | "kebocoran_bahan_bakar"
  | "kelistrikan_utama"
  | "mesin"
  | "motor_listrik";

export type EngineTemperature = "dingin" | "panas" | "tidak_tahu";
export type Flag = boolean | "tidak_tahu";

export interface FollowUpAnswers {
  engineTemperature?: EngineTemperature;
  indicatorLight?: Flag;
  smoke?: Flag;
  unusualSound?: Flag;
  leak?: Flag;
  smell?: Flag;
  disappearsAfterWarmup?: Flag;
  afterAccidentOrFlood?: Flag;
  replacedPartsBefore?: Flag;
}

export interface RuleCondition {
  engineTemperature?: EngineTemperature[];
  indicatorLight?: boolean;
  smoke?: boolean;
  unusualSound?: boolean;
  leak?: boolean;
  smell?: boolean;
  disappearsAfterWarmup?: boolean;
  afterAccidentOrFlood?: boolean;
  replacedPartsBefore?: boolean;
}

export interface ComplaintRule {
  id: string;
  category: "umum" | SafetyCategory;
  keywords: string[];
  applicableTypes: MotorcycleType[];
  conditions?: RuleCondition;
  possibleCauses: string[];
  componentsToCheck: string[];
  urgency: Urgency;
  safetyLock: boolean;
  safetyCategory?: SafetyCategory;
  relatedTutorials: string[];
  mechanicQuestions: string[];
}
```

```ts
// src/types/analysis.ts
export interface AnalysisInput {
  complaint: string;
  motorcycleType: MotorcycleType;
  answers: FollowUpAnswers;
}

export interface Cause {
  ruleId: string;
  text: string;
  score: number;
}

export interface AnalysisResult {
  summary: string;
  possibleCauses: Cause[];
  componentsToCheck: string[];
  urgency: Urgency;
  safetyLocked: boolean;
  safetyCategories: SafetyCategory[];
  recommendedTutorials: string[];
  mechanicQuestions: string[];
  checklist: string[];
  disclaimer: string;
  matchedRuleIds: string[];
}
```

Aturan untuk `applicableTypes`: tulis semua tipe yang relevan secara eksplisit. Untuk aturan umum, tulis keempat tipe (`["bebek", "matik", "sport", "listrik"]`). Tipe yang tidak cocok membuat aturan dilewati. Ini mencegah aturan khusus matik muncul untuk motor sport atau motor listrik.

## 2. Normalisasi teks

Sebelum pencocokan:

1. Ubah ke huruf kecil.
2. Ganti tanda baca dengan spasi.
3. Ringkas spasi berulang.
4. Cocokkan frasa dengan pencarian substring pada teks yang sudah dinormalisasi.

Sinonim dan variasi bahasa sehari-hari dimasukkan sebagai elemen `keywords`, bukan lewat kamus tersembunyi. Contoh: `["susah hidup", "susah dinyalakan", "susah distarter", "starter lama"]`.

## 3. Skor kecocokan

Skor setiap aturan:

```text
keywordScore   = jumlah bobot keyword yang ditemukan
typeScore      = 1 jika motorcycleType ada di applicableTypes
conditionScore = 2 × jumlah kondisi cocok − 2 × jumlah kondisi tidak cocok
totalScore     = keywordScore + typeScore + conditionScore
```

Bobot keyword berdasarkan jumlah kata:

| Panjang frasa | Bobot |
|---|---|
| 1 kata | 2 |
| 2 kata | 3 |
| 3 kata atau lebih | 4 |

Aturan dianggap **cocok** jika:

- `keywordScore >= 2` (minimal satu keyword bermakna ditemukan), **dan**
- `totalScore >= 3`.

Jawaban `"tidak_tahu"` diabaikan saat menghitung `conditionScore` (tidak menambah dan tidak mengurangi). Kondisi yang tidak diisi di `RuleCondition` tidak dinilai.

```text
CONTOH
Keluhan: "motor susah hidup pagi"
Jenis: matik
Aturan "susah-hidup-dingin":
  keyword "susah hidup" (2 kata)        +3
  tipe matik cocok                      +1
  kondisi engineTemperature = dingin    +2
  total                                 +6  → cocok
```

## 4. Pemilihan hasil

Jika beberapa aturan cocok:

1. **Penyebab dan komponen** diambil dari aturan dengan `totalScore` tertinggi.
2. **Urgensi akhir** = level tertinggi di antara semua aturan yang cocok.
3. **Safety lock** aktif jika ada minimal satu aturan cocok dengan `safetyLock: true`.
4. `matchedRuleIds` mencatat semua aturan cocok untuk debugging dan pengujian.

Urutan tingkat urgensi (rendah → tinggi):

```text
aman_ditunda < perlu_segera_diperiksa < jangan_dikendarai
```

Tie-break jika skor sama:

1. Aturan dengan `safetyLock: true` didahulukan.
2. `keywordScore` lebih tinggi.
3. `id` secara leksikografis (agar deterministik).

## 5. Safety lock

Kategori terkunci: `rem`, `kebocoran_bahan_bakar`, `kelistrikan_utama`, `mesin`, `motor_listrik`.

Aturan perilaku:

- `safetyLock: true` **wajib** disertai `safetyCategory`.
- Jika ada aturan safety yang cocok:
  - `safetyLocked = true`.
  - Urgensi minimal `perlu_segera_diperiksa`; aturan akut seperti rem blong, kebocoran bahan bakar, korsleting, overheat berat, atau gangguan tegangan tinggi motor listrik menetapkan `jangan_dikendarai`.
  - Tidak ada saran bongkar sendiri.
  - Rekomendasi tutorial DIY dikosongkan (`recommendedTutorials = []`).
  - UI menampilkan peringatan keselamatan dan CTA ke bengkel/teknisi.
- Kategori `mesin` hanya dipakai untuk gejala berat (overheat, suara ketukan keras, mesin mati berulang, asap putih tebal). Gejala ringan seperti brebet tidak otomatis dianggap safety.

Pengaman kode di `lib/analysis/safety.ts` memaksa aturan di atas, sehingga kesalahan penandaan data tidak bisa menghasilkan saran bongkar sendiri.

## 6. Fallback tanpa aturan cocok

Jika tidak ada aturan yang memenuhi ambang:

- `possibleCauses = []`
- `componentsToCheck = ["Periksa menyeluruh di bengkel"]`
- `urgency = "perlu_segera_diperiksa"` hanya jika pengguna menandai gejala berat; selain itu `"aman_ditunda"`.
- `recommendedTutorials = []`
- `mechanicQuestions` = pertanyaan umum.
- `checklist` = checklist anti getok harga.
- `summary` tetap dibuat dari keluhan pengguna.
- `disclaimer` tetap tampil.

Hasil fallback tidak boleh menyebut diagnosis tertentu.

## 7. Template ringkasan dan pesan

Ringkasan keluhan:

```text
Keluhan: {ringkasan singkat keluhan pengguna}
Jenis motor: {jenis}
Hal yang perlu diperiksa: {komponen}
Tingkat urgensi: {label urgensi}
```

Pesan mekanik memakai template dari brief, memuat:

- Jenis motor.
- Daftar keluhan.
- Riwayat singkat (jika ada).
- Komponen yang perlu diperiksa.
- Permintaan penyebab, komponen yang diganti, estimasi biaya jasa/sparepart, waktu pengerjaan.
- Permintaan konfirmasi sebelum penggantian komponen.

Larangan: jangan menyisipkan angka perkiraan harga ke template.

## 8. Contoh aturan

```ts
// src/data/rules/rem.ts
import type { ComplaintRule } from "@/types/rule";

export const remRules: ComplaintRule[] = [
  {
    id: "rem-kampas-aus",
    category: "rem",
    keywords: ["rem blong", "rem tidak pakem", "rem berbunyi", "rem berdecit", "rem keras"],
    applicableTypes: ["bebek", "matik", "sport", "listrik"],
    conditions: { unusualSound: true, leak: true },
    possibleCauses: [
      "Kampas rem aus",
      "Disc/drum rem kotor atau tergores",
      "Udara di saluran rem hidraulis",
      "Minyak rem berkurang atau bocor",
    ],
    componentsToCheck: ["Kampas rem", "Disc/drum rem", "Minyak rem", "Selang rem"],
    urgency: "jangan_dikendarai",
    safetyLock: true,
    safetyCategory: "rem",
    relatedTutorials: [],
    mechanicQuestions: [
      "Apakah kampas rem masih memiliki ketebalan aman?",
      "Apakah ada kebocoran minyak rem?",
      "Apakah disc/drum perlu diganti atau hanya dibersihkan?",
    ],
  },
];
```

```ts
// src/data/rules/bahan-bakar.ts
export const bahanBakarRules: ComplaintRule[] = [
  {
    id: "bahan-bakar-bocor",
    category: "kebocoran_bahan_bakar",
    keywords: ["bau bensin", "bensin bocor", "tetes bensin", "selang bocor", "tank bocor"],
    applicableTypes: ["bebek", "matik", "sport"],
    conditions: { smell: true, leak: true },
    possibleCauses: [
      "Selang bahan bakar retak",
      "Klem selang longgar",
      "Karet seal tank atau karburator/injector bocor",
      "Tank berkarat atau retak",
    ],
    componentsToCheck: ["Selang bahan bakar", "Klem selang", "Seal tank", "Karburator/injector"],
    urgency: "jangan_dikendarai",
    safetyLock: true,
    safetyCategory: "kebocoran_bahan_bakar",
    relatedTutorials: [],
    mechanicQuestions: [
      "Di bagian mana kebocoran terlihat?",
      "Apakah selang cukup diganti atau tank perlu diperbaiki?",
    ],
  },
];
```

```ts
// src/data/rules/mesin.ts
export const mesinRules: ComplaintRule[] = [
  {
    id: "susah-hidup-dingin",
    category: "umum",
    keywords: ["susah hidup", "susah dinyalakan", "susah distarter", "starter lama"],
    applicableTypes: ["bebek", "matik", "sport"],
    conditions: { engineTemperature: ["dingin"], disappearsAfterWarmup: true },
    possibleCauses: [
      "Busi lemah atau kotor",
      "Aki lemah",
      "Sistem bahan bakar kotor",
      "Setelan idle tidak tepat",
    ],
    componentsToCheck: ["Busi", "Aki", "Filter udara", "Throttle body/karburator"],
    urgency: "perlu_segera_diperiksa",
    safetyLock: false,
    relatedTutorials: ["cek-ganti-busi", "cek-aki-terminal"],
    mechanicQuestions: [
      "Apakah keluhan hilang setelah mesin panas?",
      "Kapan terakhir busi dan aki diperiksa?",
    ],
  },
];
```

```ts
// src/data/rules/motor-listrik.ts
export const motorListrikRules: ComplaintRule[] = [
  {
    id: "listrik-daya-hilang",
    category: "motor_listrik",
    keywords: ["motor listrik mati", "tidak mau menyala", "daya hilang", "batrai drop", "bau gosong"],
    applicableTypes: ["listrik"],
    conditions: { indicatorLight: true, smell: true },
    possibleCauses: [
      "Baterai dalam kondisi tidak aman",
      "Konektor atau kabel tegangan tinggi longgar",
      "Kontroler bermasalah",
      "Sistem pengisian daya bermasalah",
    ],
    componentsToCheck: ["Baterai", "Konektor tegangan tinggi", "Kontroler", "Charger"],
    urgency: "jangan_dikendarai",
    safetyLock: true,
    safetyCategory: "motor_listrik",
    relatedTutorials: [],
    mechanicQuestions: [
      "Apakah ada bau gosong atau panas berlebih?",
      "Apakah indikator baterai menunjukkan kode error?",
    ],
  },
];
```

Data aturan diagregasi di `src/data/rules/index.ts` sebagai satu array `complaintRules`. Urutan array tidak menentukan hasil; skor dan tie-break yang menentukan.

## 9. Sepuluh slug tutorial MVP

| Slug | Topik | Tingkat |
|---|---|---|
| `cek-tekanan-ban` | Mengecek tekanan ban | mudah |
| `ganti-oli-mesin` | Mengganti oli mesin | sedang |
| `cek-ganti-busi` | Mengecek dan mengganti busi | mudah |
| `setel-rantai` | Menyetel rantai | sedang |
| `cek-kampas-rem` | Mengecek kampas rem | mudah |
| `cek-aki-terminal` | Mengecek aki dan terminal | mudah |
| `bersihkan-filter-udara` | Membersihkan filter udara | mudah |
| `cek-lampu-kelistrikan-dasar` | Mengecek lampu dan kelistrikan dasar | mudah |
| `cek-kebocoran-oli-bahan-bakar` | Mengenali kebocoran oli/bahan bakar | mudah |
| `perawatan-dasar-motor-listrik` | Perawatan dasar motor listrik | sedang |

Setiap tutorial wajib memuat peringatan keselamatan dan bagian "kapan harus berhenti dan ke bengkel". Tutorial tidak boleh memuat langkah bongkar komponen berisiko tinggi.

## 10. Checklist menambah aturan

- [ ] `id` unik dan deskriptif.
- [ ] `keywords` memuat variasi bahasa sehari-hari, bukan hanya istilah teknis.
- [ ] `applicableTypes` eksplisit dan benar.
- [ ] `conditions` hanya berisi sinyal yang benar-benar membedakan.
- [ ] `possibleCauses` berurutan dari yang paling umum.
- [ ] `urgency` sesuai tingkat risiko.
- [ ] Jika `safetyLock: true`, `safetyCategory` terisi dan tidak ada saran bongkar sendiri.
- [ ] `relatedTutorials` hanya berisi slug yang ada; kosongkan untuk safety lock.
- [ ] `mechanicQuestions` spesifik dan tidak menyinggung bengkel tertentu.
- [ ] Tidak ada estimasi harga.
- [ ] Ada minimal satu kasus uji positif dan satu kasus negatif.

## 11. Rencana pengujian (Tahap 3)

| Uji | Ekspektasi |
|---|---|
| Keluhan rem blong | `safetyLocked = true`, urgensi `jangan_dikendarai`, tutorial DIY kosong |
| Keluhan bensin bocor | `safetyLocked = true`, CTA bengkel |
| Keluhan susah hidup dingin | penyebab dari aturan skor tertinggi, bukan diagnosis pasti |
| Motor listrik dengan bau gosong | safety lock kategori `motor_listrik` |
| Keluhan tanpa aturan cocok | fallback, tanpa penyebab spesifik |
| Dua aturan cocok dengan urgensi berbeda | urgensi tertinggi dipakai |
| Skor sama | tie-break deterministik |
| Input kosong/terlalu pendek | validasi UI, mesin tidak dipanggil atau fallback |

Pengujian mesin tidak memerlukan browser atau database.
