import { CopyButton } from "@/components/ui/copy-button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon } from "@/components/ui/icons";

export function MechanicQuestions({ questions }: { questions: string[] }) {
  if (questions.length === 0) return null;

  const copyText = questions.map((question, index) => `${index + 1}. ${question}`).join("\n");

  return (
    <Card>
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <CardTitle>Pertanyaan untuk mekanik</CardTitle>
          <ChevronRightIcon className="size-4 shrink-0 text-muted transition-transform group-open:rotate-90" />
        </summary>
        <CardContent className="border-t border-border pt-4">
          <div className="mb-3 flex justify-end">
            <CopyButton text={copyText} label="Salin daftar" />
          </div>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground">
            {questions.map((question, index) => (
              <li key={`${question}-${index}`}>{question}</li>
            ))}
          </ol>
        </CardContent>
      </details>
    </Card>
  );
}
