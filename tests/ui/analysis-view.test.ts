import { describe, expect, it } from "vitest";

import {
  buildAnalysisInput,
  UNIVERSAL_QUESTION_ID,
} from "@/data/ui/complaint-prompts";
import { getCauseExplanation, formatWhy } from "@/data/ui/cause-explanations";
import { analyze } from "@/lib/complaint-engine";
import { toResultView } from "@/lib/ui/analysis-view";

describe("toResultView", () => {
  it("membuat urutan penyebab tanpa skor atau angka harga", () => {
    const input = buildAnalysisInput({
      motor: "matik",
      symptomId: "susah-hidup",
      answers: {
        when: "dingin",
        starter: "lemah",
        [UNIVERSAL_QUESTION_ID]: "tidak-ada",
      },
    });
    const view = toResultView(input, analyze(input));

    expect(view.causes.length).toBeGreaterThan(1);
    expect(view.causes[0].rankLabel).toBe("Paling mungkin");
    expect(view.causes[1].rankLabel).toBe("Mungkin");
    expect(view.causes[0].why).toContain("mesin dingin");
    expect(view.causes[0].why).not.toContain("{answers}");
    expect(view.causes[0]).not.toHaveProperty("score");
    expect(JSON.stringify(view)).not.toMatch(/\bRp\b|\d+\s?ribu|\d+\s?juta/);
  });

  it("menyembunyikan saran bongkar saat safety_lock aktif", () => {
    const input = buildAnalysisInput({
      motor: "matik",
      symptomId: "rem",
      answers: {
        remtype: "cit",
        [UNIVERSAL_QUESTION_ID]: "tidak-ada",
      },
    });
    const view = toResultView(input, analyze(input));

    expect(view.safetyLocked).toBe(true);
    expect(view.causes.length).toBeGreaterThan(0);
    expect(view.causes.every((cause) => cause.selfCheck === undefined)).toBe(true);
    expect(view.causes.every((cause) => cause.locked)).toBe(true);
    expect(view.causes[0].workshop).toContain("Jangan membongkar");
    expect(view.waMessage.toLowerCase()).toContain("tidak disarankan dikendarai");
    expect(view.waLink).toContain(encodeURIComponent(view.waMessage));
  });

  it("memakai teks pengganti untuk aturan yang belum punya peta teks", () => {
    const fallback = getCauseExplanation("aturan-baru", "Kemungkinan baru.");

    expect(formatWhy(fallback.why, "ada suara kasar")).toContain("ada suara kasar");
    expect(fallback.workshop).toContain("bengkel");
  });

  it("membuat input motor listrik tanpa pertanyaan mesin bensin", () => {
    const input = buildAnalysisInput({
      motor: "listrik",
      symptomId: "susah-hidup",
      answers: { when: "dingin" },
    });
    const view = toResultView(input, analyze(input));

    expect(input.complaint).toContain("motor listrik tidak mau jalan");
    expect(input.complaint).not.toContain("mesin dingin");
    expect(view.safetyLocked).toBe(true);
    expect(view.urgency).toBe("jangan_dikendarai");
  });
});
