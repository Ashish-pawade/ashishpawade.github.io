"use client";

import { eachDayOfInterval, subWeeks } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toISTDateString } from "../date-utils";

export function HabitHeatmap({ entries }: { entries: { date: Date; done: boolean }[] }) {
  const doneByDate = new Map<string, boolean>();
  for (const entry of entries) {
    doneByDate.set(toISTDateString(new Date(entry.date)), entry.done);
  }

  const end = new Date();
  const start = subWeeks(end, 16);
  const days = eachDayOfInterval({ start, end });

  // Pad the front so the grid's first column starts on a Sunday, matching
  // the GitHub-style 7-row weekday layout.
  const leadingPad = days[0].getDay();
  const cells: (Date | null)[] = [...Array(leadingPad).fill(null), ...days];

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1">
      {cells.map((day, i) => {
        if (!day) return <div key={i} className="size-3" />;
        const dateString = toISTDateString(day);
        const done = doneByDate.get(dateString);
        return (
          <Tooltip key={dateString}>
            <TooltipTrigger
              render={
                <div
                  className={cn(
                    "size-3 rounded-sm",
                    done ? "bg-teal-500" : "bg-muted"
                  )}
                />
              }
            />
            <TooltipContent>
              {dateString}
              {done ? " — done" : ""}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
