import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DIFFICULTY_LABELS,
  MOTOR_TYPE_LABELS,
  type Tutorial,
} from "@/types/tutorial";

const difficultyVariant = {
  mudah: "success",
  sedang: "warning",
  sulit: "danger",
} as const;

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link
      href={`/tutorial/${tutorial.slug}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full transition-colors hover:border-accent/50 hover:bg-surface-2">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <CardTitle className="text-base">{tutorial.title}</CardTitle>
            <Badge variant={difficultyVariant[tutorial.difficulty]}>
              {DIFFICULTY_LABELS[tutorial.difficulty]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">Perkiraan waktu: {tutorial.estimated_time}</p>
          <div className="flex flex-wrap gap-2">
            {tutorial.motorcycle_types.map((type) => (
              <Badge key={type} variant="outline">
                {MOTOR_TYPE_LABELS[type]}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
