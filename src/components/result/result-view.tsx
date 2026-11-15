"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { analyze, type AnalysisInput, type AnalysisResult } from "@/lib/complaint-engine";
import {
  clearComplaintInput,
  loadComplaintInput,
  type StoredComplaintInput,
} from "@/lib/storage/complaint-session";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { ChecklistView } from "@/components/result/checklist-view";
import { SafetyAlert } from "@/components/result/safety-alert";
import { UrgencyBadge } from "@/components/result/urgency-badge";

const MOTOR_LABEL: Record<StoredComplaintInput["motorcycleType"], string> = {
  bebek: "Motor bebek",
  matik: "Motor matik",
  sport: "Motor sport",
  listrik: "Motor listrik",
};

function LoadingState() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8 sm:px-6">
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted">Memuat hasil analisis…</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ResultView() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [input, setInput] = useState<AnalysisInput | null>(null);

  useEffect(() => {
    const stored = loadComplaintInput();
    queueMicrotask(() => {
      if (!stored) {
        setStatus("empty");
        return;
      }
      setInput({
        complaint: stored.complaint,
        motorcycleType: stored.motorcycleType,
        answers: stored.answers ?? {},
      });
      setStatus("ready");
    });
  }, []);

  useEffect(() => {
    if (status === "empty") {
      router.replace("/keluhan");
    }
  }, [status, router]);

  const result: AnalysisResult | null = useMemo(() => {
    if (!input) return null;
    return analyze(input);
  }, [input]);

  if (status === "loading" || status === "empty" || !input || !result) {
    return <LoadingState />;
  }

  const showSafety = result.safetyLocked || result.urgency === "jangan_dikendarai";
  const hasTutorials = result.recommendedTutorials.length > 0 && !result.safetyLocked;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/keluhan"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeftIcon className="size-4" />
          Ubah jawaban
        </Link>
        <button
          type="button"
          onClick={() => {
            clearComplaintInput();
            router.push("/keluhan");
          }}
          className="text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Mulai ulang
        </button>
      </div>

      {showSafety ? <SafetyAlert urgency={result.urgency} /> : null}

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan keluhan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">{MOTOR_LABEL[input.motorcycleType]}</p>
          <p className="text-base leading-relaxed text-foreground">{input.complaint}</p>
          <div className="pt-1">
            <UrgencyBadge urgency={result.urgency} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kemungkinan penyebab</CardTitle>
        </CardHeader>
        <CardContent>
          {result.possibleCauses.length > 0 ? (
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground">
              {result.possibleCauses.map((cause, idx) => (
                <li key={`${cause.ruleId}-${idx}`}>{cause.text}</li>
              ))}
            </ol>
          ) : (
            <p className="text-sm leading-relaxed text-muted">
              Belum ada kemungkinan penyebab spesifik yang cocok. Sebaiknya periksa langsung ke
              bengkel atau teknisi yang kompeten.
            </p>
          )}
          <p className="mt-3 text-xs text-muted">
            Ini hanya kemungkinan awal, bukan diagnosis pasti.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Komponen yang perlu diperiksa</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
            {result.componentsToCheck.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tutorial perawatan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {result.safetyLocked ? (
            <p className="text-sm leading-relaxed text-foreground">
              Tidak ada saran bongkar sendiri untuk kondisi ini. Segera bawa motor ke bengkel atau
              teknisi yang kompeten.
            </p>
          ) : hasTutorials ? (
            <div className="space-y-2">
              <p className="text-sm text-muted">
                Tutorial relevan untuk kemungkinan di atas:
              </p>
              <p className="text-sm font-medium text-foreground">Tutorial segera hadir</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                {result.recommendedTutorials.map((slug) => (
                  <li key={slug}>{slug}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted">Belum ada tutorial relevan untuk hasil ini.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pertanyaan untuk mekanik</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
            {result.mechanicQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Checklist anti getok harga</h2>
        <ChecklistView items={result.checklist} />
      </section>

      <DisclaimerBanner />

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/pesan-mekanik"
          className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
        >
          Buat pesan untuk mekanik
          <ArrowRightIcon className="size-4" />
        </Link>
        <Link
          href="/checklist"
          className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full" })}
        >
          Lihat checklist
        </Link>
      </div>

      {showSafety ? (
        <p className="text-center text-sm font-medium text-danger">
          Jika ragu, utamakan keselamatan: bawa motor ke bengkel atau teknisi kompeten.
        </p>
      ) : null}
    </div>
  );
}
