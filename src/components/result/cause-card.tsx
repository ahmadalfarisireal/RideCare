import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CauseView } from "@/lib/ui/analysis-view";
import { cn } from "@/lib/utils";

const RANK_STYLES = [
  "border-accent/40 bg-accent/10 text-accent-text",
  "border-border bg-surface-2 text-foreground",
  "border-border text-muted",
] as const;

export function CauseCard({
  cause,
  index,
}: {
  cause: CauseView;
  index: number;
}) {
  return (
    <Card className={cn(index === 0 && "border-accent/50")}>
      <CardHeader className="gap-3 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={index === 0 ? "accent" : "outline"} className={RANK_STYLES[Math.min(index, 2)]}>
            {cause.rankLabel}
          </Badge>
          {cause.locked ? <Badge variant="danger">Khusus bengkel</Badge> : null}
        </div>
        <p className="text-base font-semibold leading-snug text-foreground">{cause.text}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed">
        <div>
          <p className="font-semibold text-foreground">Kenapa ini mungkin</p>
          <p className="text-muted">{cause.why}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Cara membedakannya</p>
          <p className="text-muted">{cause.differentiate}</p>
        </div>
        {cause.selfCheck ? (
          <div>
            <p className="font-semibold text-foreground">Yang boleh dilihat sendiri</p>
            <p className="text-muted">{cause.selfCheck}</p>
          </div>
        ) : null}
        <div>
          <p className="font-semibold text-foreground">{cause.locked ? "Penanganan" : "Di bengkel"}</p>
          <p className="text-muted">{cause.workshop}</p>
        </div>
      </CardContent>
    </Card>
  );
}
