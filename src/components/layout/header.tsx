"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/keluhan" className={buttonVariants({ size: "sm" })}>
            Mulai
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
        >
          {isOpen ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <nav
            aria-label="Navigasi mobile"
            className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/keluhan"
              onClick={() => setIsOpen(false)}
              className={buttonVariants({ className: "mt-2 w-full" })}
            >
              Ceritakan keluhan
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
