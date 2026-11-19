import {
  getCauseExplanation,
  formatWhy,
  safetyWorkshopText,
} from "@/data/ui/cause-explanations";
import { getIntroLine, getUrgencyCopy } from "@/data/ui/urgency-copy";
import type {
  AnalysisInput,
  AnalysisResult,
  MotorType,
  SafetyCategory,
  Urgency,
} from "@/lib/complaint-engine";
import {
  buildMechanicMessageFromResult,
  buildWhatsAppLink,
} from "@/lib/templates/whatsapp";

export const RANK_LABELS = [
  "Paling mungkin",
  "Mungkin",
  "Kemungkinan kecil",
] as const;

const MOTOR_LABELS: Record<MotorType, string> = {
  bebek: "Motor bebek",
  matik: "Motor matik",
  sport: "Motor sport",
  listrik: "Motor listrik",
};

export interface CauseView {
  id: string;
  text: string;
  rankLabel: string;
  why: string;
  differentiate: string;
  selfCheck?: string;
  workshop: string;
  locked: boolean;
}

export interface ResultView {
  intro: string;
  summary: string;
  motorLabel: string;
  urgency: Urgency;
  urgencyLabel: string;
  urgencyExplanation: string;
  tone: "good" | "warn" | "bad";
  needleAngle: number;
  causes: CauseView[];
  componentsToCheck: string[];
  mechanicQuestions: string[];
  checklist: string[];
  disclaimer: string;
  safetyLocked: boolean;
  safetyCategories: SafetyCategory[];
  recommendedTutorials: string[];
  waMessage: string;
  waLink: string;
}

function buildAnswerSummary(answers: AnalysisInput["answers"]): string {
  const parts: string[] = [];

  if (answers.engineTemperature && answers.engineTemperature !== "tidak_tahu") {
    parts.push(`masalah paling terasa saat mesin ${answers.engineTemperature}`);
  }
  if (answers.indicatorLight === true) parts.push("ada lampu indikator menyala");
  if (answers.unusualSound === true) parts.push("ada suara tidak biasa");
  if (answers.smoke === true) parts.push("ada asap");
  if (answers.smell === true) parts.push("ada bau tidak biasa");
  if (answers.leak === true) parts.push("ada kebocoran atau tetesan cairan");
  if (answers.disappearsAfterWarmup === true) {
    parts.push("keluhan hilang setelah motor dipakai beberapa menit");
  }
  if (answers.afterAccidentOrFlood === true) {
    parts.push("motor pernah banjir atau kecelakaan");
  }
  if (answers.replacedPartsBefore === true) {
    parts.push("ada komponen yang pernah diganti");
  }

  return parts.join(", ");
}

export function toResultView(input: AnalysisInput, result: AnalysisResult): ResultView {
  const copy = getUrgencyCopy(result.urgency);
  const answerSummary = buildAnswerSummary(input.answers);

  const causes: CauseView[] = result.possibleCauses.map((cause, index) => {
    const explanation = getCauseExplanation(cause.ruleId, cause.text);
    return {
      id: `${cause.ruleId}:${index}`,
      text: cause.text,
      rankLabel: RANK_LABELS[Math.min(index, RANK_LABELS.length - 1)],
      why: formatWhy(explanation.why, answerSummary),
      differentiate: explanation.differentiate,
      selfCheck: result.safetyLocked ? undefined : explanation.selfCheck,
      workshop: result.safetyLocked ? safetyWorkshopText() : explanation.workshop,
      locked: result.safetyLocked,
    };
  });

  const waMessage = buildMechanicMessageFromResult(
    input.motorcycleType,
    input.complaint,
    result,
  );

  return {
    intro: getIntroLine(result.matchedRuleIds.length),
    summary: input.complaint.trim() || result.summary,
    motorLabel: MOTOR_LABELS[input.motorcycleType],
    urgency: result.urgency,
    urgencyLabel: copy.label,
    urgencyExplanation: copy.explanation,
    tone: copy.tone,
    needleAngle: copy.needleAngle,
    causes,
    componentsToCheck: result.componentsToCheck,
    mechanicQuestions: result.mechanicQuestions,
    checklist: result.checklist,
    disclaimer: result.disclaimer,
    safetyLocked: result.safetyLocked,
    safetyCategories: result.safetyCategories,
    recommendedTutorials: result.recommendedTutorials,
    waMessage,
    waLink: buildWhatsAppLink(waMessage),
  };
}
