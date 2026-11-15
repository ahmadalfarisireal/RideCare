"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { analyze } from "@/lib/complaint-engine";
import { loadComplaintInput } from "@/lib/storage/complaint-session";
import { ANTI_RIPOFF_CHECKLIST } from "@/lib/complaint-engine/templates";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { ChecklistView } from "@/components/result/checklist-view";

export function ChecklistPageView() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [items, setItems] = useState<string[] | null>(null);

  useEffect(() => {
    const stored = loadComplaintInput();
    queueMicrotask(() => {
      if (!stored) {
        setStatus("empty");
        return;
      }
      const result = analyze({
        complaint: stored.complaint,
        motorcycleType: stored.motorcycleType,
        answers: stored.answers ?? {},
      });
      setItems(result.checklist?.length ? result.checklist : ANTI_RIPOFF_CHECKLIST);
      setStatus("ready");
    });
  }, []);

  useEffect(() => {
    if (status === "empty") {
      router.replace("/keluhan");
    }
  }, [status, router]);

  const content = useMemo(() => items ?? ANTI_RIPOFF_CHECKLIST, [items]);

  if (status === "loading" || status === "empty") {
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
        href="/hasil"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeftIcon className="size-4" />
        Kembali ke hasil
      </Link>

      <ChecklistView items={content} />

      <Link
        href="/pesan-mekanik"
        className={buttonVariants({ variant: "primary", className: "w-full sm:w-auto" })}
      >
        Buat pesan untuk mekanik
        <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
}
