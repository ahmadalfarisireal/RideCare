import { describe, expect, it } from "vitest";
import { analyze, normalizeText } from "@/lib/complaint-engine";
import { complaintRules } from "@/data/complaint-rules";
import type { AnalysisInput, Rule } from "@/lib/complaint-engine/types";

function baseInput(overrides: Partial<AnalysisInput> = {}): AnalysisInput {
  return {
    complaint: "",
    motorcycleType: "matik",
    answers: {},
    ...overrides,
  };
}

describe("normalizeText", () => {
  it("mengubah huruf kecil, menghapus tanda baca, dan merapikan spasi", () => {
    expect(normalizeText("  Motor, SUSAH  Hidup!!! Pagi... ")).toBe(
      "motor susah hidup pagi",
    );
  });

  it("menangani variasi bahasa sehari-hari melalui pencocokan teks keluhan", () => {
    const brebet = analyze(baseInput({ complaint: "Motor brebet saat digas", motorcycleType: "bebek" }));
    expect(brebet.matchedRuleIds).toContain("mesin-brebet-tarikan-tidak-stabil");

    const ngelitik = analyze(baseInput({ complaint: "Tarikan ngelitik di jalan", motorcycleType: "matik" }));
    expect(ngelitik.matchedRuleIds).toContain("mesin-brebet-tarikan-tidak-stabil");

    const susahIdup = analyze(
      baseInput({
        complaint: "Motor susah idup pagi hari",
        motorcycleType: "bebek",
        answers: { engineTemperature: "dingin", disappearsAfterWarmup: true },
      }),
    );
    expect(susahIdup.matchedRuleIds).toContain("starter-susah-hidup-pagi");

    const matiMendadak = analyze(
      baseInput({
        complaint: "Motor mati mendadak saat berhenti di lampu merah",
        motorcycleType: "matik",
      }),
    );
    expect(matiMendadak.matchedRuleIds).toContain("mesin-mati-lampu-merah");
  });
});

describe("skoring dan filter", () => {
  it("mencocokkan kata kunci, jenis motor, dan kondisi jawaban pendamping", () => {
    const result = analyze(
      baseInput({
        complaint: "motor susah hidup pagi",
        motorcycleType: "matik",
        answers: { engineTemperature: "dingin", disappearsAfterWarmup: true },
      }),
    );

    expect(result.matchedRuleIds.length).toBeGreaterThan(0);
    expect(result.possibleCauses[0]?.ruleId).toBe("starter-susah-hidup-pagi");
    expect(result.possibleCauses[0]?.score ?? 0).toBeGreaterThanOrEqual(6);
  });

  it("memfilter aturan berdasarkan jenis motor", () => {
    const rantaiSport = analyze(
      baseInput({ complaint: "rantai berderak dan kasar", motorcycleType: "sport" }),
    );
    expect(rantaiSport.matchedRuleIds).toContain("rantai-berderak-kasar");

    const rantaiMatik = analyze(
      baseInput({ complaint: "rantai berderak dan kasar", motorcycleType: "matik" }),
    );
    expect(rantaiMatik.matchedRuleIds).not.toContain("rantai-berderak-kasar");
  });
});

describe("urgensi dan safety", () => {
  it("memakai urgensi tertinggi saat beberapa aturan cocok", () => {
    const result = analyze(
      baseInput({
        complaint: "motor brebet dan rem berbunyi",
        motorcycleType: "matik",
        answers: { unusualSound: true },
      }),
    );

    expect(result.matchedRuleIds).toContain("mesin-brebet-tarikan-tidak-stabil");
    expect(result.matchedRuleIds).toContain("rem-berbunyi-tidak-pakem");
    expect(result.urgency).toBe("jangan_dikendarai");
  });

  it("menerapkan safety_lock: arahkan ke bengkel dan tanpa saran bongkar/tutorial", () => {
    const result = analyze(
      baseInput({
        complaint: "rem blong dan tidak pakem",
        motorcycleType: "bebek",
        answers: { unusualSound: true },
      }),
    );

    expect(result.safetyLocked).toBe(true);
    expect(result.safetyCategories).toContain("rem");
    expect(result.urgency).toBe("jangan_dikendarai");
    expect(result.recommendedTutorials).toEqual([]);
    expect(result.mechanicQuestions.join(" ").toLowerCase()).toContain("bengkel");
    expect(result.mechanicQuestions.join(" ").toLowerCase()).toContain("jangan bongkar");
  });

  it("aturan terkunci yang cocok tidak pernah aman_ditunda", () => {
    const result = analyze(
      baseInput({
        complaint: "bau bensin dan bensin bocor",
        motorcycleType: "matik",
        answers: { smell: true, leak: true },
      }),
    );
    expect(result.safetyLocked).toBe(true);
    expect(result.urgency).not.toBe("aman_ditunda");
    expect(["perlu_segera_diperiksa", "jangan_dikendarai"]).toContain(result.urgency);
  });

  it("gejala akut memaksa jangan_dikendarai", () => {
    const korsleting = analyze(
      baseInput({
        complaint: "bau gosong dan korsleting di kabel",
        motorcycleType: "bebek",
        answers: { smell: true },
      }),
    );
    expect(korsleting.urgency).toBe("jangan_dikendarai");

    const menetes = analyze(
      baseInput({
        complaint: "bensin menetes dari motor",
        motorcycleType: "sport",
        answers: { leak: true, smell: true },
      }),
    );
    expect(menetes.urgency).toBe("jangan_dikendarai");
  });

  it("lampu redup/aki tekor tidak terkunci dan boleh rekomendasi tutorial cek aki", () => {
    const result = analyze(
      baseInput({
        complaint: "lampu redup dan aki cepat habis",
        motorcycleType: "matik",
        answers: { indicatorLight: true },
      }),
    );
    expect(result.safetyLocked).toBe(false);
    expect(result.urgency).toBe("perlu_segera_diperiksa");
    expect(result.recommendedTutorials).toContain("cek-aki-terminal");
  });
});

describe("fallback", () => {
  it("mengembalikan hasil umum saat tidak ada aturan cocok", () => {
    const result = analyze(
      baseInput({
        complaint: "warna motor kusam dan jok sobek",
        motorcycleType: "bebek",
      }),
    );

    expect(result.matchedRuleIds).toEqual([]);
    expect(result.possibleCauses).toEqual([]);
    expect(result.urgency).toBe("perlu_segera_diperiksa");
    expect(result.recommendedTutorials).toEqual([]);
    expect(result.checklist.length).toBeGreaterThan(0);
    expect(result.mechanicQuestions.join(" ").toLowerCase()).toContain("bengkel");
    expect(result.disclaimer).toContain("bukan diagnosis pasti");
  });
});

describe("safety data dan pengaman kode", () => {
  it("setiap aturan ber-safety_lock tidak pernah menghasilkan saran bongkar/tutorial", () => {
    const safetyRules = complaintRules.filter((rule) => rule.safety_lock);
    expect(safetyRules.length).toBeGreaterThan(0);

    for (const rule of safetyRules) {
      const result = analyze(inputForRule(rule));
      expect(result.matchedRuleIds).toContain(rule.id);
      expect(result.safetyLocked).toBe(true);
      expect(result.recommendedTutorials).toEqual([]);
      expect(result.urgency).not.toBe("aman_ditunda");
      expect(result.mechanicQuestions.join(" ").toLowerCase()).toContain("bengkel");
    }
  });

  it("aturan dengan safety_category terkunci tetapi safety_lock=false tetap terkunci tanpa tutorial", () => {
    const unsafeRule: Rule = {
      id: "tes-salah-tandai-mesin",
      keywords: ["tes gejala mesin berat"],
      applicable_types: ["bebek", "matik", "sport", "listrik"],
      possible_causes: ["Kemungkinan masalah mesin."],
      components_to_check: ["Mesin"],
      urgency: "aman_ditunda",
      safety_lock: false,
      safety_category: "mesin",
      related_tutorials: ["cek-ganti-busi"],
      mechanic_questions: ["Periksa mesin."],
    };

    const result = analyzeWithRules(
      baseInput({ complaint: "tes gejala mesin berat", motorcycleType: "matik" }),
      [unsafeRule],
    );

    expect(result.matchedRuleIds).toContain("tes-salah-tandai-mesin");
    expect(result.safetyLocked).toBe(true);
    expect(result.safetyCategories).toContain("mesin");
    expect(result.urgency).not.toBe("aman_ditunda");
    expect(result.recommendedTutorials).toEqual([]);
  });
});

function inputForRule(rule: Rule): AnalysisInput {
  const complaint = rule.keywords[0] ?? rule.id;
  const motorcycleType = rule.applicable_types[0] ?? "matik";
  const answers: AnalysisInput["answers"] = {};

  if (rule.conditions?.engineTemperature?.length) {
    answers.engineTemperature = rule.conditions.engineTemperature[0];
  }
  for (const key of [
    "indicatorLight",
    "smoke",
    "unusualSound",
    "leak",
    "smell",
    "disappearsAfterWarmup",
    "afterAccidentOrFlood",
    "replacedPartsBefore",
  ] as const) {
    if (typeof rule.conditions?.[key] === "boolean") {
      answers[key] = rule.conditions[key] as boolean;
    }
  }
  // help acute/locked cases
  if (rule.safety_category === "kebocoran_bahan_bakar") {
    answers.leak = true;
    answers.smell = true;
  }
  if (rule.safety_category === "kelistrikan_utama") {
    answers.smell = true;
  }
  if (rule.safety_category === "rem") {
    answers.unusualSound = true;
  }
  if (rule.safety_category === "mesin") {
    answers.smoke = true;
  }
  if (rule.safety_category === "motor_listrik") {
    answers.indicatorLight = true;
  }
  if (rule.id.includes("banjir") || rule.id.includes("kecelakaan")) {
    answers.afterAccidentOrFlood = true;
  }

  return { complaint, motorcycleType, answers };
}

// helper for safeguard test using custom rule set by simulating analysis logic inline
import { normalizeText as norm } from "@/lib/complaint-engine/normalize";
import { applySafety } from "@/lib/complaint-engine/safety";
import { scoreRule, selectPrimaryRule, compareScoredRules } from "@/lib/complaint-engine/scoring";
import { ANTI_RIPOFF_CHECKLIST, DEFAULT_MECHANIC_QUESTIONS, DISCLAIMER, buildSummary } from "@/lib/complaint-engine/templates";
import { maxUrgency } from "@/lib/complaint-engine/urgency";

function analyzeWithRules(input: AnalysisInput, rules: Rule[]): ReturnType<typeof analyze> {
  const normalizedComplaint = norm(input.complaint);
  const scored = rules.map((rule) => scoreRule(input, rule, normalizedComplaint));
  const matched = scored.filter((s) => s.matched).sort(compareScoredRules);
  const primary = selectPrimaryRule(matched)!;
  const matchedRules = matched.map((s) => s.rule);
  const baseUrgency = maxUrgency(matchedRules.map((r) => r.urgency));
  const safety = applySafety(input, matchedRules, baseUrgency, [...primary.rule.related_tutorials]);
  const components = Array.from(new Set(primary.rule.components_to_check));
  const mechanicQuestions = Array.from(
    new Set([
      ...(safety.mechanicSafetyNote ? [safety.mechanicSafetyNote] : []),
      ...primary.rule.mechanic_questions,
      ...DEFAULT_MECHANIC_QUESTIONS,
    ]),
  );
  return {
    summary: buildSummary(input, components, safety.urgency),
    possibleCauses: primary.rule.possible_causes.map((text) => ({ ruleId: primary.rule.id, text, score: primary.totalScore })),
    componentsToCheck: components,
    urgency: safety.urgency,
    safetyLocked: safety.safetyLocked,
    safetyCategories: safety.safetyCategories,
    recommendedTutorials: safety.recommendedTutorials,
    mechanicQuestions,
    checklist: ANTI_RIPOFF_CHECKLIST,
    disclaimer: DISCLAIMER,
    matchedRuleIds: matchedRules.map((r) => r.id),
  };
}
