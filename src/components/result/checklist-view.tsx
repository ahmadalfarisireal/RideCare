import { CheckIcon } from "@/components/ui/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChecklistView({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Checklist sebelum ke bengkel</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <CheckIcon className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="text-sm text-muted">
        Catatan: minta estimasi biaya jasa dan sparepart dari mekanik secara tertulis
        sebelum pekerjaan dimulai. RideCare tidak menampilkan perkiraan harga.
      </p>
    </div>
  );
}
