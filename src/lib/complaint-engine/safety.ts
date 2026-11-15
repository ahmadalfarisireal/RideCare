import { normalizeText } from "./normalize";
import { clampUrgencyAtLeast, maxUrgency } from "./urgency";
import {
  LOCKED_SAFETY_CATEGORIES,
  type AnalysisInput,
  type Rule,
  type SafetyCategory,
  type Urgency,
} from "./types";

const ACUTE_PATTERNS: RegExp[] = [
  /rem blong/,
  /rem tidak pakem/,
  /rem tidak berfungsi/,
  /bensin menetes/,
  /bensin bocor/,
  /tetes bensin/,
  /bau gosong/,
  /korsleting/,
  /kabel panas/,
  /kabel meleleh/,
  /sekring putus/,
  /overheat parah/,
  /mesin sangat panas/,
  /asap tebal/,
  /baterai panas/,
  /baterai kembung/,
  /baterai berasap/,
  /tegangan tinggi/,
];

export function isLockedSafetyCategory(category: string | undefined): category is SafetyCategory {
  return !!category && (LOCKED_SAFETY_CATEGORIES as string[]).includes(category);
}

export function isRuleSafetyLocked(rule: Rule): boolean {
  return rule.safety_lock || isLockedSafetyCategory(rule.safety_category);
}

export function detectAcute(input: AnalysisInput, matchedRules: Rule[]): boolean {
  const normalized = normalizeText(input.complaint);
  if (ACUTE_PATTERNS.some((pattern) => pattern.test(normalized))) return true;
  if (input.answers.smell === true && normalized.includes("gosong")) return true;
  if (input.answers.smoke === true && (normalized.includes("tebal") || normalized.includes("overheat"))) return true;
  for (const rule of matchedRules) {
    if (!isRuleSafetyLocked(rule)) continue;
    const ruleText = normalizeText([rule.id, ...rule.keywords, ...rule.possible_causes].join(" "));
    if (/(blong|menetes|bocor|gosong|korsleting|meleleh|overheat|sangat panas|asap tebal|baterai panas|baterai kembung)/.test(ruleText)) {
      return true;
    }
    if (rule.urgency === "jangan_dikendarai") return true;
  }
  return false;
}

export interface SafetyEvaluation {
  safetyLocked: boolean;
  safetyCategories: SafetyCategory[];
  urgency: Urgency;
  recommendedTutorials: string[];
  mechanicSafetyNote?: string;
}

export function applySafety(
  input: AnalysisInput,
  matchedRules: Rule[],
  baseUrgency: Urgency,
  baseTutorials: string[],
): SafetyEvaluation {
  const lockedRules = matchedRules.filter(isRuleSafetyLocked);
  const categories = Array.from(
    new Set(lockedRules.map((r) => r.safety_category).filter(isLockedSafetyCategory)),
  );

  if (lockedRules.length === 0) {
    return {
      safetyLocked: false,
      safetyCategories: [],
      urgency: baseUrgency,
      recommendedTutorials: baseTutorials,
    };
  }

  const acute = detectAcute(input, lockedRules);
  let urgency = clampUrgencyAtLeast(baseUrgency, "perlu_segera_diperiksa");
  if (acute) {
    urgency = "jangan_dikendarai";
  } else {
    // all locked matches must be at least perlu_segera_diperiksa (never aman_ditunda)
    urgency = clampUrgencyAtLeast(maxUrgency([urgency, ...lockedRules.map((r) => r.urgency)]), "perlu_segera_diperiksa");
  }

  return {
    safetyLocked: true,
    safetyCategories: categories,
    urgency,
    recommendedTutorials: [],
    mechanicSafetyNote:
      "Karena ada kemungkinan masalah keselamatan, jangan bongkar komponen sendiri. Segera bawa motor ke bengkel atau teknisi yang kompeten untuk pemeriksaan.",
  };
}
