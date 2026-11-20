import Link from "next/link";

import {
  HomeSamplesPanel,
  HomeTipsPanel,
} from "@/components/home/home-samples-panel";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ChevronRightIcon,
  GaugeIcon,
  ShieldIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import { SAFETY_CATEGORIES_TEXT } from "@/lib/constants";

const routeCards = [
  {
    href: "/keluhan",
    title: "Cek keluhan",
    description:
      "Ceritakan gejalanya. Dapat dugaan awal, urgensi, dan pesan untuk mekanik.",
    cta: "Mulai",
    icon: GaugeIcon,
  },
  {
    href: "/kamus",
    title: "Kamus bengkel",
    description: "Istilah dijelaskan dengan analogi sehari-hari.",
    cta: "Buka",
    icon: BookOpenIcon,
  },
  {
    href: "/tutorial",
    title: "Tutorial",
    description: "Perawatan dasar dengan alasan di setiap langkah.",
    cta: "Buka",
    icon: WrenchIcon,
  },
  {
    href: "/checklist",
    title: "Anti getok",
    description:
      "Hal yang perlu kamu tanyakan sebelum menyetujui servis.",
    cta: "Buka",
    icon: ShieldIcon,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto grid w-full max-w-5xl gap-10 px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
              Servis motor tanpa tebak-tebakan
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Pahami motormu,{" "}
              <span className="text-accent">hindari digetok.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Ceritakan keluhanmu, dapatkan dugaan awal beserta tingkat
              urgensinya, lalu bawa pesan siap kirim ke mekanik.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/keluhan"
                className={buttonVariants({
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                Mulai cek keluhan
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="/checklist"
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                Checklist anti getok
                <ChevronRightIcon className="size-4" />
              </Link>
            </div>

            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted">
              <ShieldIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              Hasil awal, bukan diagnosis pasti. Pemeriksaan akhir tetap
              dilakukan oleh teknisi atau bengkel.
            </p>
          </div>

          <HomeSamplesPanel />
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="ticks" aria-hidden="true" />
      </div>

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Mau mulai dari mana?
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {routeCards.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="group">
                <Card className="h-full transition-colors group-hover:border-accent/50">
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      {item.cta}
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <HomeTipsPanel />
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-warning/10 text-warning">
              <AlertTriangleIcon className="size-6" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">
                Keselamatan di atas segalanya
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Untuk masalah {SAFETY_CATEGORIES_TEXT}, RideCare selalu
                mengarahkan kamu ke bengkel atau teknisi kompeten. Tidak ada
                saran bongkar sendiri untuk kategori ini.
              </p>
              <Link
                href="/tentang"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-strong"
              >
                Baca aturan keselamatan
                <ChevronRightIcon className="size-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <GaugeIcon className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted">
              RideCare tidak menampilkan estimasi harga. Mintalah rincian biaya
              jasa dan sparepart dari mekanik sebelum pekerjaan dimulai.
            </p>
          </div>
          <Link
            href="/checklist"
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "shrink-0",
            })}
          >
            Lihat checklist
          </Link>
        </div>
      </section>
    </>
  );
}
