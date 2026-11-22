import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "accent"
  | "danger"
  | "warning"
  | "success"
  | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-border bg-surface-2 text-foreground",
  accent: "border-accent/30 bg-accent/10 text-accent",
  danger: "border-danger/30 bg-danger/10 text-danger",
  warning: "border-warning/30 bg-warning/10 text-warning-text",
  success: "border-safe/30 bg-safe/10 text-safe-text",
  outline: "border-border text-muted",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
