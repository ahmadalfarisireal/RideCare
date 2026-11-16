import type { Metadata } from "next";
import Link from "next/link";

import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, ShieldIcon } from "@/components/ui/icons";
import {
  SAFETY_CATEGORIES,
  SAFETY_CATEGORIES_TEXT,
  SITE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang dan keselamatan",
};

const HOW_TO_STEPS = [
  {
    title: "Pilih jenis motor",
    description: "Pilih bebek, matik, sport, atau listrik agar pertanyaan sesuai.",
    href: "/keluhan",
  },
  {
    title: "Ceritakan keluhan",
    description:
      "Tulis keluhan dengan bahasa sehari-hari, lalu jawab pertanyaan pendamping.",
    href: "/keluhan",
  },
  {
    title: "Baca hasil awal",
    description:
      "Lihat ringkasan, kemungkinan penyebab, dan tingkat urgensi. Hasil ini bukan diagnosis pasti.",
    href: "/hasil",
  },
  {
    title: "Bawa checklist dan pesan ke mekanik",
    description:
      "Gunakan checklist anti getok harga dan pesan siap salin untuk mekanik.",
    href: "/checklist",
  },
] as const;

export default function TentangPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Badge variant="accent">Tentang</Badge>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        {SITE.name}
      </h1>
      <p className="mt-4 text-base font-medium text-foreground">
        {SITE.tagline}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        {SITE.description}
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        RideCare memakai mesin aturan (rule-based): keluhan dan jawaban kamu
        dicocokkan dengan aturan yang sudah disiapkan untuk menghasilkan
        kemungkinan pemeriksaan awal. Hasil ini bukan diagnosis pasti. RideCare
        gratis, bisa dipakai tanpa login, dan tidak memakai AI berbayar.
      </p>

      <DisclaimerBanner className="mt-10" />

      <div className="mt-10 grid gap-4">
        <Card>
          <CardHeader>
            <span className="grid size-10 place-items-center rounded-lg bg-danger/10 text-danger">
              <ShieldIcon className="size-5" />
            </span>
            <CardTitle className="mt-2">Keselamatan di atas segalanya</CardTitle>
            <CardDescription>
              Untuk {SAFETY_CATEGORIES_TEXT}, RideCare selalu mengarahkan kamu
              ke bengkel atau teknisi kompeten. Tidak ada saran bongkar sendiri
              untuk kategori ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {SAFETY_CATEGORIES.map((category) => (
                <li
                  key={category}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <CheckIcon className="size-4 shrink-0 text-danger" />
                  {category}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cara memakai RideCare</CardTitle>
            <CardDescription>
              Empat langkah singkat untuk menyiapkan keluhan sebelum ke bengkel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground">
              {HOW_TO_STEPS.map((step) => (
                <li key={step.href + step.title}>
                  <Link
                    href={step.href}
                    className="font-semibold text-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {step.title}
                  </Link>{" "}
                  — {step.description}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tanpa estimasi harga</CardTitle>
            <CardDescription>
              RideCare tidak menampilkan perkiraan biaya perbaikan. Mintalah
              estimasi tertulis dari mekanik sebelum pekerjaan dimulai, lalu
              bandingkan dengan nota akhir.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gratis dan tanpa akun</CardTitle>
            <CardDescription>
              MVP RideCare dapat dipakai tanpa login. Analisis keluhan memakai
              mesin aturan lokal, bukan AI berbayar. Fitur login, riwayat servis,
              dan jadwal perawatan direncanakan untuk tahap berikutnya.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/keluhan" className={buttonVariants({ size: "lg" })}>
          Mulai susun keluhan
        </Link>
        <Link
          href="/pesan-mekanik"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
          })}
        >
          Lihat pesan untuk mekanik
        </Link>
      </div>
    </div>
  );
}
