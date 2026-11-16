export type TutorialDifficulty = "mudah" | "sedang" | "sulit";

export type TutorialMotorType = "bebek" | "matik" | "sport" | "listrik";

export interface Tutorial {
  slug: string;
  title: string;
  motorcycle_types: TutorialMotorType[];
  difficulty: TutorialDifficulty;
  estimated_time: string;
  tools: string[];
  safety_warnings: string[];
  steps: string[];
  when_to_stop: string[];
  related_glossary_ids: string[];
}

export const DIFFICULTY_LABELS: Record<TutorialDifficulty, string> = {
  mudah: "Mudah",
  sedang: "Sedang",
  sulit: "Sulit",
};

export const MOTOR_TYPE_LABELS: Record<TutorialMotorType, string> = {
  bebek: "Bebek",
  matik: "Matik",
  sport: "Sport",
  listrik: "Listrik",
};
