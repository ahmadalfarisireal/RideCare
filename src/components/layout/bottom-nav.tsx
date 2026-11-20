"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isTabActive } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { BOTTOM_NAV_ITEMS } from "@/lib/constants";

export function BottomNavView({ pathname }: { pathname: string | null }) {
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
    >
      <ul className="grid grid-cols-5">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isTabActive(item.href, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center justify-center border-t-[3px] px-1 text-center font-display text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  return <BottomNavView pathname={pathname} />;
}
