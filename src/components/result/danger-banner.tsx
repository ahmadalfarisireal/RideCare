import { SafetyAlert } from "@/components/result/safety-alert";
import type { Urgency } from "@/lib/complaint-engine";

const SAFETY_STEPS = [
  "Jangan kendarai motor sampai diperiksa.",
  "Bawa motor ke bengkel atau teknisi yang kompeten.",
  "Jangan bongkar komponen sendiri.",
] as const;

export function DangerBanner({ urgency }: { urgency: Urgency }) {
  return (
    <section className="space-y-3">
      <SafetyAlert
        urgency={urgency}
        eyebrow="Berhenti dan ke bengkel kalau"
      />
      <div className="rounded-lg border border-border bg-surface p-3">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
          Apa yang bisa kamu lakukan sekarang
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-foreground">
          {SAFETY_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
