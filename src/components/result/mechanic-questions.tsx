import { CopyButton } from "@/components/ui/copy-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MechanicQuestions({ questions }: { questions: string[] }) {
  if (questions.length === 0) return null;

  const copyText = questions.map((question, index) => `${index + 1}. ${question}`).join("\n");

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3">
        <CardTitle>Pertanyaan untuk mekanik</CardTitle>
        <CopyButton text={copyText} label="Salin daftar" />
      </CardHeader>
      <CardContent>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground">
          {questions.map((question, index) => (
            <li key={`${question}-${index}`}>{question}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
