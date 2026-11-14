import { AlertTriangleIcon } from "@/components/ui/icons";
import { DISCLAIMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DisclaimerBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-warning/30 bg-warning/5 p-4",
        className,
      )}
      role="note"
    >
      <div className="flex gap-3">
        <AlertTriangleIcon className="mt-0.5 size-5 shrink-0 text-warning" />
        <div>
          <p className="text-sm font-semibold text-warning">
            Bukan diagnosis pasti
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}
