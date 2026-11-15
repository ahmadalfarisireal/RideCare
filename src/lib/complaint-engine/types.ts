export type MotorType = "bebek" | "matik" | "sport" | "listrik";

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

export interface CompanionAnswers {
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

export interface Rule {
  id: string;
  category?: "umum" | SafetyCategory;
  keywords: string[];
  applicable_types: MotorType[];
  conditions?: RuleCondition;
  possible_causes: string[];
  components_to_check: string[];
  urgency: Urgency;
  safety_lock: boolean;
  safety_category?: SafetyCategory;
  related_tutorials: string[];
  mechanic_questions: string[];
}

export interface AnalysisInput {
  complaint: string;
  motorcycleType: MotorType;
  answers: CompanionAnswers;
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

export const URGENCY_RANK: Record<Urgency, number> = {
  aman_ditunda: 0,
  perlu_segera_diperiksa: 1,
  jangan_dikendarai: 2,
};

export const LOCKED_SAFETY_CATEGORIES: SafetyCategory[] = [
  "rem",
  "kebocoran_bahan_bakar",
  "kelistrikan_utama",
  "mesin",
  "motor_listrik",
];
