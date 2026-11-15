import { complaintRules } from "@/data/complaint-rules";
import { normalizeText } from "./normalize";
import { applySafety } from "./safety";
import { compareScoredRules, scoreRule, selectPrimaryRule } from "./scoring";
import { ANTI_RIPOFF_CHECKLIST, DEFAULT_MECHANIC_QUESTIONS, DISCLAIMER, buildSummary } from "./templates";
import { maxUrgency } from "./urgency";
import type { AnalysisInput, AnalysisResult, Cause, Rule } from "./types";

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function buildFallback(input: AnalysisInput): AnalysisResult {
  const urgency = "perlu_segera_diperiksa" as const;
  const componentsToCheck = ["Periksa menyeluruh di bengkel atau teknisi yang kompeten"];
  const mechanicQuestions = [
    "Apa kemungkinan penyebab keluhan ini setelah pemeriksaan langsung?",
    "Komponen apa saja yang perlu diperiksa lebih dulu?",
    "Apakah motor aman digunakan untuk sampai ke bengkel?",
    "Mohon informasikan rincian pemeriksaan dan konfirmasi sebelum ada penggantian komponen.",
  ];
  return {
    summary: buildSummary(input, componentsToCheck, urgency),
    possibleCauses: [],
    componentsToCheck,
    urgency,
    safetyLocked: false,
    safetyCategories: [],
    recommendedTutorials: [],
    mechanicQuestions,
    checklist: ANTI_RIPOFF_CHECKLIST,
    disclaimer: DISCLAIMER,
    matchedRuleIds: [],
  };
}

export function analyze(input: AnalysisInput): AnalysisResult {
  const normalizedComplaint = normalizeText(input.complaint);
  if (!normalizedComplaint) {
    return buildFallback(input);
  }

  const scored = complaintRules.map((rule) => scoreRule(input, rule, normalizedComplaint));
  const matched = scored.filter((s) => s.matched);

  if (matched.length === 0) {
    return buildFallback(input);
  }

  const sortedMatched = [...matched].sort(compareScoredRules);
  const primary = selectPrimaryRule(sortedMatched);
  if (!primary) {
    return buildFallback(input);
  }

  const matchedRules: Rule[] = sortedMatched.map((s) => s.rule);
  const baseUrgency = maxUrgency(matchedRules.map((r) => r.urgency));

  const primaryTutorials = unique(primary.rule.related_tutorials);
  const safety = applySafety(input, matchedRules, baseUrgency, primaryTutorials);

  const possibleCauses: Cause[] = primary.rule.possible_causes.map((text) => ({
    ruleId: primary.rule.id,
    text,
    score: primary.totalScore,
  }));

  const componentsToCheck = unique(primary.rule.components_to_check);
  const mechanicQuestions = unique([
    ...primary.rule.mechanic_questions,
    ...DEFAULT_MECHANIC_QUESTIONS,
  ]);

  const finalMechanicQuestions = safety.mechanicSafetyNote
    ? [safety.mechanicSafetyNote, ...mechanicQuestions]
    : mechanicQuestions;

  return {
    summary: buildSummary(input, componentsToCheck, safety.urgency),
    possibleCauses,
    componentsToCheck,
    urgency: safety.urgency,
    safetyLocked: safety.safetyLocked,
    safetyCategories: safety.safetyCategories,
    recommendedTutorials: safety.recommendedTutorials,
    mechanicQuestions: finalMechanicQuestions,
    checklist: ANTI_RIPOFF_CHECKLIST,
    disclaimer: DISCLAIMER,
    matchedRuleIds: matchedRules.map((r) => r.id),
  };
}
