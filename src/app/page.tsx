import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const quickLinks = [
  {
    href: "/kamus",
    title: "Kamus bengkel",
    description:
      "Istilah dan komponen motor dijelaskan dengan bahasa sederhana, tanpa membuat bingung.",
    cta: "Buka kamus",
    icon: BookOpenIcon,
  },
  {
    href: "/tutorial",
    title: "Tutorial DIY",
    description:
      "Panduan perawatan dasar yang aman, lengkap dengan peringatan keselamatan.",
    cta: "Lihat tutorial",
    icon: WrenchIcon,
  },
] as const;

const steps = [
  {
    number: "1",
    title: "Pilih jenis motor",
    description: "Bebek, matik, sport, atau motor listrik.",
  },
  {
    number: "2",
    title: "Tulis keluhan",
    description:
      "Ceritakan dengan bahasa sehari-hari. Tidak perlu hafal istilah bengkel.",
  },
  {
    number: "3",
    title: "Dapatkan hasil + checklist",
    description:
      "Lihat kemungkinan penyebab, komponen yang diperiksa, dan pertanyaan untuk mekanik.",
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
        <div className="relative mx-auto w-full max-w-3xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <Badge variant="accent">Gratis · Tanpa akun</Badge>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Pahami motormu,{" "}
            <span className="text-accent">hindari digetok.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Susun keluhan sebelum ke bengkel. RideCare membantu kamu menjelaskan
            gejala, memahami kemungkinan penyebab, dan datang dengan pertanyaan
            yang jelas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/keluhan"
              className={buttonVariants({
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Ceritakan keluhan motormu
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/tentang"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Pelajari RideCare
            </Link>
          </div>

          <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted">
            <ShieldIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            Hasil awal, bukan diagnosis pasti. Pemeriksaan akhir tetap dilakukan
            oleh teknisi atau bengkel.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Mulai dari sini
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Pelajari dan siapkan dirimu
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="group">
                <Card className="h-full transition-colors group-hover:border-accent/50">
                  <CardHeader>
                    <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="mt-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      {item.cta}
                      <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Cara kerja
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Tiga langkah singkat
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.number}>
                <CardContent className="p-5">
                  <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-accent-ink">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
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
