import { describe, expect, it } from "vitest";

import { getAllTutorials, getTutorialBySlug } from "@/data/tutorials";

const NEW_FIELDS = [
  "kenapaPerlu",
  "kapanDilakukan",
  "sebelumMulai",
  "alasanPerLangkah",
  "tandaBenar",
] as const;

describe("konten tutorial Tahap D", () => {
  it("hanya mengisi field baru pada cek-tekanan-ban", () => {
    const enriched = getTutorialBySlug("cek-tekanan-ban");
    expect(enriched).toBeDefined();

    for (const field of NEW_FIELDS) {
      expect(enriched![field], `field kosong: ${field}`).toBeDefined();
    }

    for (const tutorial of getAllTutorials()) {
      if (tutorial.slug === "cek-tekanan-ban") continue;
      for (const field of NEW_FIELDS) {
        expect(tutorial[field], `field tidak boleh terisi: ${tutorial.slug}.${field}`).toBeUndefined();
      }
    }
  });

  it("memakai teks yang disetujui untuk kapanDilakukan", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.kapanDilakukan).toBe(
      "Cek secara berkala dan sebelum perjalanan jauh. Ikuti anjuran jadwal di buku manual motormu.",
    );
    expect(tutorial.kapanDilakukan).not.toContain("Seminggu sekali");
  });

  it("memakai teks kenapaPerlu dan tandaBenar dari sumber", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.kenapaPerlu).toBe(
      "Tekanan ban yang tepat membuat motor stabil, hemat, dan ban lebih awet. Ban kurang angin membuat motor terasa berat dan boros, serta lebih cepat aus di bagian tepinya.",
    );
    expect(tutorial.tandaBenar).toBe(
      "Semua langkah selesai. Kalau angkanya sudah sesuai anjuran, kamu beres.",
    );
  });

  it("memakai sebab dari STEPS prototipe untuk setiap langkah", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.alasanPerLangkah).toEqual([
      "Ban yang baru dipakai jauh menjadi hangat dan angkanya naik, jadi hasil ukur tidak akurat.",
      "Tiap motor berbeda, dan ban depan bisa berbeda dari ban belakang. Jangan memakai angka dari ingatan.",
      "Kalau miring, udara bocor dan angkanya tidak tepat.",
      "Terlalu keras atau terlalu lembek sama-sama membuat motor kurang stabil.",
      "Tutup melindungi pentil dari debu yang bisa membuat bocor halus.",
      "Cari benda tajam, retakan, atau benjolan. Kalau ada, hentikan dan ke bengkel.",
    ]);
    expect(tutorial.alasanPerLangkah).toHaveLength(tutorial.steps.length);
    expect(tutorial.sebelumMulai).toEqual([
      "Parkir di tempat datar, saat ban masih dingin",
      "Cari angka tekanan anjuran di stiker pada motor atau buku manual",
    ]);
  });

  it("tidak mengubah steps dan when_to_stop lama", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    expect(tutorial.steps).toHaveLength(6);
    expect(tutorial.steps[0]).toBe(
      "Parkirkan motor di tempat datar dan pastikan posisi motor stabil sebelum mulai.",
    );
    expect(tutorial.when_to_stop.length).toBeGreaterThan(0);
    expect(tutorial.when_to_stop).toContain(
      "Ban terlihat kempis parah, sobek, benjol, atau ada benda menancap di ban.",
    );
  });
});
