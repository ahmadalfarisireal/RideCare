import type { Urgency } from "@/lib/complaint-engine";
import { AlertTriangleIcon, CheckIcon, ShieldIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";

const CONFIG: Record<
  Urgency,
  { label: string; variant: "success" | "warning" | "danger"; Icon: typeof CheckIcon }
> = {
  aman_ditunda: {
    label: "Aman ditunda",
    variant: "success",
    Icon: CheckIcon,
  },
  perlu_segera_diperiksa: {
    label: "Perlu segera diperiksa",
    variant: "warning",
    Icon: AlertTriangleIcon,
  },
  jangan_dikendarai: {
    label: "Jangan dikendarai dulu",
    variant: "danger",
    Icon: ShieldIcon,
  },
};

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const { label, variant, Icon } = CONFIG[urgency];
  return (
    <Badge variant={variant} className="gap-1.5 px-3 py-1 text-sm font-semibold">
      <Icon className="size-4" />
      <span>{label}</span>
    </Badge>
  );
}
