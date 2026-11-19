"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { ChecklistGroupList } from "@/components/result/checklist-group-list";
import { PhraseList } from "@/components/result/phrase-list";
import { ANTI_RIPOFF_CHECKLIST } from "@/lib/complaint-engine/templates";
import { analyze } from "@/lib/complaint-engine";
import { loadComplaintInput } from "@/lib/storage/complaint-session";

export function ChecklistPageView() {
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [items, setItems] = useState<string[]>(ANTI_RIPOFF_CHECKLIST);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const stored = loadComplaintInput();
    queueMicrotask(() => {
      if (!stored) {
        setStatus("ready");
        return;
      }

      const result = analyze({
        complaint: stored.complaint,
        motorcycleType: stored.motorcycleType,
        answers: stored.answers ?? {},
      });
      setItems(result.checklist?.length ? result.checklist : ANTI_RIPOFF_CHECKLIST);
      setHasSession(true);
      setStatus("ready");
    });
  }, []);

  const content = useMemo(() => (items.length ? items : ANTI_RIPOFF_CHECKLIST), [items]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-8 sm:px-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted">Memuat checklist…</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href={hasSession ? "/hasil" : "/"}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeftIcon className="size-4" />
        {hasSession ? "Kembali ke hasil" : "Kembali ke beranda"}
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Checklist Anti Getok Harga
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          Centang yang sudah kamu siapkan. Tujuannya satu: kamu mengerti apa yang dikerjakan dan
          kamu yang memutuskan. {hasSession ? "" : "Ini checklist umum untuk semua keluhan."}
        </p>
      </div>

      <ChecklistGroupList key={content.join("|")} items={content} />

      <Card>
        <CardContent className="p-5">
          <p className="text-sm leading-relaxed text-foreground">
            Catatan: minta estimasi biaya jasa dan sparepart dari mekanik secara tertulis sebelum
            pekerjaan dimulai. RideCare tidak menampilkan perkiraan harga.
          </p>
        </CardContent>
      </Card>

      <PhraseList />

      <DisclaimerBanner />

      {hasSession ? (
        <Link
          href="/pesan-mekanik"
          className={buttonVariants({ variant: "primary", className: "w-full sm:w-auto" })}
        >
          Buat pesan untuk mekanik
          <ArrowRightIcon className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
