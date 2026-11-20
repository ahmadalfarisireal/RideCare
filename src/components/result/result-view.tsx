"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { analyze, type AnalysisInput } from "@/lib/complaint-engine";
import { getTutorialBySlug } from "@/data/tutorials";
import { URGENCY_COPY } from "@/data/ui/urgency-copy";
import { toResultView } from "@/lib/ui/analysis-view";
import {
  clearComplaintInput,
  loadComplaintInput,
} from "@/lib/storage/complaint-session";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon, ShieldIcon } from "@/components/ui/icons";
import { ChecklistView } from "@/components/result/checklist-view";
import { DangerBanner } from "@/components/result/danger-banner";
import { CauseCard } from "@/components/result/cause-card";
import { MechanicQuestions } from "@/components/result/mechanic-questions";
import { UrgencyGauge } from "@/components/result/urgency-gauge";
import { WhatsAppPanel } from "@/components/result/whatsapp-panel";

const URGENCY_SCALE_LABELS = Object.values(URGENCY_COPY)
  .map((copy, index) => `${index + 1} ${copy.label}`)
  .join(" · ");

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

  const view = useMemo(() => {
    if (!input) return null;
    return toResultView(input, analyze(input));
  }, [input]);

  if (status === "loading" || status === "empty" || !input || !view) {
    return <LoadingState />;
  }

  const showSafety = view.safetyLocked || view.urgency === "jangan_dikendarai";
  const hasTutorials = view.recommendedTutorials.length > 0 && !view.safetyLocked;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/keluhan"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeftIcon className="size-4" />
          Ubah cerita
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

      {showSafety ? <DangerBanner urgency={view.urgency} /> : null}

      <section className="space-y-2">
        <UrgencyGauge urgency={view.urgency} />
        <p className="text-center text-sm leading-relaxed text-foreground">
          {view.urgencyExplanation}
        </p>
        <p className="text-center font-mono text-[11px] uppercase tracking-wide text-muted">
          Skala urgensi: {URGENCY_SCALE_LABELS}
        </p>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Yang paling mungkin</h2>
          <p className="text-sm text-muted">
            Diurutkan dari yang paling cocok dengan ceritamu.
          </p>
        </div>
        {view.causes.length > 0 ? (
          <div className="space-y-3">
            {view.causes.map((cause, index) => (
              <CauseCard key={cause.id} cause={cause} index={index} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-5">
              <p className="text-sm leading-relaxed text-muted">
                Belum ada kemungkinan penyebab spesifik yang cocok. Sebaiknya periksa langsung ke
                bengkel atau teknisi yang kompeten.
              </p>
            </CardContent>
          </Card>
        )}
        <p className="text-xs text-muted">Ini hanya kemungkinan awal, bukan diagnosis pasti.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan keluhan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-foreground">{view.intro}</p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
            {view.summary}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
            {view.motorLabel}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {view.safetyLocked ? "Bagian yang akan diperiksa bengkel" : "Komponen yang perlu diperiksa"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {view.safetyLocked ? (
            <p className="flex gap-2 text-sm leading-relaxed text-foreground">
              <ShieldIcon className="mt-0.5 size-4 shrink-0 text-danger" />
              Serahkan pemeriksaan bagian berikut ke bengkel atau teknisi. Jangan dibongkar sendiri.
            </p>
          ) : null}
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
            {view.componentsToCheck.map((item) => (
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
          {view.safetyLocked ? (
            <p className="text-sm leading-relaxed text-foreground">
              Tidak ada saran bongkar sendiri untuk kondisi ini. Segera bawa motor ke bengkel atau
              teknisi yang kompeten.
            </p>
          ) : hasTutorials ? (
            <div className="space-y-3">
              <p className="text-sm text-muted">
                Tutorial relevan untuk kemungkinan di atas:
              </p>
              <ul className="space-y-2">
                {view.recommendedTutorials.map((slug) => {
                  const tutorial = getTutorialBySlug(slug);
                  if (!tutorial) {
                    return (
                      <li key={slug} className="text-sm text-muted">
                        {slug}
                      </li>
                    );
                  }
                  return (
                    <li key={slug}>
                      <Link
                        href={`/tutorial/${tutorial.slug}`}
                        className="text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {tutorial.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted">Belum ada tutorial relevan untuk hasil ini.</p>
          )}
        </CardContent>
      </Card>

      <MechanicQuestions questions={view.mechanicQuestions} />

      <WhatsAppPanel message={view.waMessage} link={view.waLink} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Checklist anti getok harga</h2>
        <ChecklistView items={view.checklist} />
      </section>

      <DisclaimerBanner />

      <Link
        href="/checklist"
        className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full" })}
      >
        Lihat checklist lengkap
        <ArrowRightIcon className="size-4" />
      </Link>

      {showSafety ? (
        <p className="text-center text-sm font-medium text-danger">
          Jika ragu, utamakan keselamatan: bawa motor ke bengkel atau teknisi kompeten.
        </p>
      ) : null}
    </div>
  );
}
