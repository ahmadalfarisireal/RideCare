import { getUrgencyCopy } from "@/data/ui/urgency-copy";
import type { Urgency } from "@/lib/complaint-engine";
import { cn } from "@/lib/utils";

const TONE_STYLES = {
  good: "border-safe/40 bg-safe/10 text-safe",
  warn: "border-warning/40 bg-warning/10 text-warning",
  bad: "border-danger/40 bg-danger/10 text-danger",
} as const;

const ZONE_LABELS = ["Aman ditunda", "Perlu cek", "Jangan jalan"] as const;
const ZONE_INDEX: Record<Urgency, number> = {
  aman_ditunda: 0,
  perlu_segera_diperiksa: 1,
  jangan_dikendarai: 2,
};

export function UrgencyGauge({
  urgency,
  className,
}: {
  urgency: Urgency;
  className?: string;
}) {
  const copy = getUrgencyCopy(urgency);
  const activeZone = ZONE_INDEX[urgency];
  const arcLength = Math.round((copy.needleAngle / 180) * 251);

  return (
    <section
      className={cn("rounded-xl border p-4 sm:p-5", TONE_STYLES[copy.tone], className)}
      aria-label={`Tingkat urgensi: ${copy.label}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <svg
          viewBox="0 0 200 118"
          className="mx-auto size-32 shrink-0 sm:mx-0"
          aria-hidden="true"
        >
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} 251`}
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="38"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transform: `rotate(${copy.needleAngle - 90}deg)`,
              transformOrigin: "100px 100px",
            }}
          />
          <circle cx="100" cy="100" r="6" fill="currentColor" />
        </svg>

        <div className="space-y-2 text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.08em] opacity-80">
            Tingkat urgensi
          </p>
          <p className="font-display text-2xl font-bold uppercase tracking-wide">
            {copy.label}
          </p>
          <p className="text-sm leading-relaxed text-foreground">{copy.explanation}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-current/20 pt-3 text-center font-mono text-[10px] uppercase tracking-wide sm:text-xs">
        {ZONE_LABELS.map((label, index) => (
          <span
            key={label}
            className={cn(
              index === activeZone ? "font-bold text-foreground" : "text-muted",
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
