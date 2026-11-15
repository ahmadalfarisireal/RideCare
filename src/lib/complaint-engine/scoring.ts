import { countKeywordMatches } from "./normalize";
import type { AnalysisInput, CompanionAnswers, Rule, RuleCondition } from "./types";

export interface ScoredRule {
  rule: Rule;
  keywordScore: number;
  typeScore: number;
  conditionScore: number;
  totalScore: number;
  matched: boolean;
}

function scoreCondition(answers: CompanionAnswers, conditions?: RuleCondition): number {
  if (!conditions) return 0;
  let score = 0;

  if (conditions.engineTemperature && conditions.engineTemperature.length > 0) {
    const answer = answers.engineTemperature;
    if (answer && answer !== "tidak_tahu") {
      score += conditions.engineTemperature.includes(answer) ? 2 : -2;
    }
  }

  const booleanKeys: (keyof RuleCondition & keyof CompanionAnswers)[] = [
    "indicatorLight",
    "smoke",
    "unusualSound",
    "leak",
    "smell",
    "disappearsAfterWarmup",
    "afterAccidentOrFlood",
    "replacedPartsBefore",
  ];

  for (const key of booleanKeys) {
    const expected = conditions[key];
    if (typeof expected !== "boolean") continue;
    const answer = answers[key];
    if (answer === undefined || answer === "tidak_tahu") continue;
    score += answer === expected ? 2 : -2;
  }

  return score;
}

export function scoreRule(input: AnalysisInput, rule: Rule, normalizedComplaint: string): ScoredRule {
  const typeMatches = rule.applicable_types.includes(input.motorcycleType);
  const keywordScore = countKeywordMatches(normalizedComplaint, rule.keywords);
  const typeScore = typeMatches ? 1 : 0;
  const conditionScore = typeMatches ? scoreCondition(input.answers, rule.conditions) : 0;
  const totalScore = keywordScore + typeScore + conditionScore;
  const matched = typeMatches && keywordScore >= 2 && totalScore >= 3;

  return { rule, keywordScore, typeScore, conditionScore, totalScore, matched };
}

export function compareScoredRules(a: ScoredRule, b: ScoredRule): number {
  if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
  const aSafety = a.rule.safety_lock ? 1 : 0;
  const bSafety = b.rule.safety_lock ? 1 : 0;
  if (bSafety !== aSafety) return bSafety - aSafety;
  if (b.keywordScore !== a.keywordScore) return b.keywordScore - a.keywordScore;
  return a.rule.id.localeCompare(b.rule.id);
}

export function selectPrimaryRule(scored: ScoredRule[]): ScoredRule | undefined {
  if (scored.length === 0) return undefined;
  return [...scored].sort(compareScoredRules)[0];
}
