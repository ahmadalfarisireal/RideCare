import type { AnalysisInput, CompanionAnswers, MotorType } from "@/lib/complaint-engine";

export interface MotorOption {
  id: MotorType;
  label: string;
  sub: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  phrase: string;
  patch?: Partial<CompanionAnswers>;
}

export interface FollowUpQuestion {
  id: string;
  text: string;
  options: ChoiceOption[];
}

export interface SymptomOption {
  id: string;
  label: string;
  hint: string;
  complaint: string;
  electricComplaint: string;
  questions: string[];
}

export interface ConversationSelections {
  motor: MotorType;
  symptomId: string;
  answers: Record<string, string>;
}

export const MOTOR_OPTIONS: MotorOption[] = [
  { id: "matik", label: "Matik", sub: "Tanpa kopling dan gigi" },
  { id: "bebek", label: "Bebek", sub: "Gigi manual" },
  { id: "sport", label: "Sport", sub: "Gigi manual" },
  { id: "listrik", label: "Motor listrik", sub: "Tanpa bensin dan busi" },
];

export const SYMPTOM_OPTIONS: SymptomOption[] = [
  {
    id: "susah-hidup",
    label: "Susah dihidupkan",
    hint: "Mesin lama atau tidak mau menyala",
    complaint: "motor susah hidup pagi",
    electricComplaint: "motor listrik tidak mau jalan",
    questions: ["when", "starter"],
  },
  {
    id: "brebet",
    label: "Brebet saat digas",
    hint: "Tersendat atau tenaga putus-putus",
    complaint: "brebet dan tarikan tersendat",
    electricComplaint: "daya hilang",
    questions: ["load", "busibaru"],
  },
  {
    id: "mati-idle",
    label: "Mati sendiri saat berhenti",
    hint: "Misalnya di lampu merah",
    complaint: "mati saat idle",
    electricComplaint: "motor listrik mati",
    questions: ["when", "lamp"],
  },
  {
    id: "rem",
    label: "Rem berbunyi atau terasa aneh",
    hint: "Bunyi, tuas dalam, atau kurang pakem",
    complaint: "rem berbunyi",
    electricComplaint: "rem berbunyi",
    questions: ["remtype"],
  },
  {
    id: "getar",
    label: "Getar atau tarikan kasar",
    hint: "Terutama saat mulai jalan",
    complaint: "tarikan berat dan motor berat",
    electricComplaint: "daya hilang",
    questions: ["getartype"],
  },
  {
    id: "lampu",
    label: "Lampu redup, aki cepat habis",
    hint: "Lampu meredup atau aki sering tekor",
    complaint: "lampu redup aki cepat habis",
    electricComplaint: "baterai drop",
    questions: ["akibaru", "starter"],
  },
];

export const UNIVERSAL_QUESTION_ID = "tanda-lain";

export const FOLLOW_UP_QUESTIONS: Record<string, FollowUpQuestion> = {
  when: {
    id: "when",
    text: "Kapan masalahnya paling terasa?",
    options: [
      { id: "dingin", label: "Pagi atau saat mesin masih dingin", phrase: "masalah paling terasa saat mesin dingin", patch: { engineTemperature: "dingin" } },
      { id: "panas", label: "Setelah mesin panas", phrase: "masalah muncul setelah mesin panas", patch: { engineTemperature: "panas" } },
      { id: "always", label: "Selalu, dingin maupun panas", phrase: "masalah muncul dingin maupun panas", patch: { engineTemperature: "tidak_tahu" } },
    ],
  },
  starter: {
    id: "starter",
    text: "Saat tombol starter ditekan, bagaimana bunyinya?",
    options: [
      { id: "lemah", label: "Lemah atau ngik-ngik, mesin tidak berputar", phrase: "starter berbunyi lemah dan mesin tidak berputar" },
      { id: "putar", label: "Mesin berputar normal tapi tidak mau menyala", phrase: "mesin berputar normal tetapi tidak menyala" },
      { id: "diam", label: "Tidak ada bunyi sama sekali", phrase: "starter tidak mengeluarkan bunyi sama sekali" },
    ],
  },
  lamp: {
    id: "lamp",
    text: "Apakah lampu terlihat redup, terutama saat motor idle?",
    options: [
      { id: "ya", label: "Ya, lampu terlihat redup", phrase: "lampu terlihat redup saat idle" },
      { id: "tidak", label: "Tidak, lampu normal", phrase: "lampu terlihat normal" },
    ],
  },
  load: {
    id: "load",
    text: "Kapan brebetnya terasa?",
    options: [
      { id: "gas", label: "Saat gas ditarik mendadak", phrase: "brebet terasa saat gas ditarik mendadak" },
      { id: "beban", label: "Di tanjakan atau saat membawa beban", phrase: "brebet terasa di tanjakan atau saat membawa beban" },
      { id: "semua", label: "Hampir setiap saat", phrase: "brebet terasa hampir setiap saat" },
    ],
  },
  busibaru: {
    id: "busibaru",
    text: "Busi sudah diganti baru-baru ini?",
    options: [
      { id: "sudah", label: "Sudah", phrase: "busi sudah diganti baru-baru ini", patch: { replacedPartsBefore: true } },
      { id: "belum", label: "Belum", phrase: "busi belum diganti baru-baru ini", patch: { replacedPartsBefore: false } },
      { id: "lupa", label: "Lupa kapan terakhir", phrase: "tidak ingat kapan busi terakhir diganti", patch: { replacedPartsBefore: "tidak_tahu" } },
    ],
  },
  remtype: {
    id: "remtype",
    text: "Apa yang terasa atau terdengar dari rem?",
    options: [
      { id: "cit", label: "Bunyi cit tipis saat rem ditarik", phrase: "rem berbunyi cit tipis saat ditarik" },
      { id: "logam", label: "Bunyi logam bergesek yang kasar", phrase: "terdengar bunyi logam bergesek saat mengerem" },
      { id: "dalam", label: "Tuas rem terasa lebih dalam atau empuk", phrase: "tuas rem terasa lebih dalam atau empuk" },
    ],
  },
  getartype: {
    id: "getartype",
    text: "Seperti apa getar atau tarikan kasarnya?",
    options: [
      { id: "getar", label: "Bergetar saat mulai jalan", phrase: "motor bergetar saat mulai jalan" },
      { id: "raung", label: "Mesin meraung tapi laju tidak ikut", phrase: "mesin meraung tetapi laju tidak ikut naik" },
      { id: "decit", label: "Ada bunyi berdecit atau menggerus", phrase: "terdengar bunyi berdecit atau menggerus" },
    ],
  },
  akibaru: {
    id: "akibaru",
    text: "Aki sudah pernah diganti?",
    options: [
      { id: "ya", label: "Sudah, tapi cepat habis lagi", phrase: "aki sudah diganti tetapi cepat habis lagi", patch: { replacedPartsBefore: true } },
      { id: "belum", label: "Belum pernah diganti", phrase: "aki belum pernah diganti", patch: { replacedPartsBefore: false } },
      { id: "awet", label: "Sudah diganti dan awet", phrase: "aki sebelumnya awet dipakai", patch: { replacedPartsBefore: true } },
    ],
  },
  [UNIVERSAL_QUESTION_ID]: {
    id: UNIVERSAL_QUESTION_ID,
    text: "Ada tanda lain yang ikut muncul?",
    options: [
      { id: "tidak-ada", label: "Tidak ada", phrase: "" },
      { id: "bensin", label: "Bensin bocor atau bau bensin", phrase: "bensin bocor", patch: { leak: true, smell: true } },
      { id: "gosong", label: "Bau gosong atau kabel panas", phrase: "bau gosong", patch: { smell: true } },
      { id: "asap", label: "Asap putih tebal dari knalpot", phrase: "asap putih tebal", patch: { smoke: true } },
      { id: "oli", label: "Oli bocor atau menetes", phrase: "oli bocor", patch: { leak: true } },
      { id: "banjir", label: "Pernah banjir atau kecelakaan", phrase: "bekas banjir", patch: { afterAccidentOrFlood: true } },
      { id: "indikator", label: "Lampu indikator menyala", phrase: "", patch: { indicatorLight: true } },
    ],
  },
};

const SYMPTOM_BY_ID = new Map(SYMPTOM_OPTIONS.map((symptom) => [symptom.id, symptom]));

function findOption(questionId: string, optionId: string | undefined): ChoiceOption | undefined {
  if (!optionId) return undefined;
  return FOLLOW_UP_QUESTIONS[questionId]?.options.find((option) => option.id === optionId);
}

export function buildAnalysisInput(selections: ConversationSelections): AnalysisInput {
  const symptom = SYMPTOM_BY_ID.get(selections.symptomId);
  const base =
    (selections.motor === "listrik" ? symptom?.electricComplaint : symptom?.complaint) ??
    "keluhan motor";

  const phrases = [base];
  const answers: CompanionAnswers = {};
  const questionIds = selections.motor === "listrik" ? [] : (symptom?.questions ?? []);

  for (const questionId of questionIds) {
    const option = findOption(questionId, selections.answers[questionId]);
    if (!option) continue;
    if (option.phrase) phrases.push(option.phrase);
    if (option.patch) Object.assign(answers, option.patch);
  }

  const universal = findOption(UNIVERSAL_QUESTION_ID, selections.answers[UNIVERSAL_QUESTION_ID]);
  if (universal) {
    if (universal.phrase) phrases.push(universal.phrase);
    if (universal.patch) Object.assign(answers, universal.patch);
  }

  return {
    complaint: `${phrases.join(". ")}.`,
    motorcycleType: selections.motor,
    answers,
  };
}
