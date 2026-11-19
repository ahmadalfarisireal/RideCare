"use client";

import { useState } from "react";
import Link from "next/link";

import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon } from "@/components/ui/icons";
import { glossaryTerms } from "@/data/glossary";
import { cn } from "@/lib/utils";
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
  const [checked, setChecked] = useState<boolean[]>(() =>
    tutorial.steps.map(() => false),
  );

  const total = tutorial.steps.length;
  const completed = checked.filter(Boolean).length;
  const progress = total > 0 ? completed / total : 0;
  const ringOffset = 163.36 * (1 - progress);

  const toggleStep = (index: number) => {
    setChecked((current) =>
      current.map((value, position) => (position === index ? !value : value)),
    );
  };

  const resetProgress = () => {
    setChecked(tutorial.steps.map(() => false));
  };

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

      {tutorial.kenapaPerlu || tutorial.kapanDilakukan ? (
        <Card>
          <CardHeader>
            <CardTitle>Kenapa dan kapan dilakukan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tutorial.kenapaPerlu ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">Kenapa ini perlu</p>
                <p className="text-sm leading-relaxed text-muted">{tutorial.kenapaPerlu}</p>
              </div>
            ) : null}
            {tutorial.kapanDilakukan ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">Kapan dilakukan</p>
                <p className="text-sm leading-relaxed text-muted">{tutorial.kapanDilakukan}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {tutorial.sebelumMulai && tutorial.sebelumMulai.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Sebelum mulai</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
              {tutorial.sebelumMulai.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

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
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Progres langkah</CardTitle>
            <p className="mt-1 text-sm text-muted" aria-live="polite">
              {completed} dari {total} langkah selesai
            </p>
          </div>
          <button
            type="button"
            onClick={resetProgress}
            className="min-h-10 rounded-lg border border-border px-3 text-sm font-medium text-foreground hover:border-accent/50 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Ulangi
          </button>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <svg
            viewBox="0 0 60 60"
            className="size-16 shrink-0 -rotate-90"
            role="img"
            aria-label={`Progres ${completed} dari ${total} langkah`}
          >
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="var(--surface-2)"
              strokeWidth="6"
            />
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="163.36"
              strokeDashoffset={ringOffset}
            />
          </svg>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Langkah-langkah</CardTitle>
          <p className="text-sm text-muted">Centang setiap langkah yang sudah kamu lakukan.</p>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {tutorial.steps.map((step, index) => {
              const reason = tutorial.alasanPerLangkah?.[index];
              return (
                <li key={index}>
                  <label
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors",
                      checked[index]
                        ? "border-accent/50 bg-accent/5"
                        : "border-border bg-surface hover:bg-surface-2",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked[index]}
                      onChange={() => toggleStep(index)}
                      className="mt-0.5 size-4 shrink-0 accent-accent"
                    />
                    <span className="space-y-1">
                      <span
                        className={cn(
                          "block text-sm leading-relaxed",
                          checked[index] ? "text-muted line-through" : "text-foreground",
                        )}
                      >
                        <span className="font-semibold">{index + 1}. </span>
                        {step}
                      </span>
                      {reason ? (
                        <span className="block text-xs leading-relaxed text-muted">
                          Kenapa: {reason}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      {tutorial.tandaBenar ? (
        <Card
          className={cn(
            completed === total && "border-safe/40 bg-safe/5",
          )}
          role={completed === total ? "status" : undefined}
        >
          <CardHeader>
            <CardTitle className={cn(completed === total && "text-safe")}>
              Tandanya sudah benar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground">{tutorial.tandaBenar}</p>
          </CardContent>
        </Card>
      ) : null}

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
