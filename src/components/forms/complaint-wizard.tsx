"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { analyze, type CompanionAnswers, type MotorType } from "@/lib/complaint-engine";
import {
  clearComplaintInput,
  loadComplaintInput,
  saveComplaintInput,
} from "@/lib/storage/complaint-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { ComplaintStep } from "@/components/forms/complaint-step";
import { FollowUpStep } from "@/components/forms/follow-up-step";
import { MotorTypeStep } from "@/components/forms/motor-type-step";

type Step = 1 | 2 | 3;

export function ComplaintWizard() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [motorcycleType, setMotorcycleType] = useState<MotorType | null>(null);
  const [complaint, setComplaint] = useState("");
  const [answers, setAnswers] = useState<CompanionAnswers>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadComplaintInput();
    queueMicrotask(() => {
      if (saved) {
        setMotorcycleType(saved.motorcycleType);
        setComplaint(saved.complaint);
        setAnswers(saved.answers ?? {});
        setStep(2);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated || !motorcycleType) return;
    saveComplaintInput({ motorcycleType, complaint, answers });
  }, [hydrated, motorcycleType, complaint, answers]);

  const canNext = useMemo(() => {
    if (step === 1) return motorcycleType !== null;
    if (step === 2) return complaint.trim().length >= 10;
    return true;
  }, [step, motorcycleType, complaint]);

  const goNext = () => {
    setError(null);
    if (step === 1) {
      if (!motorcycleType) {
        setError("Pilih jenis motor terlebih dahulu.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (complaint.trim().length < 10) {
        setError("Tulis keluhan sedikit lebih jelas (minimal 10 karakter).");
        return;
      }
      setStep(3);
      return;
    }
  };

  const goBack = () => {
    setError(null);
    setStep((s) => (s === 3 ? 2 : 1));
  };

  const submit = () => {
    setError(null);
    if (!motorcycleType) {
      setStep(1);
      setError("Pilih jenis motor terlebih dahulu.");
      return;
    }
    const trimmed = complaint.trim();
    if (trimmed.length < 10) {
      setStep(2);
      setError("Tulis keluhan sedikit lebih jelas (minimal 10 karakter).");
      return;
    }

    const input = { motorcycleType, complaint: trimmed, answers };
    saveComplaintInput(input);
    // Ensure engine runs once to validate flow (result pages re-run from stored input)
    analyze(input);
    router.push("/hasil");
  };

  const resetAll = () => {
    clearComplaintInput();
    setMotorcycleType(null);
    setComplaint("");
    setAnswers({});
    setStep(1);
    setError(null);
  };

  if (!hydrated) {
    return (
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted">Memuat form keluhan…</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Langkah {step} dari 3</span>
        <button
          type="button"
          onClick={resetAll}
          className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Mulai ulang
        </button>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <Card>
        <CardContent className="space-y-6 p-5">
          {step === 1 && (
            <MotorTypeStep
              value={motorcycleType}
              onChange={(v) => {
                setMotorcycleType(v);
                setError(null);
              }}
            />
          )}
          {step === 2 && motorcycleType && (
            <ComplaintStep
              motorcycleType={motorcycleType}
              value={complaint}
              onChange={(v) => {
                setComplaint(v);
                setError(null);
              }}
              onChangeMotor={() => setStep(1)}
            />
          )}
          {step === 3 && <FollowUpStep answers={answers} onChange={setAnswers} />}

          {error ? (
            <p className="text-sm font-medium text-danger" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            {step < 3 ? (
              <Button type="button" onClick={goNext} disabled={!canNext} className="w-full sm:w-auto">
                Lanjut
                <ArrowRightIcon className="size-4" />
              </Button>
            ) : (
              <Button type="button" onClick={submit} className="w-full sm:w-auto">
                Lihat kemungkinan penyebab
                <ArrowRightIcon className="size-4" />
              </Button>
            )}
            {step > 1 ? (
              <Button type="button" variant="secondary" onClick={goBack} className="w-full sm:w-auto">
                <ArrowLeftIcon className="size-4" />
                Kembali
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs leading-relaxed text-muted">
        Hasil analisis adalah kemungkinan awal, bukan diagnosis pasti. Kamu bisa menggunakan hasil ini
        untuk bertanya lebih jelas ke bengkel.
      </p>
    </div>
  );
}
