import { differenceInCalendarDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CertificationRow } from "../schema";

export function NextExamCountdown({ certifications }: { certifications: CertificationRow[] }) {
  const now = new Date();
  const upcoming = certifications
    .filter(
      (c) =>
        (c.status === "PREPARING" || c.status === "PLANNED") &&
        c.examDate &&
        new Date(c.examDate) >= now
    )
    .sort((a, b) => new Date(a.examDate!).getTime() - new Date(b.examDate!).getTime());

  const next = upcoming[0];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-normal text-muted-foreground">Next exam</CardTitle>
      </CardHeader>
      <CardContent>
        {next ? (
          <>
            <p className="text-xl font-semibold">
              {differenceInCalendarDays(new Date(next.examDate!), now)} days
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{next.name}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No upcoming exams scheduled</p>
        )}
      </CardContent>
    </Card>
  );
}
