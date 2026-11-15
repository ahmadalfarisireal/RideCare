"use client";

import type { CompanionAnswers, EngineTemperature, Flag } from "@/lib/complaint-engine";

type Tri = "ya" | "tidak" | "tidak_tahu";

function toFlag(value: Tri): Flag {
  if (value === "ya") return true;
  if (value === "tidak") return false;
  return "tidak_tahu";
}

function fromFlag(value: Flag | undefined): Tri {
  if (value === true) return "ya";
  if (value === false) return "tidak";
  return "tidak_tahu";
}

function toTemp(value: "dingin" | "panas" | "keduanya" | "tidak_tahu"): EngineTemperature | undefined {
  if (value === "dingin") return "dingin";
  if (value === "panas") return "panas";
  return "tidak_tahu";
}

function fromTemp(value: EngineTemperature | undefined): "dingin" | "panas" | "keduanya" | "tidak_tahu" {
  if (value === "dingin") return "dingin";
  if (value === "panas") return "panas";
  if (value === "tidak_tahu") return "tidak_tahu";
  return "tidak_tahu";
}

function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-lg border px-3 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-accent ${
                selected
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-surface text-foreground hover:border-accent/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const TRI_OPTIONS: { value: Tri; label: string }[] = [
  { value: "ya", label: "Ya" },
  { value: "tidak", label: "Tidak" },
  { value: "tidak_tahu", label: "Tidak tahu" },
];

export function FollowUpStep({
  answers,
  onChange,
}: {
  answers: CompanionAnswers;
  onChange: (answers: CompanionAnswers) => void;
}) {
  const set = (patch: Partial<CompanionAnswers>) => onChange({ ...answers, ...patch });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Beberapa pertanyaan singkat</h2>
        <p className="mt-1 text-sm text-muted">
          Jawaban membantu mempersempit kemungkinan. Semua boleh dijawab &quot;Tidak tahu&quot;.
        </p>
      </div>

      <ChoiceGroup
        name="engineTemperature"
        legend="Kapan keluhan lebih terasa?"
        value={fromTemp(answers.engineTemperature)}
        onChange={(v) => set({ engineTemperature: toTemp(v) })}
        options={[
          { value: "dingin", label: "Saat mesin dingin" },
          { value: "panas", label: "Saat mesin panas" },
          { value: "keduanya", label: "Keduanya" },
          { value: "tidak_tahu", label: "Tidak tahu" },
        ]}
      />

      <ChoiceGroup
        name="indicatorLight"
        legend="Apakah ada lampu indikator menyala?"
        value={fromFlag(answers.indicatorLight)}
        onChange={(v) => set({ indicatorLight: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="unusualSound"
        legend="Apakah ada suara tidak biasa?"
        value={fromFlag(answers.unusualSound)}
        onChange={(v) => set({ unusualSound: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="smoke"
        legend="Apakah ada asap?"
        value={fromFlag(answers.smoke)}
        onChange={(v) => set({ smoke: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="smell"
        legend="Apakah ada bau tidak biasa (misalnya bensin/gosong)?"
        value={fromFlag(answers.smell)}
        onChange={(v) => set({ smell: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="leak"
        legend="Apakah ada kebocoran atau tetesan cairan?"
        value={fromFlag(answers.leak)}
        onChange={(v) => set({ leak: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="disappearsAfterWarmup"
        legend="Apakah keluhan hilang setelah motor dipakai beberapa menit?"
        value={fromFlag(answers.disappearsAfterWarmup)}
        onChange={(v) => set({ disappearsAfterWarmup: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="replacedPartsBefore"
        legend="Apakah ada komponen yang pernah diganti sebelumnya?"
        value={fromFlag(answers.replacedPartsBefore)}
        onChange={(v) => set({ replacedPartsBefore: toFlag(v) })}
        options={TRI_OPTIONS}
      />

      <ChoiceGroup
        name="afterAccidentOrFlood"
        legend="Apakah motor pernah mengalami kecelakaan atau banjir?"
        value={fromFlag(answers.afterAccidentOrFlood)}
        onChange={(v) => set({ afterAccidentOrFlood: toFlag(v) })}
        options={TRI_OPTIONS}
      />
    </div>
  );
}
