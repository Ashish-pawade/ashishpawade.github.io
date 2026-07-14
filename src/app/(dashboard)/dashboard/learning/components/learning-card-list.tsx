import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./progress-bar";
import { LearningFormDialog } from "./learning-form-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import type { LearningRow } from "../schema";

const STATUS_LABEL: Record<LearningRow["status"], string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  PAUSED: "Paused",
};

export function LearningCardList({ items }: { items: LearningRow[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
        No learning items yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm leading-snug">{item.title}</CardTitle>
              <Badge variant="secondary" className="shrink-0 text-[11px]">
                {item.provider}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{STATUS_LABEL[item.status]}</span>
              <span>{item.hoursSpent}h spent</span>
            </div>
            <ProgressBar value={item.progressPercent} />
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Open link
              </a>
            )}
            <div className="flex justify-end gap-1 pt-1">
              <LearningFormDialog
                mode="edit"
                learning={item}
                trigger={
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                }
              />
              <DeleteConfirmDialog
                learningId={item.id}
                trigger={
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
