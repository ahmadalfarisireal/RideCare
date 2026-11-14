import Link from "next/link";

import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { Logo } from "@/components/ui/logo";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {SITE.tagline} Susun keluhan sebelum ke bengkel, gratis dan tanpa
              akun.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="text-sm font-semibold text-foreground">Jelajahi</p>
            <ul className="mt-3 grid gap-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <DisclaimerBanner className="mt-8" />

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© RideCare. Dibuat untuk pemilik motor di Indonesia.</p>
          <p>Gratis, tanpa akun, tanpa estimasi harga perbaikan.</p>
        </div>
      </div>
    </footer>
  );
}
