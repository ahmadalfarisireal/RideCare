"use client";

import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHECKLIST_PHRASES } from "@/data/ui/checklist-ui";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "ok" | "selected" | "manual";

const COPY_LABELS: Record<CopyState, string> = {
  idle: "Salin",
  ok: "Tersalin",
  selected: "Teks dipilih",
  manual: "Pilih teks manual",
};

function PhraseRow({ phrase }: { phrase: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copyPhrase = async () => {
    let copied = false;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(phrase);
        copied = true;
      }
    } catch {
      copied = false;
    }

    let nextState: CopyState = "manual";

    if (copied) {
      nextState = "ok";
    } else {
      try {
        if (typeof document !== "undefined" && textRef.current) {
          const range = document.createRange();
          range.selectNodeContents(textRef.current);
          const selection = typeof window !== "undefined" ? window.getSelection() : null;
          selection?.removeAllRanges();
          selection?.addRange(range);
          nextState = "selected";
        }
      } catch {
        nextState = "manual";
      }
    }

    setState(nextState);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
      <p ref={textRef} className="text-sm leading-relaxed text-foreground">
        {phrase}
      </p>
      <button
        type="button"
        onClick={copyPhrase}
        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "shrink-0")}
      >
        {COPY_LABELS[state]}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "idle" ? "" : COPY_LABELS[state]}
      </span>
    </div>
  );
}

export function PhraseList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kalimat siap pakai</CardTitle>
        <p className="text-sm text-muted">
          Salin kalimat di bawah ini untuk bertanya dengan jelas ke mekanik.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {CHECKLIST_PHRASES.map((phrase) => (
          <PhraseRow key={phrase} phrase={phrase} />
        ))}
      </CardContent>
    </Card>
  );
}
