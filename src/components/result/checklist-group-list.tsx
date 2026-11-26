"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { groupChecklistItems } from "@/data/ui/checklist-ui";
import { cn } from "@/lib/utils";

export function ChecklistGroupList({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const groups = groupChecklistItems(items);
  const total = items.length;
  const completed = checked.filter(Boolean).length;

  const toggleItem = (index: number) => {
    setChecked((current) =>
      current.map((value, position) => (position === index ? !value : value)),
    );
  };

  const resetProgress = () => {
    setChecked(items.map(() => false));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Siap {completed} dari {total}</CardTitle>
            <p className="mt-1 text-sm text-muted" aria-live="polite">
              Centang yang sudah kamu siapkan sebelum ke bengkel.
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
        <CardContent>
          <div
            className="h-2 overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-label="Progres Siap Bengkel"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={completed}
          >
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {groups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {group.items.length === 0 ? (
              <p className="text-sm text-muted">Belum ada item pada kelompok ini.</p>
            ) : (
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.index}>
                    <label
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors",
                        checked[item.index]
                          ? "border-accent/50 bg-accent/5"
                          : "border-border bg-surface hover:bg-surface-2",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked[item.index]}
                        onChange={() => toggleItem(item.index)}
                        className="mt-0.5 size-4 shrink-0 accent-accent"
                      />
                      <span className="space-y-1">
                        <span
                          className={cn(
                            "block text-sm leading-relaxed",
                            checked[item.index] ? "text-muted line-through" : "text-foreground",
                          )}
                        >
                          {item.text}
                        </span>
                        <span className="block text-xs leading-relaxed text-muted">
                          Kenapa: {item.reason}
                        </span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
