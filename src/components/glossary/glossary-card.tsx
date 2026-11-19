import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon } from "@/components/ui/icons";
import {
  GLOSSARY_CATEGORY_LABELS,
  GLOSSARY_DIY_LABELS,
  type GlossaryDiy,
  type GlossaryTerm,
} from "@/types/glossary";
import { cn } from "@/lib/utils";

const DIY_LEVELS: GlossaryDiy[] = ["boleh", "hati", "bengkel"];

const DIY_STYLES: Record<GlossaryDiy, string> = {
  boleh: "border-safe/40 bg-safe/10 text-safe",
  hati: "border-warning/40 bg-warning/10 text-warning",
  bengkel: "border-danger/40 bg-danger/10 text-danger",
};

function DiyMeter({ level }: { level: GlossaryDiy }) {
  return (
    <div
      role="img"
      aria-label={`Boleh dicek sendiri: ${GLOSSARY_DIY_LABELS[level]}`}
      className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-surface-2 p-1"
    >
      {DIY_LEVELS.map((item, index) => (
        <span
          key={item}
          className={cn(
            "rounded-md border px-1 py-1.5 text-center font-mono text-[10px] uppercase tracking-wide",
            index === DIY_LEVELS.indexOf(level)
              ? DIY_STYLES[item]
              : "border-transparent text-muted",
          )}
        >
          {GLOSSARY_DIY_LABELS[item]}
        </span>
      ))}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export function GlossaryCard({
  term,
  relatedTerms = [],
  onOpenRelated,
}: {
  term: GlossaryTerm;
  relatedTerms?: GlossaryTerm[];
  onOpenRelated?: (id: string) => void;
}) {
  const hasDetail = Boolean(
    term.analogy ||
      term.how ||
      (term.signs && term.signs.length > 0) ||
      term.ignored ||
      term.diy ||
      term.diyWhy ||
      (term.ask && term.ask.length > 0) ||
      (term.related && term.related.length > 0),
  );
  const summary = term.short ?? term.definition;

  return (
    <details
      id={`term-${term.id}`}
      className="group scroll-mt-24 rounded-xl border border-border bg-surface open:border-accent/40"
    >
      <summary className="cursor-pointer list-none p-5 marker:hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-base font-semibold text-foreground">{term.term}</p>
            <p className="text-sm leading-relaxed text-muted">{summary}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {term.categoryLabel ?? GLOSSARY_CATEGORY_LABELS[term.category]}
            </Badge>
            <ChevronRightIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-90" />
          </div>
        </div>
      </summary>

      <div className="space-y-4 border-t border-border p-5 pt-4">
        {hasDetail ? (
          <>
            {term.analogy ? (
              <Section title="Bayangkan begini">
                <p>{term.analogy}</p>
              </Section>
            ) : null}
            {term.how ? (
              <Section title="Apa yang terjadi di motormu">
                <p>{term.how}</p>
              </Section>
            ) : null}
            {term.signs && term.signs.length > 0 ? (
              <Section title="Tanda-tanda bermasalah">
                <ul className="list-disc space-y-1 pl-5">
                  {term.signs.map((sign, index) => (
                    <li key={`${sign}-${index}`}>{sign}</li>
                  ))}
                </ul>
              </Section>
            ) : null}
            {term.ignored ? (
              <Section title="Kalau dibiarkan">
                <p>{term.ignored}</p>
              </Section>
            ) : null}
            {term.diy ? (
              <Section title="Boleh dicek sendiri?">
                <DiyMeter level={term.diy} />
                {term.diyWhy ? (
                  <p className="pt-3 text-sm leading-relaxed text-foreground">{term.diyWhy}</p>
                ) : null}
              </Section>
            ) : null}
            {term.ask && term.ask.length > 0 ? (
              <Section title="Tanya ini ke mekanik">
                <ul className="list-disc space-y-1 pl-5">
                  {term.ask.map((question, index) => (
                    <li key={`${question}-${index}`}>{question}</li>
                  ))}
                </ul>
              </Section>
            ) : null}
            {relatedTerms.length > 0 ? (
              <Section title="Sering dikaitkan dengan">
                <div className="flex flex-wrap gap-2">
                  {relatedTerms.map((related) => (
                    <button
                      key={related.id}
                      type="button"
                      onClick={() => onOpenRelated?.(related.id)}
                      className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-accent-text hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {related.term}
                    </button>
                  ))}
                </div>
              </Section>
            ) : null}
          </>
        ) : (
          <Section title="Penjelasan">
            <p className="text-foreground">{term.definition}</p>
          </Section>
        )}

        {term.related_components.length > 0 ? (
          <Section title="Komponen terkait">
            <div className="flex flex-wrap gap-2">
              {term.related_components.map((component) => (
                <Badge key={component} variant="default">
                  {component}
                </Badge>
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </details>
  );
}
