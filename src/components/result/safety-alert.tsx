import type { Urgency } from "@/lib/complaint-engine";
import { AlertTriangleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function SafetyAlert({
  urgency,
  className,
}: {
  urgency: Urgency;
  className?: string;
}) {
  const doNotRide = urgency === "jangan_dikendarai";
  return (
    <div
      className={cn(
        "rounded-xl border border-danger/40 bg-danger/10 p-4",
        className,
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <AlertTriangleIcon className="mt-0.5 size-6 shrink-0 text-danger" />
        <div className="space-y-1">
          <p className="text-base font-bold text-danger">
            {doNotRide ? "Jangan dikendarai dulu" : "Perlu perhatian keselamatan"}
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            {doNotRide
              ? "Keluhan ini bisa berisiko. Jangan kendarai motor sampai diperiksa."
              : "Ada kemungkinan masalah yang perlu segera diperiksa."}{" "}
            Bawa motor ke bengkel atau teknisi yang kompeten.
          </p>
          <p className="text-sm font-medium text-foreground">
            Jangan bongkar komponen sendiri.
          </p>
        </div>
      </div>
    </div>
  );
}
