"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { analyze, type AnalysisInput } from "@/lib/complaint-engine";
import { loadComplaintInput } from "@/lib/storage/complaint-session";
import {
  buildMechanicMessageFromResult,
  buildWhatsAppLink,
} from "@/lib/templates/whatsapp";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "@/components/ui/icons";

export function MechanicMessageView() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [input, setInput] = useState<AnalysisInput | null>(null);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

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

  const message = useMemo(() => {
    if (!input) return "";
    const result = analyze(input);
    return buildMechanicMessageFromResult(input.motorcycleType, input.complaint, result);
  }, [input]);

  if (status === "loading" || status === "empty" || !input) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-8 sm:px-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted">Memuat pesan untuk mekanik…</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const waLink = buildWhatsAppLink(message);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    setTimeout(() => setCopied("idle"), 2500);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/hasil"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeftIcon className="size-4" />
        Kembali ke hasil
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Pesan untuk mekanik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted">
            Salin pesan ini dan kirim ke mekanik lewat WhatsApp. Periksa kembali isi pesan sebelum
            dikirim.
          </p>
          <label htmlFor="mechanic-message" className="sr-only">
            Teks pesan untuk mekanik
          </label>
          <textarea
            id="mechanic-message"
            readOnly
            value={message}
            rows={18}
            className="w-full resize-y rounded-lg border border-border bg-surface-2 p-3 text-sm leading-relaxed text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="button" onClick={onCopy} className="w-full">
              {copied === "ok"
                ? "Pesan disalin"
                : copied === "fail"
                  ? "Gagal menyalin"
                  : "Salin pesan"}
            </Button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", className: "w-full" })}
            >
              Buka WhatsApp
            </a>
          </div>
          <p className="text-xs text-muted">
            Tombol WhatsApp membuka wa.me tanpa nomor tujuan. Pesan tidak mengandung perkiraan harga.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
