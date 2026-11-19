"use client";

import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "ok" | "fail";

export function CopyButton({
  text,
  label = "Salin",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
    } catch {
      setState("fail");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  };

  const textByState: Record<CopyState, string> = {
    idle: label,
    ok: "Tersalin",
    fail: "Gagal menyalin",
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(buttonVariants({ variant: "secondary", size: "sm" }), className)}
    >
      {textByState[state]}
    </button>
  );
}
