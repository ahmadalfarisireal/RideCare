import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GaugeIcon } from "@/components/ui/icons";

export function ComingSoon({
  title,
  description,
  stage,
}: {
  title: string;
  description: string;
  stage: string;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Badge variant="accent">Segera hadir</Badge>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        {description}
      </p>

      <Card className="mt-8 border-dashed">
        <CardContent className="flex gap-3 p-5">
          <GaugeIcon className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted">
            Halaman ini sudah disiapkan pada Tahap 2. Fitur {stage} dikerjakan
            pada tahap berikutnya agar setiap bagian diuji dengan benar.
          </p>
        </CardContent>
      </Card>

      <Link
        href="/"
        className={buttonVariants({
          variant: "secondary",
          className: "mt-8",
        })}
      >
        Kembali ke beranda
      </Link>
    </section>
  );
}
