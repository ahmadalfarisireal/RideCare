"use client";

import { useState } from "react";

import { UrgencyGauge } from "@/components/result/urgency-gauge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getHomeSample, HOME_SAMPLES, HOME_TIPS } from "@/data/ui/home-samples";
import { getUrgencyCopy } from "@/data/ui/urgency-copy";
import { cn } from "@/lib/utils";

export function HomeSamplesView({
  selectedIndex,
  onSelectSample,
}: {
  selectedIndex: number;
  onSelectSample?: (index: number) => void;
}) {
  const sample = getHomeSample(selectedIndex);
  const title = getUrgencyCopy(sample.level).label;

  return (
    <Card className="h-full">
      <CardContent className="space-y-4 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Coba contoh
        </p>
        <UrgencyGauge urgency={sample.level} className="home-gauge-sweep" />
        <div aria-live="polite" className="space-y-1">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-muted">{sample.teaser}</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Contoh keluhan">
          {HOME_SAMPLES.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={index === selectedIndex}
              onClick={() => onSelectSample?.(index)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                index === selectedIndex
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-border bg-surface-2 text-muted hover:border-accent/60 hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-muted">
          Contoh singkat, bukan diagnosis. Hasil lengkap ada di Cek keluhan.
        </p>
      </CardContent>
    </Card>
  );
}

export function HomeSamplesPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <HomeSamplesView
      selectedIndex={selectedIndex}
      onSelectSample={setSelectedIndex}
    />
  );
}

export function TipBoxView({
  tipIndex,
  onNextTip,
}: {
  tipIndex: number;
  onNextTip?: () => void;
}) {
  const tip =
    HOME_TIPS[((tipIndex % HOME_TIPS.length) + HOME_TIPS.length) % HOME_TIPS.length];

  return (
    <section className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-5">
      <p className="font-display text-lg font-bold">Tip bengkel</p>
      <p aria-live="polite" className="min-w-0 flex-1 text-sm leading-relaxed text-muted">
        {tip}
      </p>
      <button
        type="button"
        onClick={onNextTip}
        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "shrink-0")}
      >
        Tip lain
      </button>
    </section>
  );
}

export function HomeTipsPanel() {
  const [tipIndex, setTipIndex] = useState(0);

  return (
    <TipBoxView
      tipIndex={tipIndex}
      onNextTip={() => setTipIndex((index) => index + 1)}
    />
  );
}
