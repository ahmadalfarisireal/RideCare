import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="RideCare — Beranda"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-accent text-sm font-black text-background"
      >
        R
      </span>
      <span className="text-lg">RideCare</span>
    </Link>
  );
}
