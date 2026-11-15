"use client";

import type { MotorType } from "@/lib/complaint-engine";
import { cn } from "@/lib/utils";

const OPTIONS: { value: MotorType; label: string; description: string }[] = [
  { value: "bebek", label: "Bebek", description: "Motor bebek / underbone" },
  { value: "matik", label: "Matik", description: "Skuter otomatis" },
  { value: "sport", label: "Sport", description: "Motor sport / kopling" },
  { value: "listrik", label: "Listrik", description: "Motor listrik" },
];

export function MotorTypeStep({
  value,
  onChange,
}: {
  value: MotorType | null;
  onChange: (value: MotorType) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">Pilih jenis motormu</h2>
        <p className="mt-1 text-sm text-muted">
          Jenis motor membantu mempersempit kemungkinan penyebab.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Jenis motor">
        {OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex min-h-24 flex-col items-start justify-center rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface hover:border-accent/50 hover:bg-surface-2",
              )}
            >
              <span className="text-base font-semibold text-foreground">{option.label}</span>
              <span className="mt-1 text-xs text-muted">{option.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
