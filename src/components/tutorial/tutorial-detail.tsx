import Link from "next/link";

import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon } from "@/components/ui/icons";
import { glossaryTerms } from "@/data/glossary";
import type { GlossaryTerm } from "@/types/glossary";
import {
  DIFFICULTY_LABELS,
  MOTOR_TYPE_LABELS,
  type Tutorial,
} from "@/types/tutorial";

const difficultyVariant = {
  mudah: "success",
  sedang: "warning",
  sulit: "danger",
} as const;

export function TutorialDetail({ tutorial }: { tutorial: Tutorial }) {
  const relatedTerms = tutorial.related_glossary_ids
    .map((id) => glossaryTerms.find((term) => term.id === id))
    .filter((term): term is GlossaryTerm => term !== undefined);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={difficultyVariant[tutorial.difficulty]}>
            {DIFFICULTY_LABELS[tutorial.difficulty]}
          </Badge>
          {tutorial.motorcycle_types.map((type) => (
            <Badge key={type} variant="outline">
              {MOTOR_TYPE_LABELS[type]}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{tutorial.title}</h1>
        <p className="text-sm text-muted">Perkiraan waktu: {tutorial.estimated_time}</p>
      </div>

      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4" role="note">
        <div className="flex gap-3">
          <AlertTriangleIcon className="mt-0.5 size-5 shrink-0 text-warning" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-warning">Peringatan keselamatan</p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
              {tutorial.safety_warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alat yang dibutuhkan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
            {tutorial.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {relatedTerms.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Istilah yang sering muncul</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted">
              Istilah teknis dijelaskan dengan bahasa sederhana di kamus. Ketuk untuk membuka.
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((term) => (
                <Link
                  key={term.id}
                  href={`/kamus#term-${term.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:border-accent/50 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {term.term}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Langkah-langkah</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground">
            {tutorial.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="text-danger">Kapan harus berhenti dan ke bengkel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-muted">
            Hentikan dan minta bantuan bengkel atau teknisi kompeten jika kamu menemukan tanda berikut:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
            {tutorial.when_to_stop.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <DisclaimerBanner />
    </div>
  );
}
