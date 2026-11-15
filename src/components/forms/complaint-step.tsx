"use client";

import type { MotorType } from "@/lib/complaint-engine";
import { Textarea } from "@/components/ui/textarea";

const MOTOR_LABEL: Record<MotorType, string> = {
  bebek: "Bebek",
  matik: "Matik",
  sport: "Sport",
  listrik: "Listrik",
};

export function ComplaintStep({
  motorcycleType,
  value,
  onChange,
  onChangeMotor,
}: {
  motorcycleType: MotorType;
  value: string;
  onChange: (value: string) => void;
  onChangeMotor: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-3">
        <p className="text-sm text-foreground">
          Jenis motor: <span className="font-semibold">{MOTOR_LABEL[motorcycleType]}</span>
        </p>
        <button
          type="button"
          onClick={onChangeMotor}
          className="text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Ubah
        </button>
      </div>

      <div className="space-y-2">
        <label htmlFor="complaint" className="block text-sm font-medium text-foreground">
          Apa yang kamu rasakan pada motormu?
        </label>
        <Textarea
          id="complaint"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder='Contoh: "motor susah hidup saat pagi", "rem berbunyi", "motor brebet saat digas"'
          aria-describedby="complaint-help"
        />
        <p id="complaint-help" className="text-sm text-muted">
          Tulis dengan bahasa sehari-hari. Contoh: susah hidup pagi, rem berbunyi, mati di lampu merah, lampu redup.
        </p>
      </div>
    </div>
  );
}
