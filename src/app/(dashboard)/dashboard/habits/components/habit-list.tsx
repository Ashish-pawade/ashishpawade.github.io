import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HabitHeatmap } from "./habit-heatmap";
import { TodayToggleButton } from "./today-toggle-button";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { toISTDateString } from "../date-utils";
import type { HabitWithEntries } from "../schema";

export function HabitList({ habits }: { habits: HabitWithEntries[] }) {
  if (habits.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
        No habits yet. Add one to start tracking.
      </div>
    );
  }

  const today = toISTDateString();

  return (
    <div className="space-y-4">
      {habits.map((habit) => {
        const doneToday =
          habit.entries.find((e) => toISTDateString(new Date(e.date)) === today)?.done ?? false;

        return (
          <Card key={habit.id}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{habit.name}</CardTitle>
              <div className="flex items-center gap-2">
                <TodayToggleButton habitId={habit.id} doneToday={doneToday} />
                <DeleteConfirmDialog
                  habitId={habit.id}
                  trigger={
                    <Button variant="ghost" size="sm">
                      Delete
                    </Button>
                  }
                />
              </div>
            </CardHeader>
            <CardContent>
              <HabitHeatmap entries={habit.entries} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
