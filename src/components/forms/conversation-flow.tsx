"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  buildAnalysisInput,
  FOLLOW_UP_QUESTIONS,
  MOTOR_OPTIONS,
  SYMPTOM_OPTIONS,
  UNIVERSAL_QUESTION_ID,
  type ConversationSelections,
  type MotorOption,
  type SymptomOption,
} from "@/data/ui/complaint-prompts";
import type { MotorType } from "@/lib/complaint-engine";
import { saveComplaintInput } from "@/lib/storage/complaint-session";
import { cn } from "@/lib/utils";

type Stage = "motor" | "symptom" | "followup" | "finishing";

interface ChatLine {
  id: number;
  from: "bot" | "me";
  text: string;
  sub?: string;
}

const SYMPTOM_BY_ID = new Map(SYMPTOM_OPTIONS.map((symptom) => [symptom.id, symptom]));

const EXAMPLE_ANSWERS: Record<string, string> = {
  when: "dingin",
  starter: "lemah",
  [UNIVERSAL_QUESTION_ID]: "tidak-ada",
};

function optionLabel(questionId: string, optionId: string | undefined): string {
  return FOLLOW_UP_QUESTIONS[questionId]?.options.find((option) => option.id === optionId)?.label ?? "";
}

export function ConversationFlow() {
  const router = useRouter();
  const nextId = useRef(2);
  const endRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);

  const [lines, setLines] = useState<ChatLine[]>(() => [
    {
      id: 0,
      from: "bot",
      text: "Halo, aku Kak Bengkel. Ceritakan keluhan motormu, nanti aku bantu susun jadi ringkasan yang gampang dibaca mekanik.",
    },
    { id: 1, from: "bot", text: "Motormu jenis apa?" },
  ]);
  const [stage, setStage] = useState<Stage>("motor");
  const [motor, setMotor] = useState<MotorType | null>(null);
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    if (!interacted.current) return;
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines.length]);

  useEffect(() => {
    if (!finishing) return;
    const timer = setTimeout(() => router.push("/hasil"), 650);
    return () => clearTimeout(timer);
  }, [finishing, router]);

  const id = () => nextId.current++;
  const pushBot = (text: string) => setLines((current) => [...current, { id: id(), from: "bot", text }]);
  const pushMe = (text: string) => {
    interacted.current = true;
    setLines((current) => [...current, { id: id(), from: "me", text }]);
  };

  const finish = (selections: ConversationSelections) => {
    saveComplaintInput(buildAnalysisInput(selections));
    pushBot("Oke, aku sudah punya ringkasan awal. Ini hasilnya.");
    setStage("finishing");
    setFinishing(true);
  };

  const chooseMotor = (option: MotorOption) => {
    if (finishing) return;
    pushMe(option.label);
    setMotor(option.id);
    setStage("symptom");
    pushBot("Keluhan apa yang paling mengganggu?");
  };

  const chooseSymptom = (option: SymptomOption) => {
    if (finishing || !motor) return;
    pushMe(option.label);
    setSymptomId(option.id);

    if (motor === "listrik") {
      pushBot(
        "Untuk motor listrik aku tidak menebak penyebab. Aku hanya membantu menyusun pesan untuk mekanik atau teknisi yang berpengalaman.",
      );
      finish({ motor, symptomId: option.id, answers });
      return;
    }

    const firstQuestion = FOLLOW_UP_QUESTIONS[option.questions[0]];
    setStage("followup");
    setQuestionIndex(0);
    pushBot(`Oke, ${option.label.toLowerCase()}. Aku tanya beberapa hal singkat ya.`);
    if (firstQuestion) pushBot(firstQuestion.text);
  };

  const symptom = symptomId ? SYMPTOM_BY_ID.get(symptomId) : undefined;
  const questionQueue =
    motor === "listrik" || !symptom
      ? [UNIVERSAL_QUESTION_ID]
      : [...symptom.questions, UNIVERSAL_QUESTION_ID];
  const currentQuestionId = questionQueue[questionIndex];
  const currentQuestion = currentQuestionId ? FOLLOW_UP_QUESTIONS[currentQuestionId] : undefined;

  const chooseAnswer = (optionId: string) => {
    if (finishing || !motor || !symptomId || !currentQuestionId) return;
    const label = optionLabel(currentQuestionId, optionId);
    pushMe(label);

    const nextAnswers: Record<string, string> = { ...answers, [currentQuestionId]: optionId };
    setAnswers(nextAnswers);

    const nextQuestionId = questionQueue[questionIndex + 1];
    if (nextQuestionId) {
      setQuestionIndex(questionIndex + 1);
      pushBot(FOLLOW_UP_QUESTIONS[nextQuestionId].text);
      return;
    }

    finish({ motor, symptomId, answers: nextAnswers });
  };

  const useExample = () => {
    interacted.current = true;
    const selections: ConversationSelections = {
      motor: "matik",
      symptomId: "susah-hidup",
      answers: EXAMPLE_ANSWERS,
    };
    setLines([
      { id: id(), from: "bot", text: "Halo, aku Kak Bengkel. Ceritakan keluhan motormu, nanti aku bantu susun jadi ringkasan yang gampang dibaca mekanik." },
      { id: id(), from: "bot", text: "Motormu jenis apa?" },
      { id: id(), from: "me", text: "Matik" },
      { id: id(), from: "bot", text: "Keluhan apa yang paling mengganggu?" },
      { id: id(), from: "me", text: "Susah dihidupkan" },
      { id: id(), from: "bot", text: "Oke, susah dihidupkan. Aku tanya beberapa hal singkat ya." },
      { id: id(), from: "bot", text: FOLLOW_UP_QUESTIONS.when.text },
      { id: id(), from: "me", text: optionLabel("when", EXAMPLE_ANSWERS.when) },
      { id: id(), from: "bot", text: FOLLOW_UP_QUESTIONS.starter.text },
      { id: id(), from: "me", text: optionLabel("starter", EXAMPLE_ANSWERS.starter) },
      { id: id(), from: "bot", text: FOLLOW_UP_QUESTIONS[UNIVERSAL_QUESTION_ID].text },
      { id: id(), from: "me", text: optionLabel(UNIVERSAL_QUESTION_ID, EXAMPLE_ANSWERS[UNIVERSAL_QUESTION_ID]) },
      { id: id(), from: "bot", text: "Oke, aku sudah punya ringkasan awal. Ini hasilnya." },
    ]);
    setMotor("matik");
    setSymptomId("susah-hidup");
    setAnswers(EXAMPLE_ANSWERS);
    setQuestionIndex(2);
    setStage("finishing");
    finish(selections);
  };

  const reset = () => {
    interacted.current = false;
    nextId.current = 2;
    setLines([
      { id: 0, from: "bot", text: "Halo, aku Kak Bengkel. Ceritakan keluhan motormu, nanti aku bantu susun jadi ringkasan yang gampang dibaca mekanik." },
      { id: 1, from: "bot", text: "Motormu jenis apa?" },
    ]);
    setStage("motor");
    setMotor(null);
    setSymptomId(null);
    setAnswers({});
    setQuestionIndex(0);
    setFinishing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="font-mono uppercase tracking-[0.08em]">Kak Bengkel · online</span>
        <button
          type="button"
          onClick={reset}
          className="font-semibold text-accent-text underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Mulai ulang
        </button>
      </div>

      <div className="space-y-3" aria-live="polite">
        {lines.map((line) => (
          <div
            key={line.id}
            className={cn("flex gap-2.5", line.from === "me" && "justify-end")}
          >
            {line.from === "bot" ? (
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-medium text-accent-ink"
              >
                KB
              </span>
            ) : null}
            <div
              className={cn(
                "max-w-[85%] rounded-xl border border-border bg-surface px-4 py-2.5 text-sm leading-relaxed text-foreground sm:max-w-xl",
                line.from === "me" && "rounded-tr-sm border-transparent bg-accent font-semibold text-accent-ink",
              )}
            >
              {line.text}
              {line.sub ? <span className="mt-0.5 block text-xs text-muted">{line.sub}</span> : null}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {stage === "motor" ? (
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Pilih jenis motor">
          {MOTOR_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseMotor(option)}
              className="min-h-11 rounded-xl border border-border bg-surface px-4 py-2.5 text-left transition-colors hover:border-accent hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="block font-display text-base font-bold uppercase tracking-wide">{option.label}</span>
              <span className="block text-xs text-muted">{option.sub}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={useExample}
            className="min-h-11 rounded-xl border border-dashed border-accent/60 px-4 py-2.5 text-left font-semibold text-accent-text transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Coba contoh keluhan
          </button>
        </div>
      ) : null}

      {stage === "symptom" ? (
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Pilih keluhan">
          {SYMPTOM_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseSymptom(option)}
              className="min-h-11 rounded-xl border border-border bg-surface px-4 py-2.5 text-left transition-colors hover:border-accent hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="block font-display text-base font-bold uppercase tracking-wide">{option.label}</span>
              <span className="block text-xs text-muted">{option.hint}</span>
            </button>
          ))}
        </div>
      ) : null}

      {stage === "followup" && currentQuestion ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label={currentQuestion.text}>
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseAnswer(option.id)}
              className="min-h-11 rounded-xl border border-border bg-surface px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:border-accent hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      {stage === "finishing" ? (
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Menyusun hasil…</p>
      ) : null}
    </div>
  );
}
