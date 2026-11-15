import { describe, expect, it } from "vitest";

import { complaintRules } from "@/data/complaint-rules";
import { getAllTutorials, getTutorialBySlug, TUTORIAL_SLUGS } from "@/data/tutorials";
import { analyze } from "@/lib/complaint-engine";

const MVP_SLUGS = [
  "cek-tekanan-ban",
  "ganti-oli-mesin",
  "cek-ganti-busi",
  "setel-rantai",
  "cek-kampas-rem",
  "cek-aki-terminal",
  "bersihkan-filter-udara",
  "cek-lampu-kelistrikan-dasar",
  "cek-kebocoran-oli-bahan-bakar",
  "perawatan-dasar-motor-listrik",
].sort();

describe("data tutorial", () => {
  it("memuat 10 slug MVP persis", () => {
    expect([...TUTORIAL_SLUGS].sort()).toEqual(MVP_SLUGS);
  });

  it("memiliki slug unik dan dapat ditemukan", () => {
    const unique = new Set(TUTORIAL_SLUGS);
    expect(unique.size).toBe(TUTORIAL_SLUGS.length);
    for (const slug of TUTORIAL_SLUGS) {
      expect(getTutorialBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("semua slug di related_tutorials aturan ada di data tutorial", () => {
    const tutorialSlugs = new Set(TUTORIAL_SLUGS);
    for (const rule of complaintRules) {
      for (const slug of rule.related_tutorials) {
        expect(tutorialSlugs.has(slug), `slug tidak ditemukan: ${slug} (rule ${rule.id})`).toBe(
          true,
        );
      }
    }
  });

  it("setiap tutorial memiliki field wajib terisi dan langkah bernomor (array)", () => {
    const tutorials = getAllTutorials();
    expect(tutorials).toHaveLength(10);

    for (const tutorial of tutorials) {
      expect(tutorial.slug.trim()).not.toBe("");
      expect(tutorial.title.trim()).not.toBe("");
      expect(tutorial.motorcycle_types.length).toBeGreaterThan(0);
      expect(["mudah", "sedang", "sulit"]).toContain(tutorial.difficulty);
      expect(tutorial.estimated_time.trim()).not.toBe("");
      expect(tutorial.tools.length).toBeGreaterThan(0);
      expect(tutorial.tools.every((t) => t.trim().length > 0)).toBe(true);
      expect(tutorial.safety_warnings.length).toBeGreaterThan(0);
      expect(tutorial.safety_warnings.every((t) => t.trim().length > 0)).toBe(true);
      expect(tutorial.steps.length).toBeGreaterThan(0);
      expect(tutorial.steps.every((t) => t.trim().length > 0)).toBe(true);
      expect(tutorial.when_to_stop.length).toBeGreaterThan(0);
      expect(tutorial.when_to_stop.every((t) => t.trim().length > 0)).toBe(true);
    }
  });
});

describe("safety_lock dan tutorial", () => {
  it("aturan safety_lock tetap tidak menampilkan tutorial", () => {
    const safetyRules = complaintRules.filter((rule) => rule.safety_lock);
    expect(safetyRules.length).toBeGreaterThan(0);

    for (const rule of safetyRules) {
      const result = analyze({
        complaint: rule.keywords[0] ?? rule.id,
        motorcycleType: rule.applicable_types[0] ?? "matik",
        answers: {
          engineTemperature: rule.conditions?.engineTemperature?.[0],
          indicatorLight: typeof rule.conditions?.indicatorLight === "boolean" ? rule.conditions.indicatorLight : undefined,
          smoke: typeof rule.conditions?.smoke === "boolean" ? rule.conditions.smoke : undefined,
          unusualSound: typeof rule.conditions?.unusualSound === "boolean" ? rule.conditions.unusualSound : undefined,
          leak: typeof rule.conditions?.leak === "boolean" ? rule.conditions.leak : undefined,
          smell: typeof rule.conditions?.smell === "boolean" ? rule.conditions.smell : undefined,
          disappearsAfterWarmup: typeof rule.conditions?.disappearsAfterWarmup === "boolean" ? rule.conditions.disappearsAfterWarmup : undefined,
          afterAccidentOrFlood: typeof rule.conditions?.afterAccidentOrFlood === "boolean" ? rule.conditions.afterAccidentOrFlood : undefined,
          replacedPartsBefore: typeof rule.conditions?.replacedPartsBefore === "boolean" ? rule.conditions.replacedPartsBefore : undefined,
          ...(rule.safety_category === "kebocoran_bahan_bakar" ? { leak: true, smell: true } : {}),
          ...(rule.safety_category === "kelistrikan_utama" ? { smell: true } : {}),
          ...(rule.safety_category === "rem" ? { unusualSound: true } : {}),
          ...(rule.safety_category === "mesin" ? { smoke: true } : {}),
          ...(rule.safety_category === "motor_listrik" ? { indicatorLight: true } : {}),
          ...(rule.id.includes("banjir") || rule.id.includes("kecelakaan") ? { afterAccidentOrFlood: true } : {}),
        },
      });

      expect(result.matchedRuleIds).toContain(rule.id);
      expect(result.safetyLocked).toBe(true);
      expect(result.recommendedTutorials).toEqual([]);
    }
  });
});
