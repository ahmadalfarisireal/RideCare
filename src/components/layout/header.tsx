"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/ui/logo";
import { PRIMARY_TABS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function isTabActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/keluhan") {
    return ["/keluhan", "/hasil", "/pesan-mekanik"].includes(pathname);
  }
  if (href === "/tutorial") {
    return pathname === "/tutorial" || pathname.startsWith("/tutorial/");
  }
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto w-full max-w-5xl px-3 pt-3 sm:px-6">
        <div className="flex items-center justify-between gap-3 pb-3">
          <Logo />
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:inline">
              {SITE.tagline}
            </span>
            <Link
              href="/tentang"
              className="rounded-md px-1 py-1 font-display text-sm font-bold uppercase tracking-wide text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Tentang
            </Link>
          </div>
        </div>

        <nav
          aria-label="Menu utama"
          className="hidden grid-cols-4 gap-1 sm:grid"
        >
          {PRIMARY_TABS.map((tab) => {
            const active = isTabActive(tab.href, pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-w-0 border-b-[3px] px-1 pb-2 pt-1 text-center font-display text-[13px] font-bold uppercase leading-none tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-base",
                  active
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
